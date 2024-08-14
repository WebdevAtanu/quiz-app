import { useState } from 'react'
import './App.css';
import conText from './component/context/conText'
import RouteRule from './component/RouteRule';

function App() {
  const [userOption, setUserOption] = useState({})

  return (
    <conText.Provider value={{ option: {userOption:userOption,setUserOption:setUserOption}}}>
    <div className='main m-auto mb-5'>
     <RouteRule/> 
    </div>
    </conText.Provider>
  )
}

export default App
