import {
	getOneRecipe,
	getOneUser,
	modifyRecetteImage,
	modifyRecetteText,
} from '../../services/userService';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import IngredientAddSuppr from '../../components/IngredientAddSuppr';
import InstructionAddSuppr from '../../components/InstructionAddSuppr';
import TagAddSuppr from '../../components/tagAddSuppr';
import DeleteRecipe from './DeleteRecipe';
import { getUserById } from '../../services/userService';
import varGlobal from '../../components/varGlobal';
import Loading from '../../components/Loading';

const Focus = (props) => {
	const location = useLocation();
	const id = location.pathname.split('/RecipeFocus/')[1];
	const [recette, setRecette] = useState([]);
	const [isProprio, setIsProprio] = useState(false);
	const token = sessionStorage.getItem('token');
	const [currentUser, setCurrentUser] = useState([]);
	const [imageProfile, setImageProfile] = useState();
	const [loading, setLoading] = useState(true);
	const [toggle, setToggle] = useState(false);

	useEffect(() => {
		setLoading(true);
		Promise.all([getOneRecipe(id), getOneUser(token)])
			.then(([res1, res2]) => {
				setRecette(res1);
				setCurrentUser(res2);
				setTimeout(() => {
					setLoading(false); 
				}, 1000);
			})
			.catch((err) => console.log(err));
	}, [id, token, toggle]);

	useEffect(() => {
		var idUser = recette.posterId;
		getUserById(idUser)
			.then((res) => {
				setImageProfile(res);
			})
			.catch((err) => console.log(err));
	}, [loading, recette.posterId]);

	useEffect(() => {
		if (
			currentUser._id === recette.posterId ||
			currentUser.isAdmin === true
		) {
			setIsProprio(true);
		} else {
			setIsProprio(false);
		}
	}, [currentUser, recette]);

	function modifyImage(e) {
		//console.log(e.target.files[0]);
		const data = new FormData();
		data.append('image', e.target.files[0]);
		modifyRecetteImage(token, id, data)
			.then((res) => {
				//sessionStorage.setItem('recetteEnCours', res.msg);
				setToggle(!toggle);
				//setIsReady(true);
			})
			.catch((err) => {
				console.log(err); 
			});
	}

	const modifText = (e) => {
		var text = prompt('modifier le titre : ');
		if(text!==null && text!==""){
		modifyRecetteText(token, id, text)
			.then((res) => {
				setToggle(!toggle);
			})
			.catch((err) => {
				console.log(err);
			});
		}
	};

	return (
		<>
			<div className="focus">
				{loading && <Loading />}
				<article>
					<div className="focus_image">
						<label htmlFor="image" className="recette_image_focus">
							<img
								src={`${varGlobal}/images/${recette.imageUrl}`}
								alt=""
							/>
						</label>
					</div>
					<div className="focus_recette">
						<div className="titre">
							<p className="title" onClick={(e) => modifText(e)}>
								{recette.title}
							</p>
							<img
								src={`${varGlobal}/images/${imageProfile}`}
								alt="profil"
								className="avatar_focus"
							/>
						</div>

						<input
							type="file"
							id="image"
							name="image"
							style={{ display: 'none' }}
							onChange={(e) => modifyImage(e)}
						/>

						<IngredientAddSuppr id={id} />
						<InstructionAddSuppr id={id} />
						<TagAddSuppr id={id} />

						{isProprio && <DeleteRecipe id={id} token={token} />}
					</div>
				</article>
			</div>
		</>
	);
};
export default Focus;
