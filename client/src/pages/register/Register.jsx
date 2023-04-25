import axios from 'axios';
import { useRef, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './register.scss';

const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const history = useHistory();

	const emailRef = useRef();
	const passwordRef = useRef();
	const usernameRef = useRef();

	const handleStart = () => {
		setEmail(emailRef.current.value);
	};

	const handleFinish = async (e) => {
		e.preventDefault();
		setPassword(passwordRef.current.value);
		setUsername(usernameRef.current.value);

		try {
			const response = await axios.post('/auth/register', {
				email,
				username,
				password,
			});
			if (response.status === 201 || 200) {
				history.push('/login');
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className='register'>
			<img className='logo' src='https://svgshare.com/i/sFF.svg' alt='' />
			<div className='wrapper'>
				<h1>Registration Here</h1>
				<div className='singDiv'>
					<p>
						You already have registration? Click{' '}
						<Link className='here' to='/login'>
							here!
						</Link>
					</p>
				</div>
				{!email ? (
					<div className='input'>
						<input type='email' placeholder='Enter your email' ref={emailRef} />
						<button className='registerBtn' onClick={handleStart}>
							Get Started
						</button>
					</div>
				) : (
					<form className='input'>
						<input type='username' placeholder='username' ref={usernameRef} />
						<input
							type='password'
							placeholder='Enter your password'
							ref={passwordRef}
						/>
						<button className='registerBtn' onClick={handleFinish}>
							Register
						</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default Register;
