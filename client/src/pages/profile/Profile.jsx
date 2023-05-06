import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './profile.scss';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import NumbersIcon from '@mui/icons-material/Numbers';
import AddGym from '../../components/addGym/AddGym';
import GavelIcon from '@mui/icons-material/Gavel';

const Profile = () => {
	const [likeGyms, setLikeGyms] = useState([]);
	const userJSON = localStorage.getItem('user');
	const user = JSON.parse(userJSON);
	const { username, profilePic, isAdmin, _id, likedGyms } = user;

	useEffect(() => {
		axios
			.get(`/users/liked-gyms/${_id}`, {
				headers: {
					token:
						'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
				},
			})
			.then((response) => {
				const reversedData = response.data.reverse(); // reverse the data
				setLikeGyms(reversedData);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [_id]);

	const [ratedGyms, setRatedGyms] = useState([]);
	useEffect(() => {
		axios
			.get(`/users/rated-gyms/${_id}`, {
				headers: {
					token:
						'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
				},
			})
			.then((response) => {
				setRatedGyms(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [_id]);

	const handleUnLike = (gymId) => {
		const userId = _id; // assuming _id is the user's ID
		console.log(gymId);

		axios
			.put(
				`/users/${userId}/unlike/${gymId}`,
				{},
				{
					headers: {
						token:
							'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
					},
				}
			)
			.then((response) => {
				// Filter the likeGyms array to remove the unliked gym
				const updatedGyms = likeGyms.filter((gym) => gym._id !== gymId);
				// Update the state with the new array of gyms
				setLikeGyms(updatedGyms);
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
				// Handle error
			});
	};
	const [showElement, setShowElement] = useState(false);

	function handleAddGym() {
		setShowElement(!showElement);
	}

	return (
		<>
			<Navbar />

			<div className='profile'>
				<h2>{isAdmin ? 'ADMIN PROFILE' : 'PROFILE'}</h2>
				<div className='admin'>
					<div className='pic'>
						<img
							src={
								user.profilePic ||
								'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
							}
							alt=''
						/>
						<p>
							{isAdmin ? <span>ADMIN</span> : <span>USER</span>} {username}
						</p>
					</div>
					<div>
						{isAdmin && (
							<div className='crud'>
								{!showElement ? (
									<button onClick={handleAddGym}>ADD GYM</button>
								) : (
									<button onClick={handleAddGym}>Cancel</button>
								)}
							</div>
						)}
						<Link to='edit-profile'>
							<button>EDIT PROFILE</button>
						</Link>
					</div>
				</div>
				<div className='container'>
					<div className='left'>
						<p>
							RATED LIST
							<NumbersIcon />{' '}
							<span>
								{ratedGyms.length} <GavelIcon />
							</span>
						</p>
						<div className='liked'>
							{ratedGyms.map((gym, index) => (
								<div key={gym._id} className='single-like'>
									<Link className='link' to={`/gyms/${gym._id}`}>
										<div>
											<img src={gym.img} alt='' />
											<span>{gym.title}</span>
										</div>
									</Link>
								</div>
							))}
						</div>
					</div>
					{showElement && <AddGym />}
					{!showElement && (
						<div className='right'>
							<p>
								LIKED LIST
								<NumbersIcon />{' '}
								<span>
									{likeGyms.length} <FavoriteIcon />
								</span>
							</p>
							<div className='liked'>
								{likeGyms.map((gym, index) => (
									<div key={gym._id} className='single-like'>
										<div>
											<Link className='link' to={`/gyms/${gym._id}`}>
												<img src={gym.img} alt='' />
											</Link>
											<span>{gym.title}</span>
											<button onClick={() => handleUnLike(gym._id)}>
												<DeleteIcon />
											</button>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Profile;
