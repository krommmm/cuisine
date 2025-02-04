import { useState, useEffect } from 'react';
import { getOneUser } from '../services/userService';
import varGlobal from './varGlobal';

const ProfilPresentation = () => {
	const [infoPerso, setInfoPerso] = useState({});
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		var token = sessionStorage.getItem('token');

		const dataUser = async (token) => {
			const response = await getOneUser(token);
			var data = await response;
			setInfoPerso(data);
			setIsReady(true);
		};
		dataUser(token);
	}, []);
	return (
		<>
			<div className="profilPresentation_container">
				<h2 className="capitalize white">Bienvenue {infoPerso.pseudo} ! </h2>
				{isReady && (
					<img
						id="avatar"
						className="imgProfil"
						src={`${varGlobal}/images/${infoPerso.imageProfil}`}
						alt=""
					/>
				)}
			</div>
		</>
	);
};
export default ProfilPresentation;
