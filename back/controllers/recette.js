const fs = require('fs');
const Recette = require('../models/Recette');

exports.createRecette = (req, res, next) => {
	console.log(req.body);
	const recetteObject = req.file
		? {
				...req.body,
				imageUrl: req.file.filename,
				posterId: req.auth.userId,
		  }
		: { ...req.body };
	const recette = new Recette({
		...recetteObject,
		posterId: req.auth.userId,
	});
	recette
		.save()
		.then(() => res.status(201).json({ msg: `${recette._id}` }))
		.catch((err) => res.status(400).json({ err }));
};

exports.getAllRecettes = (req, res, next) => {
	Recette.find()
		.then((recette) => res.status(200).json(recette))
		.catch((err) => res.status(400).json({ error: err }));
};

exports.getOneRecette = (req, res, next) => {
	Recette.findOne({ _id: req.params.id })
		.then((recette) => {
			res.status(200).json(recette);
		})
		.catch((err) => {
			res.status(400).json({ error: err });
		});
};

exports.modifyRecette = (req, res, next) => {
	const objectRecette = req.file
		? {
				...req.body,
				imageUrl: req.file.filename,
		  }
		: { ...req.body };
	Recette.findOne({ _id: req.params.id })
		.then((recette) => {
			if (req.file.filename !== recette.imageUrl) {
				fs.unlink(`images/${recette.imageUrl}`, () => {
					Recette.updateOne(
						{ _id: req.params.id },
						{ ...objectRecette, _id: req.params.id }
					)
						.then(() =>
							res.status(200).json({ msg: 'image modifié' })
						)
						.catch((err) => res.status(400).json({ err }));
				});
			}
		})
		.catch((err) => res.status(400).json({ err }));
};

exports.modifyRecetteText = async (req, res, next) => {

	try {
		await Recette.updateOne(
		  { _id: req.params.id }, // Rechercher la recette par son ID
		  { $set: { title: req.body.title } } // Nouveau titre
		);
		const recette = await Recette.findById(req.params.id).select('title');
		res.json(recette);
	  } catch (err) {
		console.error(err);
		res.status(500).json({ message: "Erreur lors de la modification du titre de la recette" });
	  }
};
exports.deleteRecette = (req, res, next) => {
	Recette.findOne({ _id: req.params.id }).then((recette) => {
		if (req.auth.userId === recette.posterId || req.auth.isAdmin === true) {
			fs.unlink(`images/${recette.imageUrl}`, () => {
				recette
					.deleteOne({ _id: req.params.id })
					.then(() =>
						res.status(200).json({ msg: 'recette supprimée' })
					)
					.catch((err) => res.status(400).json({ err }));
			});
		} else {
			res.status(400).json({ msg: 'Not authorized' });
		}
	});
};

