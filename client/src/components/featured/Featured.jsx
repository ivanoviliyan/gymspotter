import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './featured.scss';
import { Link } from 'react-router-dom';
import { Home, LocationOn } from '@mui/icons-material';

const Featured = () => {
	const [gyms, setGyms] = useState([]);

	useEffect(() => {
		const getGyms = async () => {
			try {
				const res = await axios.get('/gyms/?featured=true', {
					headers: {
						token:
							'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
					},
				});
				console.log(res.data);
				setGyms(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getGyms();
	}, []);

	return (
		<>
			<div className='featured'>
				<h1>Featured</h1>
				<div className='featured-cards'>
					{gyms.map((gym) => (
						<Link className='link' to={`/gyms/${gym._id}`} key={gym._id}>
							<div className='featured-card'>
								<img src={gym.img} alt={gym.title} />
								<div className='logo-gymspotter'>
									<h3>{gym.title}</h3>
									<img
										className='logo-gymspotter-logo'
										src='https://svgshare.com/i/sFF.svg'
										alt='logo'
									/>
									<h3>CLICK!</h3>
								</div>

								<h3>Rate: {gym.averageRate}⭐</h3>
								<h3 className='title'>{gym.title}</h3>
								<p>
									<span>
										<LocationOn />{' '}
									</span>
									{gym.location}
								</p>
								<p>
									<span>
										<Home />{' '}
									</span>
									{gym.address}
								</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</>
	);
};

export default Featured;
