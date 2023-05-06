const mongoose = require('mongoose');

const GymSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, unique: true },
		desc: { type: String },
		img: { type: String },
		location: { type: String, required: true },
		address: { type: String },
		workTimeOpen: { type: String },
		workTimeClose: { type: String },
		subscription: { type: Array },
		service: { type: Array },
		contact: {
			phone: { type: String },
			email: { type: String },
			facebook: { type: String },
			instagram: { type: String },
		},
		rate: {
			cleanliness: { type: Array },
			staff: { type: Array },
			priceQuality: { type: Array },
			locationPlace: { type: Array },
		},
		averageRate: { type: Number, default: 0, required: false },
		isFeatured: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Gym', GymSchema);
