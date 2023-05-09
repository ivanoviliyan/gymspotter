import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './gym.scss';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import {
	Home,
	Subscriptions,
	MonitorHeart,
	DoNotDisturb,
	CheckCircleOutline,
	LocationOn as LocationOnIcon,
	Facebook as FacebookIcon,
	LocalPhone as LocalPhoneIcon,
	Email as EmailIcon,
	Instagram as InstagramIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Gym = ({ match }) => {
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

	useEffect(() => {
		const getGym = async () => {
			try {
				const res = await axios.get(`/gyms/${match.params.id}`, {
					headers: {
						token:
							'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
					},
				});
				console.log(res.data);
				setGym(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getGym();
	}, [match.params.id]);

	const userJSON = localStorage.getItem('user');
	const user = JSON.parse(userJSON);
	let { username, profilePic, isAdmin, _id } = user;

	const history = useHistory();

	const handleDelete = () => {
		const adminPass = 'root';
		const input = window.prompt('Enter the admin passcode to delete the gym!');
		if (input === adminPass) {
			axios
				.delete(`/gyms/${match.params.id}`, {
					headers: {
						token:
							'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
					},
				})
				.then(() => setTimeout(() => history.goBack(), 500))
				.catch((error) => {
					console.error(error);
				});
		} else {
			window.alert('WRONG PASSCODE!');
		}
	};

	const handleLikeUs = () => {
		const gymId = match.params.id;
		const userId = _id; // assuming _id is the user's ID
		axios
			.put(
				`/users/${userId}/like/${gymId}`,
				{},
				{
					headers: {
						token:
							'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
					},
				}
			)
			.then(window.alert(`You liked ${gym.title} gym!`))
			.catch((error) => {
				console.log(error);
				// Handle error
			});
	};
	const handleUpdate = () => {
		history.push(`/edit-gym/${match.params.id}`);
	};

	return (
		<>
			<Navbar />
			<div class='page'>
				{isAdmin && (
					<>
						<p className='crud-p'>You see this when you have admin profile!</p>
						<div className='crud'>
							<button onClick={handleDelete}>Delete</button>
							<button onClick={handleUpdate}>UPDATE</button>
						</div>
					</>
				)}
				<div className='title'>
					<h1 className='gym-title'>{gym.title || ''}</h1>
					<img src={gym.img || ''} alt='logo' />
					<div className='avrg-rate'>
						<span className='rate'>
							{gym.averageRate !== 0
								? `Average ${gym.averageRate.toFixed(2)}⭐`
								: 'Rate us for average score!'}
						</span>
					</div>
				</div>

				<div className='paragraph'>
					<p>Average rates</p>
				</div>
				<div className='rate'>
					<div className='single-rate'>
						<span className='head'>Cleanliness </span>
						<span className='rataing'>
							{gym.rate.cleanliness.length !== 0
								? gym.rate &&
								  (
										gym.rate.cleanliness &&
										gym.rate.cleanliness.reduce((acc, val) => acc + val, 0) /
											gym.rate.cleanliness.length
								  ).toFixed(2) + '⭐'
								: 'Rate us first!'}
						</span>
					</div>

					<div className='single-rate'>
						<span className='head'>Staff </span>
						<span className='rataing'>
							{gym.rate.staff.length !== 0
								? (
										gym.rate &&
										gym.rate.staff &&
										gym.rate.staff.reduce((acc, val) => acc + val, 0) /
											gym.rate.staff.length
								  ).toFixed(2) + '⭐'
								: 'Rate us first!'}
						</span>
					</div>
					<div className='single-rate'>
						<span className='head'>Price/ Quality </span>
						<span className='rataing'>
							{gym.rate.priceQuality.length !== 0
								? (
										gym.rate &&
										gym.rate.priceQuality &&
										gym.rate.priceQuality.reduce((acc, val) => acc + val, 0) /
											gym.rate.priceQuality.length
								  ).toFixed(2) + '⭐'
								: 'Rate us first!'}
						</span>
					</div>
					<div className='single-rate'>
						<span className='head'>Location/ Place </span>
						<span className='rataing'>
							{gym.rate.locationPlace.length !== 0
								? (
										gym.rate &&
										gym.rate.locationPlace &&
										gym.rate.locationPlace.reduce((acc, val) => acc + val, 0) /
											gym.rate.locationPlace.length
								  ).toFixed(2) + '⭐'
								: 'Rate us first!'}
						</span>
					</div>
				</div>
				<div className='div-btn'>
					<Link to={`/rate/${match.params.id}`}>
						<button className='rate-it'>Rate us!</button>
					</Link>{' '}
					<button className='like-it' onClick={handleLikeUs}>
						Like us!
					</button>
				</div>
				<div className='container'>
					<div className='left'>
						<div className='text'>
							<span className='headling'>
								<LocationOnIcon fontSize='large' />
							</span>
							{gym.location || ''}
						</div>
						<div className='text'>
							<span className='headling'>
								<Home fontSize='large' />
							</span>
							{gym.address || ''}
						</div>
						<div className='text'>
							<span className='headling'>
								<CheckCircleOutline fontSize='large' /> Open at:{' '}
							</span>
							{gym.workTimeOpen || ''}
						</div>
						<div className='text'>
							<span className='headling'>
								<DoNotDisturb fontSize='large' /> Close at:{' '}
							</span>
							{gym.workTimeClose || ''}
						</div>
						<p className='text'>
							<span className='headling'>
								<Subscriptions fontSize='large' /> Subscription:{' '}
							</span>
							{gym.subscription && gym.subscription.join(', ')}
						</p>
						<p className='text'>
							<span className='headling'>
								<MonitorHeart fontSize='large' /> Service:{' '}
							</span>
							{gym.service && gym.service.join(', ')}
						</p>
					</div>
					<div className='right'>
						<p className='text'>
							<span className='headling'>
								<LocalPhoneIcon fontSize='large' />
							</span>
							{(gym.contact && gym.contact.phone) || ''}
						</p>
						<p className='text'>
							<span className='headling'>
								<EmailIcon fontSize='large' />
							</span>
							{(gym.contact && gym.contact.email) || ''}
						</p>
						<div className='socials'>
							<p className='text'>
								<a
									href={(gym.contact && gym.contact.facebook) || ''}
									target='_blank'
								>
									<FacebookIcon fontSize='large' />
								</a>
							</p>
							<p className='text'>
								<a
									href={(gym.contact && gym.contact.instagram) || ''}
									target='_blank'
								>
									<InstagramIcon fontSize='large' />
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Gym;
