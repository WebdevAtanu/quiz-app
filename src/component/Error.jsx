import React,{useContext} from 'react';
import conText from './context/conText';
import {Link} from 'react-router-dom';

function Error() {
	const { option } = useContext(conText);
	option.userOption='';
	return (
		<>
		<div className='flex items-center justify-center'>
			<img src="error.png" alt="" className='w-1/2 md:w-1/3 mt-5' />
		</div>
		<div className='text-center mt-5'>
			<Link to='/'><button className='border border-slate-800 rounded py-2 px-4 mt-5 mb-12 text-sm hover:bg-slate-800 hover:text-white duration-200'>BACK TO HOME</button></Link>
		</div>
		</>
	)
}

export default Error;