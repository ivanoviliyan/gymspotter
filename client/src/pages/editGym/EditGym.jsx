import React, { useState } from 'react';
import './editGym.scss';
import axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

function AddGym({ match }) {
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
	useEffect(() => {
		const getGym = async () => {
			try {
				const res = await axios.get(`/gyms/${match.params.id}`, {
					headers: {
						token:
							'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
					},
				});
				console.log(res.data);
				setGymData(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getGym();
	}, [match.params.id]);
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
	const updatedGymData = {};
	const history = useHistory();
	function handleSubmit(event) {
		event.preventDefault();

		const updatedGymData = {};

		if (gymData.title) {
			updatedGymData.title = gymData.title;
		}
		if (gymData.desc) {
			updatedGymData.desc = gymData.desc;
		}
		if (gymData.img) {
			updatedGymData.img = gymData.img;
		}
		if (gymData.location) {
			updatedGymData.location = gymData.location;
		}
		if (gymData.address) {
			updatedGymData.address = gymData.address;
		}
		if (gymData.workTimeOpen) {
			updatedGymData.workTimeOpen = gymData.workTimeOpen;
		}
		if (gymData.workTimeClose) {
			updatedGymData.workTimeClose = gymData.workTimeClose;
		}
		if (subs.length > 0) {
			updatedGymData.subscription = subs;
		}
		if (service.length > 0) {
			updatedGymData.service = service;
		}
		if (
			gymData.contact.phone ||
			gymData.contact.email ||
			gymData.contact.facebook ||
			gymData.contact.instagram
		) {
			updatedGymData.contact = gymData.contact;
		}
		if (isFeatured) {
			updatedGymData.isFeatured = isFeatured;
		}

		axios
			.put(`/gyms/${match.params.id}`, updatedGymData, {
				headers: {
					token:
						'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
				},
			})
			.then(() => {
				setTimeout(history.goBack(), 1000);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	return (
		<>
			<Navbar />
			<div className='edit-gym'>
				<p className='opening'>Update - {gymData.title}</p>
				<div className='add-edit-container'>
					<div className='content1'>
						<span>Title</span>{' '}
						<input
							type='text'
							name='title'
							id=''
							value={gymData.title}
							onChange={handleInputChange}
						/>
						<span>Description</span>
						<input
							type='text'
							name='desc'
							id=''
							value={gymData.desc}
							onChange={handleInputChange}
						/>
						<span>Image URL</span>
						<input
							type='text'
							name='img'
							id=''
							value={gymData.img}
							onChange={handleInputChange}
						/>
						<span>Location</span>
						<input
							type='text'
							name='location'
							id=''
							value={gymData.location}
							onChange={handleInputChange}
						/>
						<span>address</span>
						<input
							type='text'
							name='address'
							id=''
							value={gymData.address}
							onChange={handleInputChange}
						/>
						<span>Hours of operation</span>
						<span>Open</span>
						<input
							type='text'
							name='workTimeOpen'
							id=''
							value={gymData.workTimeOpen}
							onChange={handleInputChange}
						/>
						<span>Close</span>
						<input
							type='text'
							name='workTimeClose'
							id=''
							value={gymData.workTimeClose}
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
							value={gymData.contact.phone}
							type='text'
							name='phone'
							value={gymData.contact.phone}
							onChange={handleContactInputChange}
						/>
						<span>email</span>
						<input
							value={gymData.contact.email}
							type='text'
							name='email'
							value={gymData.contact.email}
							onChange={handleContactInputChange}
						/>
						<span>facebook</span>
						<input
							value='Facebook URL'
							type='text'
							name='facebook'
							value={gymData.contact.facebook}
							onChange={handleContactInputChange}
						/>
						<span>instagram</span>
						<input
							value='Instagram URL'
							type='text'
							name='instagram'
							value={gymData.contact.instagram}
							onChange={handleContactInputChange}
						/>
					</div>
				</div>
				<div className='buttonclass'>
					<button onClick={handleSubmit}>Update</button>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default AddGym;
