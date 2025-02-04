import { getOneRecipe, handleTag, getOneUser } from '../services/userService';
import { useState, useEffect } from 'react';

const TagAddSuppr = (props) => {
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
		instructions: [],
		ingredients: [],
		tags: [],
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

	function addTag(e) {
		var tag = prompt('Ajoutez un ingredient');

		const tagObject = {
			tagIdFromFetch: '',
			tag: tag,
			crud: 'tc',
		};

		if(tag!==null && tag!==""){
		handleTag(tagObject, id, token)
			.then((res) => {
				console.log(res);
				setTriggers(!triggers);
			})
			.catch((err) => console.log(err));
		}
	}

	function deleteTag(e, tagsId) {
		const tagObject = {
			tagIdFromFetch: `${tagsId}`,
			tag: 'no tag',
			crud: 'td',
		};

		handleTag(tagObject, id, token)
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
		} else {
			setIsProprio(false);
		}
	}, [currentUser, recette]);

	return (
		<>
			{isProprio && (
				<div
					className="bouton_jaune"
					onClick={(e) => {
						addTag(e);
					}}
				>
					Ajouter un tag
				</div>
			)}
			<br />

			<h2>Tags:</h2>
			<div className="tag_container">
				{recettes.tags.map((tags, index) => (
					<div key={index} className="tags_align">
						<ul>
							<li className="no_list-style-type">
								🕵️‍♂️ {tags.tag}
							</li>
						</ul>

						{isProprio && (
							<div
								style={{ cursor: 'pointer' }}
								onClick={(e) => {
									deleteTag(e, tags._id);
								}}
							>
								<i className="fa-solid fa-trash-can"/>
							</div>
						)}
					</div>
				))}
			</div>
		</>
	);
};
export default TagAddSuppr;
