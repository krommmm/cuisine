import { deleteUser } from '../../../services/userService';
import { useEffect } from 'react';

import ProfilPresentation from '../../../components/ProfilPresentation';
import ChangeAvatar from '../../../components/ChangeAvatar';

const Profil = (props) => {
	const token = sessionStorage.getItem('token');

	const handlLogOut = (e) => {
		sessionStorage.removeItem('token');
		if (sessionStorage.getItem('token') === null) {
			props.changeIsUserConnected(false);
		}
	};

	function handleDelete(e) {
		var suppr = prompt("voullez vous vraiment supprimer votre compte ainsi que toutes vos recettes associés ? (o/n)")
		if(suppr==="o" || suppr==="O"){
		deleteUser(token)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
		sessionStorage.removeItem('token');
		props.changeIsUserConnected(false);
		}
	}
	useEffect(() => {
		sessionStorage.removeItem('recetteEnCours');
	}, []);

	return (
		<>
			<div className="profil">
				<div className="profil_container">
					<ProfilPresentation />
					<div className="button_container">
						<h2>Tableau de bord</h2>
						<ChangeAvatar />
						<br />
					
						<div
							type="button"
							className="bouton_jaune"
							onClick={(e) => handlLogOut(e)}
						>
							Se déconnecter
						</div>
						<div
							className="bouton_rouge"
							onClick={(e) => handleDelete(e)}
						>
							Supprimer son compte
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Profil;
