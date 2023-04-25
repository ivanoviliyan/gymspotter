import './rating.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import GavelIcon from '@mui/icons-material/Gavel';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Rating = () => {
	let [cleanlinessRating, setCleanlinessRating] = useState(1);
	let [staffRating, setStaffRating] = useState(1);
	let [priceQualityRating, setPriceQualityRating] = useState(1);
	let [locationRating, setLocationRating] = useState(1);

	const history = useHistory();

	function handleRatingChange(rating, setRating) {
		if (rating < 1) {
			setRating(1);
		} else if (rating > 5) {
			setRating(5);
		} else {
			setRating(rating);
		}
	}

	const [gym, setGym] = useState({
		subscription: [],
		service: [],
		contact: {
			phone: '',
			email: '',
			twitter: '',
			facebook: '',
			instagram: '',
		},
		rate: {
			cleanliness: [],
			staff: [],
			priceQuality: [],
			locationPlace: [],
		},
		averageRate: 0,
	});

	const gymId = window.location.pathname.split('/').pop();

	useEffect(() => {
		const getGym = async () => {
			try {
				const res = await axios.get(`/gyms/${gymId}`, {
					headers: {
						token:
							'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
					},
				});
				console.log(res.data.title);
				setGym(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getGym();
	}, []);

	const handleSubmit = () => {
		const updatedGym = {
			...gym,
			rate: {
				cleanliness: [...gym.rate.cleanliness, cleanlinessRating],
				staff: [...gym.rate.staff, staffRating],
				priceQuality: [...gym.rate.priceQuality, priceQualityRating],
				locationPlace: [...gym.rate.locationPlace, locationRating],
			},
		};
		setGym(updatedGym);
		const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;

		axios
			.put(`/gyms/${gymId}`, updatedGym, {
				headers: {
					token: `Bearer ${accessToken}`,
				},
			})
			.then(() => setTimeout(() => history.goBack(), 500))
			.catch((error) => {
				console.log(error);
				// Handle error
			});
	};

	return (
		<>
			<Navbar />
			<div className='rating-form'>
				<h1>
					<GavelIcon fontSize='large' />
					Rate
				</h1>
				<div className='container'>
					<div className='wrapper'>
						<img src={gym.img} alt='logo' />
						<p>{gym.title}</p>
						<p>
							Average: <span>{gym.averageRate.toFixed(2)}</span>⭐
						</p>
					</div>
					<div className='form'>
						<label className='headling'>
							<span>⭐Cleanliness:</span>
							<input
								min='1'
								max='5'
								type='number'
								value={cleanlinessRating}
								onChange={(e) =>
									handleRatingChange(
										parseInt(e.target.value),
										setCleanlinessRating
									)
								}
							/>
						</label>
						<label className='headling'>
							<span>⭐Staff:</span>
							<input
								min='1'
								max='5'
								type='number'
								value={staffRating}
								onChange={(e) =>
									handleRatingChange(parseInt(e.target.value), setStaffRating)
								}
							/>
						</label>
						<label className='headling'>
							<span>⭐Price Quality:</span>
							<input
								min='1'
								max='5'
								type='number'
								value={priceQualityRating}
								onChange={(e) =>
									handleRatingChange(
										parseInt(e.target.value),
										setPriceQualityRating
									)
								}
							/>
						</label>
						<label className='headling'>
							<span>⭐Location:</span>
							<input
								min='1'
								max='5'
								type='number'
								value={locationRating}
								onChange={(e) =>
									handleRatingChange(
										parseInt(e.target.value),
										setLocationRating
									)
								}
							/>
						</label>
						<button type='submit' onClick={handleSubmit}>
							Submit
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Rating;
