const List = require('../models/List');

exports.createList = (req, res, next) => {
	console.log(req.body);
	const recetteObject = { ...req.body };
	const list = new List({
		...recetteObject,
	});
	list.save()
		.then(() => res.status(201).json({ msg: `${list._id}` }))
		.catch((err) => res.status(400).json({ err }));
};

exports.getAllList = (req, res, next) => {
	List.find()
		.then((list) => res.status(200).json(list))
		.catch((err) => res.status(400).json({ error: err }));
};

exports.modifyList = (req, res, next) => {
	const objectList = { ...req.body };
	List.findOne({ _id: req.params.id })
		.then((list) => {
			
				List.updateOne(
						{ _id: req.params.id },
						{ ...objectList, _id: req.params.id }
					)
						.then(() =>
							res.status(200).json({ msg: 'course modifié' })
						)
						.catch((err) => res.status(400).json({ err }));
				
                
                })
		.catch((err) => res.status(400).json({ err }));
};

exports.deleteList = (req, res, next) => {
	List.findOne({ _id: req.params.id }).then((list) => {
		if(list!==null){
		list.deleteOne({ _id: req.params.id })
			.then(() => res.status(200).json({ msg: 'course supprimée' }))
			.catch((err) => res.status(400).json({ err }));
		};
	});
};
