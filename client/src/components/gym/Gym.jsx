import React from 'react';
import './gym.scss';
import { LocationOn } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Gym = ({ gym }) => {
	const { title, img, averageRate, location } = gym;

	return (
		<>
			<Link className='link' to={`/gyms/${gym._id}`} key={gym._id}>
				<div className='card'>
					<img src={img} alt={title} />
					<h2>{title}</h2>
					<p>Average rate: {averageRate}⭐</p>
					<p className='location'>
						<LocationOn /> {location}
					</p>
				</div>
			</Link>
		</>
	);
};

export default Gym;
