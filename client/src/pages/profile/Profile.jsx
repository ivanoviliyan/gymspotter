import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import './profile.scss';
const Profile = () => {
	const userJSON = localStorage.getItem('user');
	const user = JSON.parse(userJSON);
	let { username, profilePic, isAdmin } = user;

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
						</p>
						
					</div>
					<div className='right'>
						<p>Liked Gyms</p>
						<div className='liked'>
							<ul>
								<li>Gym 1</li>
								<li>Gym 1</li>
								<li>Gym 1</li>
								<li>Gym 1</li>
								<li>Gym 1</li>
								<li>Gym 1</li>
								<li>Gym 1</li>
								<li>Gym 1</li>
								<li>Gym 1</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
