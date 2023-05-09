import React from 'react';
import './footer.scss';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';


const Footer = () => {
	return (
		<div className='footer'>
			<div className='social-links'>
				<p>Get connected with us on social networks:</p>
				<div className='social'>
					<span className='fb'>
						<FacebookIcon fontSize='large' />
					</span>
					<span className='ig'>
						<InstagramIcon fontSize='large' />
					</span>
					<span className='tw'>
						<TwitterIcon fontSize='large' />
					</span>
					<span className='go'>
						<GoogleIcon fontSize='large' />
					</span>
					<span className='gh'>
						<GitHubIcon fontSize='large' />
					</span>
				</div>
			</div>
			<div className='links-wrapper'>
				<div className='company'></div>
				<div className='footer-nav'></div>
				<div className='contacts'></div>
			</div>
			<div className='copy-right'></div>
		</div>
	);
};

export default Footer;
