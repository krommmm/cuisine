import { deleteRecipe } from '../../services/userService';

const DeleteRecipe = (props) => {
	
	function supprimerRecette(e) {
		let reponse = prompt("Etes vous sur de supprimer la recette ? (O/N) ");
	if(reponse==="O" || reponse==="o"){
		deleteRecipe(props.id, props.token)
			.then((res) => {
				window.location.href = '/';
			})
			.catch((err) => console.log(err));
		}
	}

	return (
		<>
			<div
				className="bouton_jaune"
				onClick={(e) => {
					supprimerRecette(e);
				}}
			>
				Supprimer la recette
			</div>
		</>
	);
};
export default DeleteRecipe;
