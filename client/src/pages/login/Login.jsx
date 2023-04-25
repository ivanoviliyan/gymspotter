import { useContext, useState } from 'react';
import { login } from '../../authContext/apiCalls';
import { AuthContext } from '../../authContext/AuthContext';
import './login.scss';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { dispatch } = useContext(AuthContext);
	const handleLogin = (e) => {
		e.preventDefault();
		login({ email, password }, dispatch);
	};

	return (
		<>
			<div className='login'>
				<img className='logo' src='https://svgshare.com/i/sFF.svg' alt='' />
				<div className='wrapper'>
					<form>
						<h1>Sing In</h1>
						<input
							type='email'
							placeholder='Enter your email or phone number'
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							type='password'
							placeholder='Enter your password'
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button onClick={handleLogin} className='singInBtn'>
							Sing In
						</button>
						<span className='new-user'>
							New to GymSpotter?{' '}
							<Link to='/register'>
								<span className='new-user-b'>Sing up now!</span>
							</Link>
						</span>
					</form>
				</div>
			</div>
		</>
	);
};
export default Login;
