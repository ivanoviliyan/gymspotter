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
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import axios from 'axios';
const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const { dispatch } = useContext(AuthContext);

	window.onscroll = () => {
		setIsScrolled(window.pageYOffset === 0 ? false : true);
		return () => (window.onscroll = null);
	};

	const [user, setUser] = useState(null);
	useEffect(() => {
		async function fetchUser() {
			try {
				const response = await axios.get('/users/me', {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
					},
				});
				const { username, email, isAdmin, profilePic } = response.data;
				setUser({ username, email, isAdmin, profilePic });
			} catch (error) {
				console.error(error);
			}
		}

		fetchUser();
	}, []);

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
							<ManageAccountsIcon /> Profile
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
