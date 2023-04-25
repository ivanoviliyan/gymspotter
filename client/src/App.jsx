import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './app.scss';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { Switch, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Gym from './pages/gym/Gym';
import RatingForm from './pages/rating/Rating';
import { useContext } from 'react';
import { AuthContext } from './authContext/AuthContext';
import Profile from './pages/profile/Profile';

const App = () => {
	const { user } = useContext(AuthContext);
	return (
		<Router>
			<Switch>
				<Route exact path='/'>
					{user ? <Home /> : <Redirect to='/register' />}
				</Route>
				<Route path='/register'>
					{!user ? <Register /> : <Redirect to='/' />}
				</Route>
				<Route path='/profile' component={Profile} />
				<Route path='/login'>{!user ? <Login /> : <Redirect to='/' />}</Route>
				<Route path='/gyms/:id' component={Gym}></Route>
				<Route path='/rate/:id' component={RatingForm}></Route>
			</Switch>
		</Router>
	);
};

export default App;
