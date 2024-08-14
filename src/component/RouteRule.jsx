import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Header from './header_footer/Header';
import Footer from './header_footer/Footer';
import Error from './Error'

import Dashboard from './Dashboard';
import Modal from './Modal';
import Result from './Result';

function RouteRule() {
	return (
		<BrowserRouter>
		<Header/>
			<Routes>
				<Route path='/' element={<Dashboard/>}/>
				<Route path='/result' element={<Result/>}/>
				<Route path='/error' element={<Error/>}/>
			</Routes>
		<Footer/>
		</BrowserRouter>
	)
}

export default RouteRule