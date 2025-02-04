import Login from './Login';
import Signup from '../log/Signup';
import { useState, useEffect } from "react";

const IndexLog = (props) => {


const [isNotSubscribed, setIsNotSubscribed] = useState(false);
const [isUserConnected, setIsUserConnected] = useState(false);


useEffect(()=>{
if(sessionStorage.getItem("token")!==null){
		props.changeIsUserConnected(true);
}
	
},[isUserConnected,props]);

	return (
		<>
			{isNotSubscribed && <Signup changeIsUserConnected={state=>setIsUserConnected(state)} changeisNotSubscribe={state=>setIsNotSubscribed(state)}  />}
			{!isNotSubscribed && <Login changeisNotSubscribe={state=>setIsNotSubscribed(state)} changeIsUserConnected={state=>setIsUserConnected(state)}/>}
			
		</>
	);
};

export default IndexLog;
