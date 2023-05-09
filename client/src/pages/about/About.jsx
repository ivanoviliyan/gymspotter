import React from 'react';
import './about.scss';
import Navbar from '../../components/navbar/Navbar';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../../components/footer/Footer';

const About = () => {
	return (
		<>
			<Navbar />
			<div className='about-page'>
				<p className='headling-p'>About page</p>
				<div className='about-app'>
					<div className='gymspotter-logo'>
						<img src='https://svgshare.com/i/sFF.svg' alt='logo' />
					</div>
					<div className='article'>
						<p>
							<p>
								Introducing GymSpotter: Your Ultimate Guide to Finding the
								Perfect Gym
							</p>
							Are you tired of going to the same old gym every day? Do you want
							to find a new gym that suits your needs and preferences? Look no
							further than GymSpotter, the gym comparison website that helps you
							find the perfect gym for you. With GymSpotter, you can search for
							gyms in your area and compare them based on several factors,
							including cleanliness, staff, price/quality, location, and user
							ratings. You can read reviews from other users and leave your own
							ratings and comments, helping others make informed decisions about
							where to work out. But that's not all. GymSpotter also lets you
							like gyms and store them in your profile page for easy access
							later. Whether you're looking for a new gym close to work or a
							high-end facility with state-of-the-art equipment, GymSpotter has
							you covered. GymSpotter is built using the MERN stack, which
							stands for MongoDB, Express, React, and Node.js. This modern
							technology stack provides a robust and scalable platform that
							ensures the app is fast, efficient, and reliable. With GymSpotter,
							you can say goodbye to the hassle of trying out different gyms
							until you find the right one. GymSpotter helps you find the
							perfect gym from the comfort of your own home. So why wait? Sign
							up today and start your journey to a healthier, happier you!
						</p>
					</div>
				</div>
				<p className='headling-p'>Technologies used to create the website</p>
				<div className='technologies'>
					<Link
						to={{ pathname: 'https://mongodb.com/' }}
						target='_blank'
						className='link'
					>
						<div className='item'>
							<img
								src='https://infinapps.com/wp-content/uploads/2018/10/mongodb-logo.png'
								alt=''
							/>
							<p>More info</p>
							<p>Click</p>
						</div>
					</Link>
					<Link
						to={{ pathname: 'https://expressjs.com/' }}
						target='_blank'
						className='link'
					>
						<div className='item'>
							<img
								src='https://buttercms.com/static/images/tech_banners/ExpressJS.png'
								alt=''
							/>
							<p>More info</p>
							<p>Click</p>
						</div>
					</Link>
					<Link
						to={{ pathname: 'https://react.dev/' }}
						target='_blank'
						className='link'
					>
						<div className='item'>
							<img
								src='https://www.datocms-assets.com/45470/1631110818-logo-react-js.png'
								alt=''
							/>
							<p>More info</p>
							<p>Click</p>
						</div>
					</Link>
					<Link
						to={{ pathname: 'https://nodejs.org/en' }}
						target='_blank'
						className='link'
					>
						<div className='item'>
							<img
								src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1280px-Node.js_logo.svg.png'
								alt=''
							/>
							<p>More info</p>
							<p>Click</p>
						</div>
					</Link>
				</div>
				<p className='headling-p'>About website developer</p>
				<div className='about-owner'>
					<img src='/owner.png' alt='' />
					<div>
						<p>
							<span className='span-owner'>Age:</span> 23
						</p>
						<p>
							<span className='span-owner'>Name:</span> Iliyan Ivanov
						</p>
						<p>
							<span>🎓</span>South-West University "Neofit Rilski"
						</p>
						<p>
							<span>🏠</span> Vratsa
						</p>
						<p>
							<span>📧</span> ilian.ivanov00@gmail.com
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default About;
