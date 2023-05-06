const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const verify = require('../verifyToken');
const Gym = require('../models/Gym');

const updateAverageGrades = async () => {
	const gyms = await Gym.find();
	gyms.forEach((gym) => {
		const { cleanliness, staff, priceQuality, locationPlace } = gym.rate;
		const cleanAvg =
			cleanliness.reduce((acc, val) => acc + val, 0) / cleanliness.length;
		const staffAvg = staff.reduce((acc, val) => acc + val, 0) / staff.length;
		const priceQualityAvg =
			priceQuality.reduce((acc, val) => acc + val, 0) / priceQuality.length;
		const locationPlaceAvg =
			locationPlace.reduce((acc, val) => acc + val, 0) / locationPlace.length;
		const total = cleanAvg + staffAvg + priceQualityAvg + locationPlaceAvg;
		const average = total / 4;
		if (gym.averageRate) {
			delete gym.averageRate;
		}
		gym.averageRate = average.toFixed(2);
	});
	await Promise.all(gyms.map((gym) => gym.save()));
};

//UPDATE
router.put('/:id', verify, async (req, res) => {
	if (req.user.id === req.params.id || req.user.isAdmin) {
		if (req.body.password) {
			req.body.password = CryptoJS.AES.encrypt(
				req.body.password,
				process.env.SECRET_KEY
			).toString();
		}

		try {
			const updatedUser = await User.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{ new: true }
			);
			res.status(200).json(updatedUser);
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json('You can update only your account!');
	}
});

//DELETE
router.delete('/:id', verify, async (req, res) => {
	if (req.user.id === req.params.id || req.user.isAdmin) {
		try {
			await User.findByIdAndDelete(req.params.id);
			res.status(200).json('User has been deleted...');
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json('You can delete only your account!');
	}
});

//GET
router.get('/find/:id', verify, async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const { password, ...info } = user._doc;
		res.status(200).json(info);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.get('/liked-gyms/:id', verify, async (req, res) => {
	try {
		const user = await User.findById(req.params.id).populate({
			path: 'likedGyms',
		});
		const likedGyms = user.likedGyms;
		res.status(200).json(likedGyms);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
});

router.get('/rated-gyms/:id', verify, async (req, res) => {
	try {
		const user = await User.findById(req.params.id).populate({
			path: 'ratedGyms',
			options: { sort: { lastRatedDate: -1 } },
		});
		const ratedGyms = user.ratedGyms;
		res.status(200).json(ratedGyms);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
});

//GET ALL
router.get('/', verify, async (req, res) => {
	const query = req.query.new;
	if (req.user.isAdmin) {
		try {
			const users = query
				? await User.find().sort({ _id: -1 }).limit(5)
				: await User.find();
			res.status(200).json(users);
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json('You are not allowed to see all users!');
	}
});

router.put('/:id/like/:gymId', verify, async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json('User not found');
		}
		if (req.user.id !== req.params.id) {
			return res.status(403).json('You can update only your account!');
		}
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{ $addToSet: { likedGyms: req.params.gymId } },
			{ new: true }
		);
		res.status(200).json(updatedUser);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/:id/unlike/:gymId', verify, async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json('User not found');
		}
		if (req.user.id !== req.params.id) {
			return res.status(403).json('You can update only your account!');
		}
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{ $pull: { likedGyms: req.params.gymId } },
			{ new: true }
		);
		res.status(200).json(updatedUser);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/:id/rate/:gymId', verify, async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json('User not found');
		}
		if (req.user.id !== req.params.id) {
			return res.status(403).json('You can update only your account!');
		}
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{ $addToSet: { ratedGyms: req.params.gymId } },
			{ new: true }
		);
		res.status(200).json(updatedUser);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
