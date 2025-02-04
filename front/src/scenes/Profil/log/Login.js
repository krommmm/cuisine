import { login,forgotPassword } from '../../../services/userService';
import { useState, useEffect } from 'react';
import plat from '../../../images/plat.jpg';

const Login = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isReady, setIsReady] = useState(false);
	const [isEmailValid, setIsEmailValid] = useState("false");

		const [isVisible, setIsVisible] = useState(false);

	//Je remonte le composant pour que les valeurs des états soient prise en compte par l'objet
	useEffect(() => {
		var objetLogin = {
			email: email,
			password: password,
		};

		//Si les 3 inputs ont été validés, je lance la requête http
		if (isReady) {
			async function launchFunction() {
				const resultLogin = await login(objetLogin);
				const dataLogin = await resultLogin;
				if (dataLogin.msg !== 'incorect email/password pair') {
					sessionStorage.setItem('token', `${dataLogin.token}`);
					if (sessionStorage.getItem('token') !== null) {
						props.changeIsUserConnected(true);
					}
					
				} else {
					alert("paire email/mdp incorrecte");
					
				}
			}
			launchFunction();
		}
	}, [email, password, isReady, props]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setEmail(e.target.elements[0].value);
		setPassword(e.target.elements[1].value);
		setIsReady(true);
	};

	const askPassword =()=>{
	var email = prompt("Entrez votre mail : ");
	var regexEmail = /[\w-\.]+@[\w-]+\.+[\w]{1,10}$/;
	if(regexEmail.test(email)){
		setIsEmailValid(true);
	}else{
		setIsEmailValid(false);
	}
	if(email!==null && email!==undefined && email!=="" && isEmailValid!==false){
        forgotPassword(email)
        .then((res)=>{
            console.log(res);
			alert("vérifiez votre mail");
           
        })
        .catch((err)=>{
            console.log(err);
        })
	}else{
		alert("email non valide");
	}

	}

	const handleVisibilityPass = (e)=>{
		setIsVisible(!isVisible);
	}


	return (
		<>
			<div className="login">
				<div className="imagePart">
					<img src={plat} alt="pate" />
				</div>
				<div className="formPart">
					<div className="formPart_container">
						<h2>Connexion</h2>
						<form onSubmit={(e) => handleSubmit(e)}>
							<label htmlFor="email">Email</label>
							<input type="email" placeholder="email" />
							<div className="visibilityPass">
						<input
							type={isVisible ? "text" : "password"}
							placeholder="password"
							className="password"
							id="password1"
							
						/>
					
						<i className={isVisible ? "fa-sharp fa-solid fa-eye" : "fa-solid fa-eye-slash"} onClick={(e)=>handleVisibilityPass(e)}/>
						</div>
							<button type="submit">se connecter</button> 
						</form>

						<div className="inscription_login"
							
							onClick={() => props.changeisNotSubscribe(true)}
						>
							Pas encore inscrit ?{' '}
						</div>
						<br/>
						<div className="forgotPassword" onClick={(e)=>askPassword(e)}>
							Mdp oublié ?
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
