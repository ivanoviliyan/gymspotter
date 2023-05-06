import './navbar.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import RoomIcon from '@mui/icons-material/Room';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from 'react';
import { AuthContext } from '../../authContext/AuthContext';
import { logout } from '../../authContext/AuthActions';

const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const { dispatch } = useContext(AuthContext);
	const userJSON = localStorage.getItem('user');
	const user = JSON.parse(userJSON);
	window.onscroll = () => {
		setIsScrolled(window.pageYOffset === 0 ? false : true);
		return () => (window.onscroll = null);
	};

	return (
		<header className={isScrolled ? 'navbar scrolled' : 'navbar'}>
			<img className='logo' src='https://svgshare.com/i/sFF.svg' alt='logo' />
			<input type='checkbox' id='nav-toggle' className='nav-toggle' />
			<nav className={isScrolled ? 'scrolled' : ''}>
				<ul>
					<li className='listitem'>
						<Link to='/'>
							<HomeIcon /> Home
						</Link>
					</li>
					<li className='listitem'>
						<Link to='/search'>
							<RoomIcon /> Spot
						</Link>
					</li>
					<li className='listitem'>
						<Link to='/about'>
							<InfoIcon /> About
						</Link>
					</li>

					<li className='listitem'>
						<Link to='/profile'>
							<div className='profile-pic'>
								<img
									src={
										user.profilePic ||
										'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
									}
									alt=''
								/>
								Profile
							</div>
						</Link>
					</li>

					<li className='listitem' onClick={() => dispatch(logout())}>
						<Link to='/login'>
							<span>
								<LogoutIcon />
								Logout
							</span>
						</Link>
					</li>
				</ul>
			</nav>
			<label htmlFor='nav-toggle' className='nav-toggle-label'>
				<span />
			</label>
		</header>
	);
};

export default Navbar;