exports.handleIngredients = (req, res, next) => {
	const crud = req.body.crud;
	switch (crud) {
		case 'c':
			Recette.findOne({ _id: req.params.id }).then((recette) => {
				if (
					req.auth.userId !== recette.posterId &&
					req.auth.isAdmin === false
				) {
					return res.status(400).json({ msg: 'Not authorized' });
				} else if (
					req.auth.userId === recette.posterId ||
					req.auth.isAdmin === true
				) {
					Recette.updateOne(
						{ _id: req.params.id },
						{ $push: { ingredients: [req.body] } }
					)
						.then(() =>
							res
								.status(200)
								.json({ message: 'ingredient created' })
						)
						.catch((err) => res.status(400).json(err));
				}
			});
			break;

		case 'd':
			Recette.findOne({ _id: req.params.id }).then((recette) => {
				if (
					req.auth.userId === recette.posterId ||
					req.auth.isAdmin === true
				) {
					const index = recette.ingredients.findIndex((element) => {
						//recherche l'index d'un ingredient qui remplit une condition, si l'index est trouvé, renvoit l'index, sinon renvoit -1
						return (
							element._id.toString() ===
							req.body.ingredientIdFromFetch
						); //condition : si l'id de l'element = à l'id envoyé de req
					});
					//index l'index de l'ingredient choist dans le tableau des ingredients

					if (index !== -1) {
						//donc si index !== -1 donc il a été trouvé car il a un index de 0 à recette.ingredients.length
						console.log(
							`J'ai cliqué sur l'ingredient ${recette.ingredients[index]._id}`
						);
						recette.ingredients = recette.ingredients.filter(
							(element, i) => {
								//Dans le tab des ingredient on filtre tous les ingredients sauf celui de l'index(A supprimer)
								return i !== index;
							}
						);

						recette
							.save()
							.then(() =>
								res
									.status(200)
									.json({ msg: 'ingredient suppressed' })
							)
							.catch((err) => res.status(400).json({ err }));
					}
				} else {
					res.status(400).json({ msg: 'Not authorized' });
				}
			});
			break;

		case 'ic':
			Recette.findOne({ _id: req.params.id }).then((recette) => {
				if (
					req.auth.userId !== recette.posterId &&
					req.auth.isAdmin === false
				) {
					return res.status(400).json({ msg: 'Not authorized' });
				} else if (
					req.auth.userId === recette.posterId ||
					req.auth.isAdmin === true
				) {
					Recette.updateOne(
						{ _id: req.params.id },
						{ $push: { instructions: [req.body] } }
					)
						.then(() =>
							res
								.status(200)
								.json({ message: 'instruction created' })
						)
						.catch((err) => res.status(400).json(err));
				}
			});
			break;

		case 'id':
			Recette.findOne({ _id: req.params.id }).then((recette) => {
				if (
					req.auth.userId === recette.posterId ||
					req.auth.isAdmin === true
				) {
					const index = recette.instructions.findIndex((element) => {
						//recherche l'index d'un instructions qui remplit une condition, si l'index est trouvé, renvoit l'index, sinon renvoit -1
						return (
							element._id.toString() ===
							req.body.instructionIdFromFetch
						); //condition : si l'id de l'element = à l'id envoyé de req
					});
					//index l'index de l'instructions choist dans le tableau des instructions

					if (index !== -1) {
						//donc si index !== -1 donc il a été trouvé car il a un index de 0 à recette.instructions.length
						console.log(
							`J'ai cliqué sur l'instruction ${recette.instructions[index]._id}`
						);
						recette.instructions = recette.instructions.filter(
							(element, i) => {
								//Dans le tab des instructions on filtre tous les instructions sauf celui de l'index(A supprimer)
								return i !== index;
							}
						);

						recette
							.save()
							.then(() =>
								res
									.status(200)
									.json({ msg: 'instruction suppressed' })
							)
							.catch((err) => res.status(400).json({ err }));
					}
				} else {
					res.status(400).json({ msg: 'Not authorized' });
				}
			});
			break;

		case 'tc':
			Recette.findOne({ _id: req.params.id }).then((recette) => {
				if (
					req.auth.userId !== recette.posterId &&
					req.auth.isAdmin === false
				) {
					return res.status(400).json({ msg: 'Not authorized' });
				} else if (
					req.auth.userId === recette.posterId ||
					req.auth.isAdmin === true
				) {
					Recette.updateOne(
						{ _id: req.params.id },
						{ $push: { tags: [req.body] } }
					)
						.then(() =>
							res.status(200).json({ message: 'tag created' })
						)
						.catch((err) => res.status(400).json(err));
				}
			});
			break;

		case 'td':
			Recette.findOne({ _id: req.params.id }).then((recette) => {
				if (
					req.auth.userId === recette.posterId ||
					req.auth.isAdmin === true
				) {
					const index = recette.tags.findIndex((element) => {
						//recherche l'index d'un ingredient qui remplit une condition, si l'index est trouvé, renvoit l'index, sinon renvoit -1
						return (
							element._id.toString() === req.body.tagIdFromFetch
						); //condition : si l'id de l'element = à l'id envoyé de req
					});
					//index l'index de l'ingredient choist dans le tableau des ingredients

					if (index !== -1) {
						//donc si index !== -1 donc il a été trouvé car il a un index de 0 à recette.ingredients.length
						console.log(
							`J'ai cliqué sur l'ingredient ${recette.tags[index]._id}`
						);
						recette.tags = recette.tags.filter((element, i) => {
							//Dans le tab des ingredient on filtre tous les ingredients sauf celui de l'index(A supprimer)
							return i !== index;
						});

						recette
							.save()
							.then(() =>
								res.status(200).json({ msg: 'tag suppressed' })
							)
							.catch((err) => res.status(400).json({ err }));
					}
				} else {
					res.status(400).json({ msg: 'Not authorized' });
				}
			});
			break;

		// handle unexpected values
		default:
			res.status(400).json({ error: 'Invalid CRUD value' });
	}
};

exports.handleInstructions = (req, res, next) => {};

exports.handleTags = (req, res, next) => {};
