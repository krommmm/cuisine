const mongoose = require('mongoose');

const recetteSchema = new mongoose.Schema({
	posterId: { type: String, required: false },
	title: { type: String, required: true },
	imageUrl: { type: String, required: true },
	instructions: {
		type: [
			{
				instructionIdFromFetch: String,
				instructionId: String,
				instruction: String,
				crud: String,
			},
		],
	},
	ingredients: {
		type: [
			{
				ingredientIdFromFetch: String,
				ingredientId: String,
				ingredient: String,
				crud: String,
			},
		],
	},
	tags: {
		type: [
			{
				tagFromFetch: String,
				tagId: String,
				tag: String,
				crud: String,
			},
		],
	},
});

module.exports = mongoose.model('Recette', recetteSchema);
