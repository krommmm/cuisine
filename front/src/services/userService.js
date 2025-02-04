import varGlobal from '../components/varGlobal';

export const getUsers = async (url) => {
	try {
		const res = await fetch(url, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
		const data = await res.json();

		return data;
	} catch (err) {
		console.log(err);
	}
};

export const isTokenValid = async(token)=>{
	try{
		const response = await fetch(`${varGlobal}/api/auth/`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				token:token
			}),
		});
		const data = await response.json();

		return data;
	}
	catch (err){
		console.log(err);
	}
}



export const getUserById = async (id) => {
	try {
		const res = await fetch(`${varGlobal}/api/auth/${id}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
		const data = await res.json();

		return data;
	} catch (err) {
		console.log(err);
	}
};

export const signup = async (objetSignup) => {
	try {
		const response = await fetch(`${varGlobal}/api/auth/signUp`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: objetSignup.email,
				password: objetSignup.password,
				pseudo: objetSignup.pseudo,
				ville : objetSignup.ville
			}),
		});
		const data = await response.json();

		return data;
	} catch (err) {
		console.log(err);
	}
};

export const login = async (Objetlogin) => {
	try {
		const response = await fetch(`${varGlobal}/api/auth/login`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: Objetlogin.email,
				password: Objetlogin.password,
			}),
		});
		const data = await response.json();

		return data;
	} catch (err) {
		console.log(err);
	}
};

export const forgotPassword = async(email)=>{
	try{
		const response = await fetch(`${varGlobal}/api/auth/forgot`,{
			method:'PUT',
			headers:{
				Accept: 'application/json',
				'Content-Type':'application/json',
			},
			body:JSON.stringify({
				email:email,
			}),
		});
		const data = await response.json();
		return data;

	}catch(err){
		console.log(err);
	}
};

export const changePassword = async(token,password)=>{
	try{
		const response = await fetch(`${varGlobal}/api/auth/change`,{
			method:'PUT',
			headers:{
				Accept: 'application/json',
				'Content-Type':'application/json',
			},
			body:JSON.stringify({
				token:token,
				password: password
			}),
		});
		const data = await response.json();
		return data;

	}catch(err){
		console.log(err);
	}
};

export const getOneUser = async (token) => {
	try {
		const response = await fetch(`${varGlobal}/api/auth`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await response.json();

		return data;
	} catch (err) {
		console.log(err);
	}
};

export const modifyUser = async (token, image) => {
	try {
		if (image !== undefined) {
			const response = await fetch(`${varGlobal}/api/auth`, {
				method: 'PUT',
				//'Content-Type': 'multipart/form-data',
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: image,
			});
			const data = await response.json();
			return data;
		} else {
			console.log('data undefined');
		}
	} catch (err) {
		console.log(err);
	}
};

export const deleteUser = async (token) => {
	try {
		const response = await fetch(`${varGlobal}/api/auth`, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await response.json();

		return data;
	} catch (err) {
		console.log(err);
	}
};

export const getRecipes = async () => {
	try {
		const response = await fetch(`${varGlobal}/api/recettes`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
	}
};

export const getOneRecipe = async (id) => {
	try {
		const response = await fetch(`${varGlobal}/api/recettes/${id}`, {
			method: 'GET',
			headers: {
				//Accept: 'application/json',
				//'Content-type': 'application/json',
				//'Content-Type': 'multipart/form-data',
			},
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
	}
};

export const addRecipe = async (token, recette) => {
	try {
		const response = await fetch(`${varGlobal}/api/recettes`, {
			method: 'POST',
			'Content-Type': 'multipart/form-data',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: recette,
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
	}
};

export const modifyRecetteImage = async (token, id, image) => {
	//console.log("Image:", image.get("image").name);
	//console.log("Image:", image.get("image"));
	try {
		const response = await fetch(`${varGlobal}/api/recettes/${id}`, {
			method: 'PUT',
			//'Content-Type': 'multipart/form-data',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: image,
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
	}
};

export const modifyRecetteText = async (token, id, text) => {
	try {
		const response = await fetch(`${varGlobal}/api/recettes/${id}/titre`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				title: text,
			}),
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
	}
};

export const handleIngredient = async (truc, id, token) => {
	try {
		const response = await fetch(`${varGlobal}/api/recettes/${id}`, {
			method: 'PATCH',
			headers: {
				Accept: 'application/json',
				'Content-type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				ingredientIdFromFetch: truc.ingredientIdFromFetch,
				ingredient: truc.ingredient,
				crud: truc.crud,
			}),
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
	}
};
export const handleInstruction = async (truc, id, token) => {
	try {
		const response = await fetch(`${varGlobal}/api/recettes/${id}`, {
			method: 'PATCH',
			headers: {
				Accept: 'application/json',
				'Content-type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				instructionIdFromFetch: truc.instructionIdFromFetch,
				instruction: truc.instruction,
				crud: truc.crud,
			}),
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
	}
};

export const handleTag = async (truc, id, token) => {
	try {
		const response = await fetch(`${varGlobal}/api/recettes/${id}`, {
			method: 'PATCH',
			headers: {
				Accept: 'application/json',
				'Content-type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				tagIdFromFetch: truc.tagIdFromFetch,
				tag: truc.tag,
				crud: truc.crud,
			}),
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
	}
};

export const deleteRecipe = async (id, token) => {
	try {
		const response = await fetch(`${varGlobal}/api/recettes/${id}`, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
	}
};
