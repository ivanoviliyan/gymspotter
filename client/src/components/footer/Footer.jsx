import React from 'react';
import './footer.scss';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Link } from 'react-router-dom';

const Footer = () => {
	const handleUpButton = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};
	return (
		<div className='footer'>
			<div className='social-links'>
				<p>Get connected with us on social networks:</p>
				<div className='social'>
					<span>
						<FacebookIcon fontSize='large' />
					</span>
					<span>
						<InstagramIcon fontSize='large' />
					</span>
					<span>
						<TwitterIcon fontSize='large' />
					</span>
					<span>
						<GoogleIcon fontSize='large' />
					</span>
					<span>
						<GitHubIcon fontSize='large' />
					</span>
				</div>
			</div>
			<div className='links-gym'>
				<div className='company'>
					<img
						className='logo-footer'
						src='https://svgshare.com/i/sFF.svg'
						alt='logo'
					/>
				</div>
				<div className='footer-nav'>
					<h3>Navigation</h3>
					<div>
						<Link to='/'>
							<span>Home</span>
						</Link>
						<Link to='/search'>
							<span>Spot</span>
						</Link>
						<Link to='/about'>
							<span>About</span>
						</Link>
						<Link to='/profile'>
							<span>Profile</span>
						</Link>
					</div>
				</div>
				<div className='contacts'>
					<h3>Contacts:</h3>
					<span>Враца</span>
					<span>gymSpotter@yahoo.com</span>
					<span>+ 359 98 836 0425</span>
				</div>
			</div>
			<div className='copy-right'>
				<h3>© 2023 Copyright: GymSpotter.com</h3>
				<button onClick={handleUpButton}>
					<ArrowDropUpIcon />
					UP
				</button>
			</div>
		</div>
	);
};

export default Footer;
