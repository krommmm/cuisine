import { useState, useEffect } from 'react';
import { getRecipes } from '../../../services/userService';
import { citations } from './citations';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../../context/theme';
import varGlobal from '../../../components/varGlobal';

const Recipes = () => {
	var isUserConnected = sessionStorage.getItem('token');
	const [toggle, setToggle] = useState(false);
	const [recettes, setRecettes] = useState([]);
	const [filterMachin, setFilterMachin] = useState([]);
	const [loading, setLoading] = useState(true);
	const [newCitation, setNewCitation] = useState('');


	var search = '';
	var filteredMixTab = [];

	useEffect(() => {
		const randomCitation = Math.floor(Math.random() * citations.length);
		setNewCitation(citations[randomCitation]);
	}, []);


	useEffect(() => {
		if (search === undefined) {
			setFilterMachin(recettes);
		}
	}, [recettes, search]);

	useEffect(() => {
		if (isUserConnected !== null) {
			setToggle(true);
		}
	}, [toggle, isUserConnected]);

	useEffect(() => {
		sessionStorage.removeItem('recetteEnCours');
		setLoading(true);
		getRecipes()
			.then((res) => {
				shuffle(res);
				setRecettes(res);
				setFilterMachin(res);
				setTimeout(() => {
					setLoading(false);
				}, 1);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	//fonction qui retourne un tableau mélangé
	function shuffle(array) {
		let currentIndex = array.length,
			randomIndex;

		// While there remain elements to shuffle.
		while (currentIndex !== 0) {
			// Pick a remaining element.
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			];
		}

		return array;
	}

	function handleSearch(e) {
		e.preventDefault();
		search = e.target.value;

		//-----------------ingrédients de toutes les recettes-----------------------
		const ingredientTab0 = [];
		recettes.map((recette) => {
			return recette.ingredients.map((ingredient) => {
				return ingredientTab0.push(ingredient.ingredient);
			});
		});
		recettes.map((recette) => {
			return recette.tags.map((tag) => {
				return ingredientTab0.push(tag.tag);
			});
		});
		//-------------------------------------------------------------------------
		//--------------------- tous les ingrédients en minuscule -----------------
		const ingredientMinuscule = [];
		ingredientTab0.map((ingredient) => {
			let ingredientMini = ingredient.toLowerCase();
			//console.log(ingredientMini);
			return ingredientMinuscule.push(ingredientMini);
		});
		//-------------------------------------------------------------------------

		//---------- letters2Recipes----------------------------------------------
		const allRecipes = [];
		recettes.map((recette) => {
			return allRecipes.push(recette.title);
		});

		const filteredRecipes = allRecipes.filter((recette) => {
			return recette.toLowerCase().includes(search.toLowerCase());
		});
		//-----------------------------------------------------------------------

		//---------------------------- Letters 2 ingredients------------------------
		const filtered = ingredientMinuscule.filter((ingredient) => {
			return ingredient.includes(search.toLowerCase()); //.toLowerCase() pour rechercher en minuscule même si on tappe une majuscule
		});
		// Affiche tous les ingrédients filtrés par rapport au lettres tappé dans l'input
		//document.querySelector('.ingrédients').innerHTML = `${filtered}`;
		var recipesByIngredient = [];
		recettes.forEach((recette) => {
			recette.ingredients.forEach((ingredient) => {
				if (filtered.includes(ingredient.ingredient.toLowerCase())) {
					recipesByIngredient.push(recette.title);
				}
			});
		});
		recettes.forEach((recette) => {
			recette.tags.forEach((tag) => {
				if (filtered.includes(tag.tag.toLowerCase())) {
					recipesByIngredient.push(recette.title);
				}
			});
		});
		//-------------------------------------------------------------------------------

		// On filtre les recettes en doubles du tableau des recettes par ingrédient (car plusieurs ingredient/recette = plusieurs x même recette)
		const filteredRecipesByIngredient = recipesByIngredient.filter(
			(v, i, a) => a.indexOf(v) === i
		);
		var mixTab = filteredRecipes.concat(filteredRecipesByIngredient);
		//ensuite on filtre les doublons:
		if (search === '') {
			filteredMixTab = recettes;
		} else {
			filteredMixTab = mixTab.filter((v, i, a) => a.indexOf(v) === i);
		}
		//-------------------------console.log(filteredMixTab);

		if (search !== '' || null) {
			setFilterMachin(
				recettes.filter((recette) =>
					filteredMixTab.includes(recette.title)
				)
			);
		} else {
			setFilterMachin(recettes);
		}
		//console.log(allRecipes);
	}
	
	

	

	return (
		<>
			<div className="recipes">
				

				<div className="search_bar">
					<form
						className="formRecettes"
						onInput={(e) => handleSearch(e)}
					>
						<input
							type="text"
							className="input"
							placeholder="Recette ou ingredient"
						/>
						<i className="fa-solid fa-magnifying-glass" />
					</form>
				</div>
				<div className="citations">
					<p>"{newCitation}"</p>
				</div>

				{isUserConnected && (
					<NavLink to="Add-recipes">
						<button className="bouton_jaune">
							Ajouter une recette
						</button>
					</NavLink>
				)}
				<h1>Nos recettes</h1>

				<div className="recettes_container">
					{filterMachin.map((recette, index) => (
						<div key={index}>
							<NavLink to={`/RecipeFocus/${recette._id}`}>
								<article>
									<div className="recipes_title">
										<p>{recette.title}</p>
									</div>
									{loading ? (
										<div className="loading-container">
											<div className="loading"></div>
										</div>
									) : (
										<div class="img_container">
										<img
											src={`${varGlobal}/images/${recette.imageUrl}`}
											alt={''}
										/>
										</div>
									)}
								</article>
								<br />
							</NavLink>
						</div>
					))}
				</div>
			</div>
		</>
	);
};
export default Recipes;
