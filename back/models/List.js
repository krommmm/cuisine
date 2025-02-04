const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
	list: { type: String, required: true },
});

module.exports = mongoose.model('List', listSchema); // from le fichier List.js
