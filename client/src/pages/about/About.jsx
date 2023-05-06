import React from 'react';
import './about.scss';
import Navbar from '../../components/navbar/Navbar';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const About = () => {
	return (
		<>
			<Navbar />
			<div className='about-page'>
				<h1>About page</h1>
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
		</>
	);
};

export default About;
