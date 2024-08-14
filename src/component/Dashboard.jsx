import React,{useContext} from 'react';
import { useLocation } from 'react-router-dom';
import conText from './context/conText';
import Quiz from './Quiz';
import Modal from './Modal';

function Dashboard() {
	const { option } = useContext(conText);
	return (
		<div>
			
			{
				option?.userOption?.category?<Quiz/>:
				<div className='flex flex-col md:flex-row items-center gap-5 p-5'>
					<img src="quiz.png" alt="" className='w-1/2 md:w-1/3'/>
					<div className='flex flex-col gap-2 items-baseline'>
						<p className='text-2xl'>
						Challenge Your Mind, Compete with the Best—Show What You Know and Rise to the Top in Our Ultimate Quiz!</p>
						<p className='mt-2'>
						Quizzes offer an engaging way to reinforce learning, assess knowledge, and boost retention. They provide instant feedback, allowing learners to identify strengths and areas for improvement. Quizzes can also enhance critical thinking, encourage active participation, and make learning more interactive and enjoyable, benefiting both educators and students.</p>
						<Modal/>
					</div>
				</div>
			}
			
		</div>
	)
}

export default Dashboard
