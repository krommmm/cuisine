import { useState, useEffect } from 'react';
import IngredientAddSuppr from '../../../components/IngredientAddSuppr';
import InstructionAddSuppr from '../../../components/InstructionAddSuppr';
import TagAddSuppr from '../../../components/tagAddSuppr';
import { addRecipe, getOneRecipe } from '../../../services/userService';
import Error404 from '../../../components/Error404';
import varGlobal from '../../../components/varGlobal';

const AddRecipes = () => {
	var title = '';

	const token = sessionStorage.getItem('token');

	const [id, setId] = useState(false);
	const [recette, setRecette] = useState([]);
	const [toggle, setToggle] = useState(false);
	const [isReady, setIsReady] = useState(false);
	const [titleProvisoire, setTitleProvisoire] = useState("");
	const [titleFinished, setTitleFinished] = useState(false);

	const [isUserConnected, setIsUserConnected] = useState(false);

	useEffect(() => {
		if (sessionStorage.getItem('token') !== null) {
			setIsUserConnected(true);
		} else {
			setIsUserConnected(false);
		}
	}, []);

	function handleModif(e) {
		if (titleProvisoire === '') {
			alert('Veuillez ajouter un titre en premier');
		} else {
			const data = new FormData();
			data.append('image', e.target.files[0]);
			data.append('title', titleProvisoire);

			addRecipe(token, data)
				.then((res) => {
			        setTitleFinished(!titleFinished);
					sessionStorage.setItem('recetteEnCours', res.msg);
					setToggle(!toggle);
					setIsReady(true);
				})
				.catch((err) => {
					console.log(err);
					alert("L'extension de l'image n'est pas valide, veuillez ajouter une image de type : jpg, png ou webp");
				});
		}
	}

	useEffect(() => {
		getOneRecipe(sessionStorage.getItem('recetteEnCours'))
			.then((res) => {
				setRecette(res);
			})
			.catch((err) => console.log(err));
	}, [toggle]);

	function handleTitle(e) {
		title = prompt('Entrez un titre');
		setTitleProvisoire(title);
		setTitleFinished(!titleFinished);
	}

	useEffect(() => {
		setId(sessionStorage.getItem('recetteEnCours'));
	}, [toggle]);

	return (
		<>
			<div className="coucou">
				{isUserConnected && (
					<div className="addRecipes">
						
						<div className="left">
						
						{titleFinished && (<p className="title">{titleProvisoire}</p>)}
							{isReady && (
							
								<p className="title">{recette.title}</p>
								
								
							)}
							<br />
							
							{isReady && (
								<img
									src={`${varGlobal}/images/${recette.imageUrl}`}
									alt=""
								/>
							)}
						</div>
						<div className="right">
							<form
								method="PUT"
								id="modif-post-form"
								onChange={(e) => handleModif(e)}
							>
								<h2>Ajout d'une recette</h2>
								<div
									className="bouton_jaune"
									onClick={(e) => handleTitle(e)}
								>
									Ajouter titre
								</div>
								<label htmlFor="image">
									<div className="bouton_jaune">
										Choisir image
									</div>
								</label>

								<input
									type="file"
									id="image"
									name="image"
									style={{ display: 'none' }}
								/>
							</form>

							{id && <IngredientAddSuppr id={id} />}
							{id && <InstructionAddSuppr id={id} />}
							{id && <TagAddSuppr id={id} />}
						</div>
					</div>
				)}
				{!isUserConnected && <Error404 />}
			</div>
		</>
	);
};

export default AddRecipes;
