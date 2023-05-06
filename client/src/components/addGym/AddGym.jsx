import React, { useState } from 'react';
import './addGym.scss';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function AddGym() {
	const [gymData, setGymData] = useState({
		title: '',
		desc: '',
		img: '',
		location: '',
		address: '',
		workTimeOpen: '',
		workTimeClose: '',
		subscription: [],
		service: [],
		contact: {
			phone: '',
			email: '',
			facebook: '',
			instagram: '',
		},

		isFeatured: false,
	});

	function handleContactInputChange(event) {
		const { name, value } = event.target;
		console.log('name:', name, 'value:', value);
		setGymData((prevData) => ({
			...prevData,
			contact: {
				...prevData.contact,
				[name]: value,
			},
		}));
	}

	function handleInputChange(event) {
		const { name, value } = event.target;
		setGymData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}
	const [subs, setSubs] = useState([]);

	function handleCheckboxChangeSubs(event) {
		const isChecked = event.target.checked;
		const value = event.target.value;

		if (isChecked) {
			setSubs((prevSubs) => [...prevSubs, value]);
		} else {
			setSubs((prevSubs) => prevSubs.filter((sub) => sub !== value));
		}
	}
	const [service, setService] = useState([]);

	function handleCheckboxChangeService(event) {
		const isChecked = event.target.checked;
		const value = event.target.value;

		if (isChecked) {
			setService((prevSubs) => [...prevSubs, value]);
		} else {
			setService((prevSubs) => prevSubs.filter((sub) => sub !== value));
		}
	}
	const [isFeatured, setIsFeatured] = useState(false);

	function handleIsFeatured(event) {
		setIsFeatured(event.target.value === 'true');
	}

	const history = useHistory();
	function handleSubmit(event) {
		event.preventDefault();
		gymData.subscription = subs;
		gymData.service = service;
		gymData.isFeatured = isFeatured;
		// Call an API or do something with the gymData
		axios
			.post('/gyms', gymData, {
				headers: {
					token:
						'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
				},
			})
			.then(() => {
				history.push('/');
			})
			.catch((error) => {
				console.error(error);
			});
	}

	return (
		<div className='add-gym-component'>
			<p className='opening'>Add a new gym</p>
			<div className='add-gym-container'>
				<div className='content1'>
					<span>Title</span>{' '}
					<input
						type='text'
						name='title'
						id=''
						placeholder='Gym title'
						onChange={handleInputChange}
					/>
					<span>Description</span>
					<input
						type='text'
						name='desc'
						id=''
						placeholder='Gym descripition'
						onChange={handleInputChange}
					/>
					<span>Image URL</span>
					<input
						type='text'
						name='img'
						id=''
						placeholder='Image URL'
						onChange={handleInputChange}
					/>
					<span>Location</span>
					<input
						type='text'
						name='location'
						id=''
						placeholder='Gym location'
						onChange={handleInputChange}
					/>
					<span>address</span>
					<input
						type='text'
						name='address'
						id=''
						placeholder='Gym address'
						onChange={handleInputChange}
					/>
					<span>Hours of operation</span>
					<span>Open</span>
					<input
						type='text'
						name='workTimeOpen'
						id=''
						placeholder='Open time'
						onChange={handleInputChange}
					/>
					<span>Close</span>
					<input
						type='text'
						name='workTimeClose'
						id=''
						placeholder='Close time'
						onChange={handleInputChange}
					/>
					<span>Is featured gym?</span>
					<div className='is-featured'>
						<label>
							<input
								type='radio'
								name='options'
								value='true'
								onChange={handleIsFeatured}
								checked={isFeatured === true}
							/>
							Yes
						</label>
						<br />
						<label>
							<input
								type='radio'
								name='options'
								value='false'
								onChange={handleIsFeatured}
								checked={isFeatured === false}
							/>
							No
						</label>
					</div>
				</div>
				<div className='content2'>
					<span>subscription</span>
					<div className='subs'>
						<div className='yerly'>
							<input
								type='checkbox'
								id='yearly'
								name='yearly'
								value='yearly'
								onChange={handleCheckboxChangeSubs}
							></input>
							<label for='yearly'>Yearly</label>
						</div>
						<div className='monthly'>
							<input
								type='checkbox'
								id='monthly'
								name='monthly'
								value='monthly'
								onChange={handleCheckboxChangeSubs}
							></input>
							<label for='yearly'>Monthly</label>
						</div>
						<div className='daily'>
							<input
								type='checkbox'
								id='daily'
								name='daily'
								value='daily'
								onChange={handleCheckboxChangeSubs}
							></input>
							<label for='yearly'>Daily</label>
						</div>
					</div>
					<span>service</span>
					<div className='services'>
						<div className='wt'>
							<input
								type='checkbox'
								id='weights'
								name='weights'
								value='weights'
								onChange={handleCheckboxChangeService}
							></input>
							<label for='weights'>Weight training</label>
						</div>
						<div className='cardio'>
							<input
								type='checkbox'
								id='cardio'
								name='cardio'
								value='cardio'
								onChange={handleCheckboxChangeService}
							></input>
							<label for='cardio'>Cardiovascular training</label>
						</div>
						<div className='gfc'>
							<input
								type='checkbox'
								id='classes'
								name='classes'
								value='classes'
								onChange={handleCheckboxChangeService}
							></input>
							<label for='classes'>Group fitness classes</label>
						</div>
						<div className='pt'>
							<input
								type='checkbox'
								id='personal'
								name='personal'
								value='personal'
								onChange={handleCheckboxChangeService}
							></input>
							<label for='personal'>Personal training</label>
						</div>
						<div className='pool'>
							<input
								type='checkbox'
								id='pool'
								name='pool'
								value='pool'
								onChange={handleCheckboxChangeService}
							></input>
							<label for='pool'>Pool access</label>
						</div>
					</div>
					<span>contact</span>
					<span>phone</span>
					<input
						placeholder='Phone number'
						type='text'
						name='phone'
						value={gymData.contact.phone}
						onChange={handleContactInputChange}
					/>
					<span>email</span>
					<input
						placeholder='Email address'
						type='text'
						name='email'
						value={gymData.contact.email}
						onChange={handleContactInputChange}
					/>
					<span>facebook</span>
					<input
						placeholder='Facebook URL'
						type='text'
						name='facebook'
						value={gymData.contact.facebook}
						onChange={handleContactInputChange}
					/>
					<span>instagram</span>
					<input
						placeholder='Instagram URL'
						type='text'
						name='instagram'
						value={gymData.contact.instagram}
						onChange={handleContactInputChange}
					/>
				</div>
			</div>
			<div className='buttonclass'>
				<button onClick={handleSubmit}>ADD GYM</button>
			</div>
		</div>
	);
}

export default AddGym;
