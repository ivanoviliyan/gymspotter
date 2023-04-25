import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './profile.scss';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Profile = () => {
	const [likedGyms, setLikedGyms] = useState([]);

	const userJSON = localStorage.getItem('user');
	const user = JSON.parse(userJSON);
	let { username, profilePic, isAdmin, _id } = user;

	useEffect(() => {
		axios
			.get(`/users/liked-gyms/${_id}`, {
				headers: {
					token:
						'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
				},
			})
			.then((response) => {
				console.log(response);
				setLikedGyms(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [_id]);

	return (
		<>
			<Navbar />

			<div className='profile'>
				<h2>👋Hi 👤{username}</h2>
				<div className='container'>
					<div className='left'>
						<img src={profilePic} alt='Profile' />
						<p>
							{isAdmin && <span>Admin</span>} {username}
							{isAdmin && (
								<div className='crud'>
									<p>Gym Permisions</p>
									<button>ADD</button>
									<button>UPDATE</button>
								</div>
							)}
						</p>
					</div>
					<div className='right'>
						<p>
							<FavoriteIcon /> LIKED GYMS: <span>{likedGyms.length}</span>
						</p>
						<div className='liked'>
							{likedGyms.map((gym, index) => (
								<Link className='link' to={`/gyms/${gym._id}`}>
									<div key={gym._id} className='single-like'>
										<div>
											<img src={gym.img} alt='' />
											<span>{gym.title}</span>
											<button>
												<DeleteIcon />
											</button>
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
