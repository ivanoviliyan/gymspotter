import React from 'react';
import './home.scss';
import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
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
		<div className='home'>
			<Navbar />
			<Featured />
			<List gyms={gyms} />
		</div>
	);
};

export default Home;
