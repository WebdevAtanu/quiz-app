import React,{useContext,useState,useEffect} from 'react';
import {useLocation,Link} from 'react-router-dom';
import conText from './context/conText';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


function Result() {
	const { option } = useContext(conText);
	option.userOption='';
	const location=useLocation();
	const scoreData=location.state;
	const [value,setValue]=useState(0);
	useEffect(()=>{
		let score=(scoreData.score*100)/scoreData.questions;
		setValue(Math.round(score));
	})
	return (
		<>
		<div className='p-5 flex flex-col items-center justify-center'>
			<h1 className='text-3xl md:text-5xl'>Congratulations! <span className='text-blue-700'>{scoreData.name}</span></h1>
			<p className='text-xl mt-2 text-slate-700'>You scored {scoreData.score} out of {scoreData.questions}</p>
			<img src="trophy.jpg" alt="" className='w-1/12 mt-12 animate-bounce'/>
			
		</div>
		<div className='w-1/4 md:w-1/12 m-auto'>
		<CircularProgressbar
        value={value}
        text={`${value}%`}
        styles={buildStyles({
          pathColor: `rgba(18 88 239, ${value / 100})`,
          textColor: '#00548b',
          trailColor: 'aquamarine',
          backgroundColor: '#3e98c7',
        })}
      />
      </div>
      <div className='text-center'>
      <Link to='/'><button className='mt-5 mb-12 text-xl text-blue-700 underline underline-offset-4 hover:text-slate-700 duration-200'>PLAY AGAIN</button></Link>
      </div>
      </>
	)
}

export default Result