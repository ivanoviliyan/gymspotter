const router = require('express').Router();
const Gym = require('../models/Gym');
const verify = require('../verifyToken');

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
		gym.averageRate = average.toFixed(2);
	});
	await Promise.all(gyms.map((gym) => gym.save()));
};

//CREATE
router.post('', verify, async (req, res) => {
	if (req.user.isAdmin) {
		const newGym = new Gym(req.body);
		try {
			const savedGym = await newGym.save();
			res.status(201).json(savedGym);
			updateAverageGrades();
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json('You have not a permisson!');
	}
});
//UPDATE
router.put('/:id', verify, async (req, res) => {
	try {
		const updatedGym = await Gym.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedGym);
		updateAverageGrades();
	} catch (err) {
		res.status(500).json(err);
	}
});

//DELETE
router.delete('/:id', verify, async (req, res) => {
	if (req.user.isAdmin) {
		try {
			await Gym.findByIdAndDelete(req.params.id);
			res.status(200).json('Gym has been deleted!');
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json('You have not a permisson!');
	}
});
//GET BY ID
router.get('/:id', verify, async (req, res) => {
	try {
		const gym = await Gym.findById(req.params.id);
		res.status(200).json(gym);
	} catch (err) {
		res.status(500).json(err);
	}
});

//GET GYMS BY LOCATION
router.get('/', verify, async (req, res) => {
	const locationQuery = req.query.location;
	const rateQuery = req.query.rate;
	const isFeatured = req.query.featured;
	let gyms = [];
	try {
		if (locationQuery) {
			if (rateQuery === 'asc') {
				gyms = await Gym.aggregate([
					{
						$sample: {
							size: 10,
						},
					},
					{
						$match: {
							location: locationQuery,
						},
					},
					{
						$sort: {
							averageRate: 1,
						},
					},
				]);
			} else {
				gyms = await Gym.aggregate([
					{
						$sample: {
							size: 10,
						},
					},
					{
						$match: {
							location: locationQuery,
						},
					},
					{
						$sort: {
							averageRate: -1,
						},
					},
				]);
			}
			res.status(200).json(gyms);
		} else if (rateQuery) {
			rateQuery === 'asc'
				? (gyms = await Gym.find({}).sort({ averageRate: 1 }))
				: (gyms = await Gym.find({}).sort({ averageRate: -1 }));
			res.status(200).json(gyms);
		} else if (isFeatured) {
			try {
				const gyms = await Gym.aggregate([
					{ $match: { isFeatured: true } },
					{ $sample: { size: 3 } },
				]);
				res.status(200).json(gyms);
			} catch (err) {
				res.status(500).json(err);
			}
		} else {
			gyms = await Gym.find();
			res.status(200).json(gyms);
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
