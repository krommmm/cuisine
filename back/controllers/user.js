const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const fs = require('fs');
const Recette = require('../models/Recette');
require("dotenv").config();

const nodemailer = require('nodemailer');

// Configuration du transporteur SMTP
const transporter = nodemailer.createTransport({
	host: 'mail.gmx.com',
	port: 587,
	secure: false,
	auth: {
		user: 'kromcool1@gmx.fr',
		pass: '1@Aaaaaaaa123',
	},
	tls: {
		rejectUnauthorized: false,
	},
});

exports.signUp = (req, res, next) => {
	if (req.body.ville.toLowerCase() !== `${process.env.NOMSECRET}`) {
		res.status(201).json({ msg: 'Mauvais prénom !' });
	} else {
		bcrypt
			.hash(req.body.password, 10)
			.then((hash) => {
				const user = new User({
					email: req.body.email,
					password: hash,
					pseudo: req.body.pseudo,
				});
				user.save()
					.then(() => res.status(201).json({ msg: 'User created !' }))
					.catch((err) => res.status(400).json({ err }));
			})
			.catch((err) => res.status(500).json({ err }));
	}
};

exports.login = (req, res, next) => {
	User.findOne({ email: req.body.email })
		.then((user) => {
			if (!user) {
				return res
					.status(401)
					.json({ msg: 'incorect email/password pair' });
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res
							.status(401)
							.json({ msg: 'incorect email/password pair' });
					}
					res.status(200).json({
						userId: user._id,
						token: jwt.sign(
							{ userId: user._id, isAdmin: user.isAdmin },
							`${process.env.SECRET_KEY}`,
							{ expiresIn: '24h' }
						),
					});
				})
				.catch((err) => res.status(500).json({ err }));
		})
		.catch((err) => res.status(500).json({ err }));
};

exports.forgotPassword = (req, res, next) => {
	User.findOne({ email: req.body.email }).then((user) => {
		if (!user) {
			return res.status(400).json({ msg: 'email non trouvé' });
		}
		//création d'un nouveau token d'1h
		const tokenTemporaireObject = {
			tokenTemporaire: jwt.sign(
				{ userId: user._id },
				`${process.env.SECRET_KEY}`,
				{ expiresIn: '15m' }
			),
		};

		// Options de l'e-mail à envoyer
		const mailOptions = {
			from: 'kromcool1@gmx.fr',
			to: `${req.body.email}`,
			subject: 'Mdp oublié cuisinefamille',
			text: `Cliquez sur le lien pour réinitialiser le mdp, vous avez 15min:\n  https://cuisinefamille.net/reset-password/${tokenTemporaireObject.tokenTemporaire}`, 
		};

		// Envoi de l'e-mail
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log(error);
			} else {
				console.log('E-mail envoyé : ' + info.response);
			}
		});

		User.updateOne(
			{ _id: user._id },
			{ ...tokenTemporaireObject, _id: user._id }
		)
			.then(() =>
				res
					.status(200)
					.json({ msg: `Demande de réinitialisation terminé !` })
			)
			.catch((err) => res.status(400).json({ err }));
	});
};

exports.changePassword = (req, res, next) => {
	const token = req.body.token;
	const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
	const userId = decodedToken.userId;
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
			var passwordObject = { password: hash };

			User.findOne({ _id: userId })
				.then((user) => {
					if (!user) {
						res.status(400).json({ msg: 'Email non trouvée ' });
					} else {
						User.updateOne(
							{ _id: userId },
							{ ...passwordObject, _id: userId }
						)
							.then(() =>
								res
									.status(200)
									.json({
										msg: `Changement de mot de passe effectué !`,
									})
							)
							.catch((err) => res.status(400).json({ err }));
					}
				})
				.catch((err) => {
					res.status(400).json({ error: err });
				});
		})
		.catch((err) => {
			res.status(400).json({ error: err });
		});
};

exports.isTokenValid = (req, res, next) => {
	//on utilise l'userId du token et si le token est dans le user.tokenTemporaire
	const token = req.body.token;
	const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
	const userId = decodedToken.userId;

	User.findOne({ _id: userId }).then((user) => {
		if (!user) {
			res.status(400).json({ msg: 'False' });
		} else {
			if (user.tokenTemporaire !== token) {
				res.status(400).json({ msg: 'False' });
			} else {
				res.status(200).json({ msg: 'Token accepté' });
			}
		}
	});
};

exports.myProfil = (req, res, next) => {
	User.findOne({ _id: req.auth.userId })
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((err) => {
			res.status(400).json({ error: err });
		});
};

exports.userById = (req, res, next) => {
	User.findOne({ _id: req.params.id })
		.then((user) => {
			res.status(200).json(user.imageProfil);
		})
		.catch((err) => {
			res.status(400).json({ error: err });
		});
};

exports.modifyUser = (req, res, next) => {
	const objectUser = req.file
		? {
				...req.body,
				imageProfil: req.file.filename,
		  }
		: { ...req.body };
	User.findOne({ _id: req.auth.userId })
		.then((user) => {
			if (
				req.file.filename !== user.imageProfil &&
				user.imageProfil !== 'ImageProfilDefault.jpg'
			) {
				fs.unlink(`images/${user.imageProfil}`, () => {
					//callback sinon rien

					User.updateOne(
						{ _id: req.auth.userId },
						{ ...objectUser, _id: req.auth.userId }
					)
						.then(() =>
							res.status(200).json({ msg: 'user modified' })
						)
						.catch((err) => res.status(400).json({ err }));
				});
			} else {
				User.updateOne(
					{ _id: req.auth.userId },
					{ ...objectUser, _id: req.auth.userId }
				)
					.then(() => res.status(200).json({ msg: 'user modified' }))
					.catch((err) => res.status(400).json({ err }));
			}
		})
		.catch((err) => res.status(400).json({ err }));
};

exports.deleteUser = (req, res, next) => {
	Recette.find()
		.then((recettes) => {
			for (let i = 0; i < recettes.length; i++) {
				if (recettes[i].posterId === req.auth.userId) {
					Recette.findOne({ _id: recettes[i]._id }).then(
						(recette) => {
							if (
								req.auth.userId === recette.posterId ||
								req.auth.isAdmin === true
							) {
								fs.unlink(`images/${recette.imageUrl}`, () => {
									recette.deleteOne({ _id: recettes[i]._id });
								});
							} else {
								res.status(400).json({ msg: 'Not authorized' });
							}
						}
					);
				}
			}
		})
		.catch((err) => res.status(400).json({ err }));

	User.findOne({ _id: req.auth.userId })
		.then((user) => {
			if (user.imageProfil !== 'ImageProfilDefault.jpg') {
				fs.unlink(`images/${user.imageProfil}`, () => {
					User.deleteOne({ _id: req.auth.userId })
						.then(() => {
							res.status(200).json({ msg: 'user suppressed' });
						})
						.catch((err) => {
							res.status(401).json({ error: err });
						});
				});
			} else {
				User.deleteOne({ _id: req.auth.userId })
					.then(() => {
						res.status(200).json({ msg: 'user suppressed' });
					})
					.catch((err) => {
						res.status(401).json({ error: err });
					});
			}
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
};
