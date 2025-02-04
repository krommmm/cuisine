const mongoose = require('mongoose');

const uniqueValidator = require("mongoose-unique-validator");
var mongodbErrorHandler = require("mongoose-mongodb-errors");

mongoose.plugin(mongodbErrorHandler);

const userSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	pseudo: { type: String, required: true, unique: true },
	imageProfil: {
		type: String,
		default: 'ImageProfilDefault.jpg',
		required: true,
	},
	isAdmin: { type: Boolean, default: false },
	tokenTemporaire:{type:String}
});

userSchema.plugin(mongodbErrorHandler);
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
