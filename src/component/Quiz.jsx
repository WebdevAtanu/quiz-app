import React, { useState, useEffect, useContext } from 'react';
import conText from './context/conText';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Quiz() {
    const { option } = useContext(conText);
    const [question, setQuestion] = useState([]);
    const [catNum, setCatNum] = useState(0);
    const [index,setIndex]=useState(0);
    const [tag,setTag]=useState(false);
    const [lock,setLock]=useState(true);
    const [score,setScore]=useState(0);
    const [sec,setSec]=useState(30);
    const nav=useNavigate();


  const timer = () => {
    setInterval(() => {
        setSec(prev => {
            if (prev > 0) {
                return prev - 1;
            } else {
                clearInterval(timer); // Clear interval when the countdown reaches 0
                nav('/error')
            }
        });
    }, 1000);
};

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
            default:
                categoryNumber = 0;
                break;
        }
        setCatNum(categoryNumber);

        if (categoryNumber) {
            axios.get(`https://opentdb.com/api.php?amount=${option.userOption.number}&category=${categoryNumber}&difficulty=${option.userOption.difficulty}&type=multiple`)
                .then(res => {
                    const formattedQuestions = res.data.results.map((element) => ({
                        question: element.question,
                        answer: element.correct_answer,
                        options: [...element.incorrect_answers, element.correct_answer].sort()
                    }));
                    setQuestion(formattedQuestions);
                    timer();
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [option]);

    const checker=(e)=>{
    	if(lock){
    	if(e.target.innerText==question[index].answer){
    		e.target.classList.add('correct');
    		setLock(false);
    		setScore(score+1);
    	}
    	else{
    		e.target.classList.add('wrong');
    		setLock(false);
    	}
    	}
    	
    }

    const next=()=>{
    	if(lock==false){
    	setIndex(index+1);
    	setLock(true);
        setSec(30);
    	if(index==option.userOption.number-2){
    		setTag(true);
    	}
    	const liArray = [...document.querySelectorAll('#list li')];
    	liArray.forEach(item=>item.classList.remove('correct'));
    	liArray.forEach(item=>item.classList.remove('wrong'));
    	}
    	else{
    		toast.error('Select an option first !!');
    	}
    	
    }
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
            <div className='border border-black border-2 my-5 p-5 md:w-1/2 m-auto quiz'>
                <div className='mb-3 flex justify-end'><span className='bg-slate-800 px-3 py-1 text-white rounded flex gap-1 items-center'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-alarm" viewBox="0 0 16 16">
                    <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z"/>
                    <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1"/>
                    </svg> : {sec}s</span></div>
            	<p className='text-xl'>{index+1}. {question[index]?.question}</p>
                {
                    question[index]?.options?<ul id='list'>
                    {
                        question[index]?.options.map((item,i)=><li key={i} onClick={checker} className='border border-black rounded p-3 my-2 cursor-pointer hover:border-sky-900'>{item}</li>)
                    }
                </ul>:<h1 className='w-1/2 m-auto'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150"><path fill="none" stroke="#13165E" strokeWidth="10" strokeLinecap="round" strokeDasharray="300 385" strokeDashoffset="0" d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"><animate attributeName="stroke-dashoffset" calcMode="spline" dur="2" values="685;-685" keySplines="0 0 1 1" repeatCount="indefinite"></animate></path></svg></h1>
                }
            	
            	<div className="text-center">
            	{

            		tag?<button onClick={submit} className='bg-slate-700 py-2 px-5 mt-3 rounded text-white hover:bg-slate-800'>Submit</button>:<button onClick={next} className='bg-slate-700 py-2 px-5 mt-3 rounded text-white hover:bg-slate-800'>Next</button>
            	}
            	<p className='mt-3 text-sm text-gray-700'>Question no. {index+1} of {option.userOption.number}</p>
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
        </div>
    );
}

export default Quiz;
