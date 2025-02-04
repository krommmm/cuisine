import {
	getOneRecipe,
	handleIngredient,
	getOneUser,
} from '../services/userService';
import { useState, useEffect } from 'react';

const IngredientAddSuppr = (props) => {
	var id = props.id;

	const token = sessionStorage.getItem('token');
	const [triggers, setTriggers] = useState(false);
	const [toggle, setToggle] = useState(false);

	const [recette, setRecette] = useState([]);
	const [isProprio, setIsProprio] = useState(false);
	const [currentUser, setCurrentUser] = useState({});


	const [recettes, setRecettes] = useState({
		title: '',
		imageUrl: '',
		instruction: '',
		ingredients: [],
	});

	useEffect(() => {
		getOneRecipe(id)
			.then((res) => {
				setRecettes(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id, triggers, toggle]);

	function addIngredient(e) {
		var ingredient = prompt('Ajoutez un ingredient');
	
		const ingredientObject = {
			ingredientIdFromFetch: '',
			ingredient: ingredient,
			crud: 'c',
		};

		if(ingredient!==null && ingredient!==""){
		handleIngredient(ingredientObject, id, token)
			.then((res) => {
				console.log(res);
				setTriggers(!triggers);
			})
			.catch((err) => console.log(err));
		}
	}

	function deleteIngredient(e, ingredientsId) {
		const ingredientObject = {
			ingredientIdFromFetch: `${ingredientsId}`,
			ingredient: 'no ingredient',
			crud: 'd',
		};

		handleIngredient(ingredientObject, id, token)
			.then((res) => {
				console.log(res);
				setToggle(!toggle);
			})
			.catch((err) => console.log(err));
	}

	useEffect(() => {
		Promise.all([getOneRecipe(id), getOneUser(token)])
			.then(([res1, res2]) => {
				setRecette(res1);
				setCurrentUser(res2);
			
			})
			.catch((err) => console.log(err));
	}, [id, token]);

	useEffect(() => {
		if (
			currentUser._id === recette.posterId ||
			currentUser.isAdmin === true
		) {
			setIsProprio(true);
		}else{setIsProprio(false)}
	}, [currentUser, recette]);

	return (
		<>
			{isProprio && (
				<div className="bouton_jaune"
					onClick={(e) => {
						addIngredient(e);
					}}
				>
					Ajouter un ingrédient
				</div>
			)}
			<br />

		

			<div>
				<h2>Ingredients:</h2>
				{recettes.ingredients.map((ingredients, index) => (
					<div key={index} className="ingredients_align">
						<ul className="condensed_container">
						 <li className="condensed">⭐&nbsp;&nbsp;&nbsp;{ingredients.ingredient}</li>
						 </ul>

						{isProprio && (
							<div style={{cursor:"pointer"}}
								onClick={(e) => {
									deleteIngredient(e, ingredients._id);
								}}
							>
								<i className="fa-solid fa-trash-can"/>
							</div>
						)}
					</div>
				))}
				<br/>
			</div>
		</>
	);
};
export default IngredientAddSuppr;
