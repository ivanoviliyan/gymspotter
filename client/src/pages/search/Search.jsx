import './search.scss';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const Search = () => {
	const [gym, setGym] = useState([]);
	useEffect(() => {
		axios
			.get(`/gyms`, {
				headers: {
					token:
						'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
				},
			})
			.then((response) => {
				setGym(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const [titleQuery, setTitleQuery] = useState('');
	const [cityQuery, setCityQuery] = useState('');

	const handleTitleChange = (e) => {
		setTitleQuery(e.target.value);
	};

	const handleCityChange = (e) => {
		setCityQuery(e.target.value);
	};

	const [order, setOrder] = useState('asc');

	const handleRadioChange = (e) => {
		setOrder(e.target.value);
		// You can add your query logic here
		if (e.target.value === 'asc') {
			const ascGyms = gym.slice().sort((a, b) => b.averageRate - a.averageRate);
			setGym(ascGyms);
		} else {
			const descGyms = gym
				.slice()
				.sort((a, b) => a.averageRate - b.averageRate);
			setGym(descGyms);
		}
	};

	const filteredGyms = gym.filter((item) => {
		const titleMatch = item.title
			.toLowerCase()
			.includes(titleQuery.toLowerCase());
		const cityMatch = item.location
			.toLowerCase()
			.includes(cityQuery.toLowerCase());
		return titleMatch && cityMatch;
	});

	return (
		<>
			<Navbar />
			<div className='search-page'>
				<h1>
					SPOT your Gym <FitnessCenterIcon fontSize='large' />
				</h1>
				<div className='container'>
					<div className='search-bar'>
						<form>
							<input
								type='text'
								placeholder='Search by title'
								value={titleQuery}
								onChange={handleTitleChange}
							/>
						</form>
					</div>
					<div className='search-bar'>
						<form>
							<input
								type='text'
								placeholder='Search by city'
								value={cityQuery}
								onChange={handleCityChange}
							/>
						</form>
					</div>
				</div>
				<div className='radio-buttons'>
					<div className='rate-search'>
						<span>⭐</span>
					</div>

					<div>
						<label>
							<input
								type='radio'
								value='asc'
								checked={order === 'asc'}
								onChange={handleRadioChange}
							/>
							<KeyboardDoubleArrowUpIcon fontSize='large' />
						</label>
					</div>
					<div>
						<label>
							<input
								type='radio'
								value='desc'
								checked={order === 'desc'}
								onChange={handleRadioChange}
							/>
							<KeyboardDoubleArrowDownIcon fontSize='large' />
						</label>
					</div>
				</div>
				<div className='searched-gyms'>
					{filteredGyms.map((item) => (
						<div key={item._id} className='searched-item'>
							<Link className='link' to={`/gyms/${item._id}`}>
								<div>
									<img src={item.img} alt='' />
									<span>Rate: {item.averageRate}⭐</span>
									<span>{item.title}</span>
									<span>{item.location}</span>
								</div>
							</Link>
						</div>
					))}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Search;
