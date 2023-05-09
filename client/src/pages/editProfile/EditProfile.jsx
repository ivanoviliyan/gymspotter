import React, { useState } from 'react';
import axios from 'axios';
import './editProfile.scss';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { AuthContext } from '../../authContext/AuthContext';
import { logout } from '../../authContext/AuthActions';
import { useContext } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
const EditProfile = () => {
	const { dispatch } = useContext(AuthContext);
	const userJSON = localStorage.getItem('user');
	const user = JSON.parse(userJSON);
	const [email, setEmail] = useState(user.email);
	const [name, setName] = useState(user.username);
	const [password, setPassword] = useState('');
	const [pic, setPic] = useState('');
	const { username, profilePic, isAdmin, _id } = user;

	const history = useHistory();

	const handleSubmin = async () => {
		if (password.length || name.length || email.length || pic.length) {
			try {
				// Only include properties that have a value
				const updatedUserData = {
					...(name && { username: name }),
					...(email && { email: email }),
					...(password && { password: password }),
					...(pic && { profilePic: pic }),
				};
				await axios
					.put(`/users/${_id}`, updatedUserData, {
						headers: {
							token:
								'Bearer ' +
								JSON.parse(localStorage.getItem('user')).accessToken,
						},
					})
					.then(() => {
						dispatch(logout());
						history.push('/login');
					});
				// handle success
			} catch (error) {
				// handle error
			}
		} else {
			window.alert('Enter all data!');
		}
	};

	return (
		<>
			<Navbar />
			<div className='edit-profile-page'>
				{!isAdmin ? (
					<p>
						<span>User: </span> {username}
					</p>
				) : (
					<p>
						<span>Admin: </span> {username}
					</p>
				)}
				<div className='edit-profile'>
					<span>New username</span>{' '}
					<input
						type='text'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<span>Profile Picture</span>{' '}
					<input
						type='text'
						value={pic}
						onChange={(e) => setPic(e.target.value)}
					/>
					<span>New email</span>{' '}
					<input
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<span>New password</span>{' '}
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button className='submit' onClick={handleSubmin}>
						SUBMIT
					</button>
					<Link to='/profile' className='link'>
						<button className='cancel'>CANCEL</button>
					</Link>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default EditProfile;
