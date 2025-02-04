import IndexLog from './log/IndexLog';
import Profil from './infoProfil/Profil';
import { useState,useEffect } from "react";

const IndexProfil = () => {

	const [isUserConnected, setIsUserConnected] = useState(sessionStorage.getItem("token"));
	const [toggle, setToggle] = useState(false);
	
	//met à jour isUserConnected directement grâce à l'information du sessionStorage
useEffect(()=>{
	if(isUserConnected!==null){
		setToggle(true);
	}else{
		setToggle(false)
	}
},[toggle,isUserConnected]);
	

	return (
		<>
			<div className="indexProfil">
				{isUserConnected && <Profil changeIsUserConnected={(state)=>setIsUserConnected(state)} />}
				{!isUserConnected && <IndexLog changeIsUserConnected={(state)=>setIsUserConnected(state)} />}
			</div>
		</>
	);
};
export default IndexProfil;
