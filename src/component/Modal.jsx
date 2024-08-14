import React, { useState,useRef,useContext } from 'react';
import Modal from 'react-modal';
import conText from './context/conText';

Modal.setAppElement('#root');

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const name=useRef();
  const category=useRef();
  const difficulty=useRef();
  const number=useRef();
  const {option}=useContext(conText);

  const closeModal = () => {
    setIsOpen(false);
  };

  const userData=(e)=>{
    e.preventDefault();
    closeModal();
    option.setUserOption({
      name:name.current.value,
      difficulty:difficulty.current.value,
      number:number.current.value,
      category:category.current.value,
    })

  }
  return (
    <>
    <div>
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <h1 className='text-xl bg-slate-900 p-3 text-white mb-12 text-center'>SELECT YOUR TOPIC</h1>
      <form onSubmit={userData} className='p-5'>
        <div className='flex flex-col'>
          <p className=''>YOUR NAME</p>
            <input type="text" ref={name} required className='border border-black p-2 rounded'/>
        </div>
        <div className='flex flex-col mt-5'>
          <p className=''>CATEGORY</p>
            <select className='border border-black p-2 rounded' required ref={category}>
              <option value="computers">Computers</option>
              <option value="sports">Sports</option>
              <option value="film">Film</option>
            </select>
        </div>
        <div className='flex flex-col mt-5'>
          <p className=''>DIFFICULTY</p>
            <select className='border border-black p-2 rounded' required ref={difficulty}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
        </div>
        <div className='flex flex-col mt-5'>
          <p className=''>NO. OF QUESTIONS</p>
            <select className='border border-black p-2 rounded' required ref={number}>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
        </div>
        <div className="text-center">
        <button type='submit' className='p-2 border-black border mt-12 duration-200 hover:bg-slate-900 hover:text-white'>QUICK START</button>
        </div>
        </form>
        
      </Modal>
    </div>
    {
      option.userOption.category?null: <button className='rounded bg-slate-900 px-5 py-2 text-xl text-white' onClick={()=>setIsOpen(true)}>SELECT TOPIC</button>
    }
    </>
  );
}

export default MyComponent;
