import { modifyUser } from '../services/userService';
const ChangeAvatar = () => {
	const token = sessionStorage.getItem('token');

	function handleModif(e) {
		const data = new FormData();
		data.append('image', e.target.files[0]);

	

		modifyUser(token, data)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
				alert("L'extension de l'image n'est pas valide, veuillez ajouter une image de type : jpg, png ou webp");
			});
	}

    //change l'image à l'écran
	function handleImage(e) {
		document.getElementById('avatar').src = window.URL.createObjectURL(e);
	}
	return (
		<>
			<form
				method="PUT"
				id="modif-post-form"
				onChange={(e) => handleModif(e)}
			>
				<label htmlFor="image">
					<div className="bouton_jaune">Changer d'avatar</div>
				</label>

				<input
					type="file"
					id="image"
					name="image"
					onChange={(e) => {
						handleImage(e.target.files[0]);
					}}
					style={{ display: 'none' }}
				/>
			</form>
		</>
	);
};
export default ChangeAvatar;
