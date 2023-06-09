const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		profilePic: { type: String, default: '' },
		isAdmin: { type: Boolean, default: false },
		likedGyms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Gym' }],
		ratedGyms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Gym' }],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
