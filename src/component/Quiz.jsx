import React, { useState, useEffect, useContext } from 'react';
import conText from './context/conText';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Quiz() {
    const {option} = useContext(conText);
    const [question,setQuestion]=useState([]);
    const [index,setIndex]=useState(0);
    const [tag,setTag]=useState(false);
    const [lock,setLock]=useState(true);
    const [score,setScore]=useState(0);
    const [sec,setSec]=useState(30);
    const nav=useNavigate();

// =========timer function===========
    const timer = () => {
        setInterval(() => {
            setSec(prev => {
                if (prev > 0) {
                    return prev - 1;
                } else {
                    clearInterval(timer); // Clear interval when the countdown reaches 0
                    nav('/error'); // Navigate to error page 
                }
            });
        }, 1000);
    };

// =========Fetch function===========
    useEffect(() => {
        // Category number based on the category name
        let categoryNumber = 0;
        switch (option.userOption.category) {
            case 'sports':
                categoryNumber = 21;
                break;
            case 'computers':
                categoryNumber = 18;
                break;
            case 'film':
                categoryNumber = 11;
                break;
            case 'gk':
                categoryNumber = 9;
                break;
            case 'music':
                categoryNumber = 12;
                break;
            case 'games':
                categoryNumber = 15;
                break;
            case 'mythology':
                categoryNumber = 20;
                break;
            case 'history':
                categoryNumber = 23;
                break;
            case 'art':
                categoryNumber = 25;
                break;
            case 'gadget':
                categoryNumber = 30;
                break;
            default:
                categoryNumber = 0;
                break;
        }
        // Fetching data from the API
        if (categoryNumber) {
            axios.get(`https://opentdb.com/api.php?amount=${option.userOption.number}&category=${categoryNumber}&difficulty=${option.userOption.difficulty}&type=multiple`)
                .then(res => {
                    const format = res.data.results.map((element) => ({
                        question: element.question,
                        answer: element.correct_answer,
                        options: [...element.incorrect_answers, element.correct_answer].sort() // Suffling the options
                    }));
                    setQuestion(format);
                    timer();
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [option]);

// =========checking function===========
    const checker=(e)=>{
    	if(lock){
    	if(e.target.innerText==question[index].answer){
    		e.target.classList.add('correct'); // Option background will be green
    		setLock(false);
    		setScore(score+1);
    	}
    	else{
    		e.target.classList.add('wrong'); // Option background will be red
    		setLock(false);
    	}
    	}	
    }

// =========Next question function===========
    const next=()=>{
    	if(lock==false){
    	setIndex(index+1); // Next question will appear
    	setLock(true); // Option selection will be activated
        setSec(30); // Reset the timer
    	if(index==option.userOption.number-2){
    		setTag(true);
    	}
    	const liArray = [...document.querySelectorAll('#list li')]; // Remove the background styles
    	liArray.forEach(item=>item.classList.remove('correct'));
    	liArray.forEach(item=>item.classList.remove('wrong'));
    	}
    	else{
    		toast.error('Select an option first !!');
    	}	
    }

// =========Submit function===========
    const submit=()=>{
    	if(lock==false){
    		nav('/result',{
    		state:{score:score,questions:option.userOption.number,name:option.userOption.name}
    	})
    	}
    	else{
    		toast.error('Select an option first !!');
    	}	
    }

    return (
        <div className='px-5'>
            <div className='border-black border-2 my-5 mb-12 p-5 md:w-1/2 m-auto'>
                <div className='mb-6 flex items-center justify-between'>
                    <h1 className='text-center text-sm'>TOPIC- {option.userOption.category.toUpperCase()}</h1>
                    <span className='bg-slate-800 px-3 py-1 text-white rounded flex gap-1 items-center'>
                        <span><i className="bi bi-alarm"></i></span> : <span className={sec<10?'text-red-500':'text-white'}>{sec}s</span>
                    </span>
                </div>

            	<p className='text-xl'>{index+1}. {question[index]?.question}</p>
                {
                    question[index]?.options?
                    <ul id='list'>
                        {
                            question[index]?.options.map((item,i)=><li key={i} onClick={checker} className='border border-black rounded p-3 my-2 cursor-pointer hover:border-sky-900'>{item}</li>)
                        }
                    </ul>:<h1 className='w-1/2 m-auto'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150"><path fill="none" stroke="#13165E" strokeWidth="10" strokeLinecap="round" strokeDasharray="300 385" strokeDashoffset="0" d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"><animate attributeName="stroke-dashoffset" calcMode="spline" dur="2" values="685;-685" keySplines="0 0 1 1" repeatCount="indefinite"></animate></path></svg></h1>
                }
            	
            	<div className="text-center">
            	{
            		tag?<button onClick={submit} className='bg-slate-700 py-2 px-5 mt-3 rounded text-white hover:bg-slate-800'>SUBMIT</button>:<button onClick={next} className='bg-slate-700 py-2 px-5 mt-3 rounded text-white hover:bg-slate-800'>NEXT</button>
            	}
            	<p className='mt-3 text-sm text-gray-700'>Question no. {index+1} of {option.userOption.number}</p>
            	</div>

				<ToastContainer
				position="top-center"
				autoClose={500}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
				transition: Bounce
				/>
            </div>
        </div>
    );
}

export default Quiz;
