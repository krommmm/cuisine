import {
	getOneRecipe,
	handleInstruction,
	getOneUser,
} from '../services/userService';
import { useState, useEffect } from 'react';

const InstructionAddSuppr = (props) => {
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
		tags: [],
		instructions: [],
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

	function addInstruction(e) {
		var instruction = prompt('Ajoutez un instruction');

		const instructionObject = {
			instructionIdFromFetch: '',
			instruction: instruction,
			crud: 'ic',
		};

        if(instruction!==null && instruction!==""){
		handleInstruction(instructionObject, id, token)
			.then((res) => {
				console.log(res);
				setTriggers(!triggers);
			})
			.catch((err) => console.log(err));
		}
	}

	function deleteInstruction(e, instructionsId) {
		const instructionObject = {
			instructionIdFromFetch: `${instructionsId}`,
			instruction: 'no instruction',
			crud: 'id',
		};

		handleInstruction(instructionObject, id, token)
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
						addInstruction(e);
					}}
				>
					Ajouter une instruction
				</div>
			)}
			<br />

			<div>
				<h2>Instructions:</h2>
				{recettes.instructions.map((instructions, index) => (
					<div key={index} className="instructions_align">
						<ul className="condensed_instruction_container">
							<li className="condensed_instruction">
							⭐&nbsp;&nbsp;&nbsp;{instructions.instruction}
							</li>
						</ul>
						{isProprio && (
							<div
							style={{cursor:"pointer"}}
								onClick={(e) => {
									deleteInstruction(e, instructions._id);
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
export default InstructionAddSuppr;
