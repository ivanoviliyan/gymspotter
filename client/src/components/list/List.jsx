import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Gym from '../gym/Gym';
import './list.scss';

const GymList = () => {
	const [gyms, setGyms] = useState([]);

	useEffect(() => {
		const getGyms = async () => {
			try {
				const res = await axios.get('/gyms', {
					headers: {
						token:
							'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
					},
				});
				setGyms(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getGyms();
	}, []);

	return (
		<>
			<h1>Newest Gyms:</h1>
			<div className='gyms'>
				<div className='gym-list'>
					{gyms.slice(0, 8).map((gym) => (
						<Gym key={gym._id} gym={gym} />
					))}
				</div>
			</div>
		</>
	);
};

export default GymList;
