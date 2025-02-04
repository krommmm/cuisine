import { signup, login } from '../../../services/userService';
import { useState, useEffect } from 'react';
const Signup = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [pseudo, setPseudo] = useState('');
	const [passwordVerify, setPasswordVerify] = useState('');

	const [secretQuestion, setSecretQuestion] = useState('');
	const [isEmail, setIsEmail] = useState(false);
	const [isPassword1, setIsPassword1] = useState(true);
	const [isPassword2, setIsPassword2] = useState(true);
	const [isPseudo, setIsPseudo] = useState(false);

	const [isMaj, setIsMaj] = useState(false);
	const [isMin, setIsMin] = useState(false);
	const [isChiffre, setIsChiffre] = useState(false);
	const [is10Length, setIs10Length] = useState(false);
	const [isCharSpe, setIsCharSpe] = useState(false);
	const [isNoSpace, setIsNoSpace] = useState(false);

	const [isVilleValid, setIsVilleValid] = useState('');
	const [isVisible, setIsVisible] = useState(false);

	var regexPseudo = /[\w]{2,}/;
	var regexMajuscule = /(?=.*[A-Z])/g;
	var regexMinuscule = /(?=.*[a-z])/g;
	var regexChiffre = /(?=.*[0-9])/g;
	var regex10Lettres = /^[@$&!?\w]{10,}$/g;
	var regexNoSpace = /(?=.*[\s])/g;
	var regexCharSpe = /(?=.*[$&@!?])/g;

	function postUser() {
		if (sessionStorage.getItem('token') !== null) {
		} else {
			var objetSignup = {
				email: email,
				password: password,
				pseudo: pseudo,
				ville: isVilleValid,
			};

			//Si les 3 inputs ont été validés, je lance la requête http

			async function launchFunctions() {
				const result = await signup(objetSignup);
				const data = await result;

				if (data.msg === 'User created !') {
					const resultLogin = await login(objetSignup);
					const dataLogin = await resultLogin;
					sessionStorage.setItem('token', `${dataLogin.token}`);
					props.changeIsUserConnected(true);
				} else if (data.msg === 'Mauvaise ville !') {
					alert(data.msg);
				}
			}
			launchFunctions();
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		if (
			password === passwordVerify &&
			isEmail &&
			isPseudo &&
			isMaj &&
			isMin &&
			isChiffre &&
			is10Length &&
			isCharSpe &&
			isNoSpace
		) {
			console.log('les regex sont validés');
			postUser();
		} else {
			console.log('les regex ne sont pas validés');
		}
	};

	const verifyRegexEmail = (e) => {
		var regexEmail = /[\w-\.]+@[\w-]+\.+[\w]{1,10}$/;
		if (regexEmail.test(e.target.value)) {
			setEmail(e.target.value);
			setIsEmail(true);
		} else {
			setIsEmail(false);
		}
	};

	const verifyRegexPassword1 = (e) => {
		setPassword(e.target.value);

		if (e.target.value !== document.querySelector('#password2').value) {
			document.querySelector('#password2').style.border = '1px solid red';
		} else {
			document.querySelector('#password2').style.border =
				'1px solid black';
		}

		//passwordErrorMax
		if (e.target.value === '') {
			document.querySelector('.passwordErrorMax').style.display = 'none';
			setIs10Length(false);
		} else {
			if (!regex10Lettres.test(e.target.value)) {
				document.querySelector('.passwordErrorMax').style.display =
					'flex';
				setIs10Length(false);
			} else {
				document.querySelector('.passwordErrorMax').style.display =
					'none';
				setIs10Length(true);
			}
		}

		//passwordErrorSpe
		if (e.target.value === '') {
			document.querySelector('.passwordErrorSpe').style.display = 'none';
			setIsCharSpe(false);
		} else {
			if (!regexCharSpe.test(e.target.value)) {
				document.querySelector('.passwordErrorSpe').style.display =
					'flex';
				setIsCharSpe(false);
			} else {
				document.querySelector('.passwordErrorSpe').style.display =
					'none';
				setIsCharSpe(true);
			}
		}

		//passwordErrorMajus
		if (e.target.value === '') {
			document.querySelector('.passwordErrorMajus').style.display =
				'none';
			setIsMaj(false);
		} else {
			if (!regexMajuscule.test(e.target.value)) {
				document.querySelector('.passwordErrorMajus').style.display =
					'flex';
				setIsMaj(false);
			} else {
				document.querySelector('.passwordErrorMajus').style.display =
					'none';
				setIsMaj(true);
			}
		}

		//passwordErrorMinus
		if (e.target.value === '') {
			document.querySelector('.passwordErrorMinus').style.display =
				'none';
			setIsMin(false);
		} else {
			if (!regexMinuscule.test(e.target.value)) {
				document.querySelector('.passwordErrorMinus').style.display =
					'flex';
				setIsMin(false);
			} else {
				document.querySelector('.passwordErrorMinus').style.display =
					'none';
				setIsMin(true);
			}
		}

		//passwordErrorNb
		if (e.target.value === '') {
			document.querySelector('.passwordErrorNb').style.display = 'none';
			setIsChiffre(false);
		} else {
			if (!regexChiffre.test(e.target.value)) {
				document.querySelector('.passwordErrorNb').style.display =
					'flex';
				setIsChiffre(false);
			} else {
				document.querySelector('.passwordErrorNb').style.display =
					'none';
				setIsChiffre(true);
			}
		}

		//passwordErrorSpace
		if (e.target.value === '') {
			document.querySelector('.passwordErrorSpace').style.display =
				'none';
			setIsNoSpace(false);
		} else {
			if (regexNoSpace.test(e.target.value)) {
				document.querySelector('.passwordErrorSpace').style.display =
					'flex';
				setIsNoSpace(false);
			} else {
				document.querySelector('.passwordErrorSpace').style.display =
					'none';
				setIsNoSpace(true);
			}
		}
		if (
			!regexMajuscule.test(e.target.value) ||
			!regexMinuscule.test(e.target.value) ||
			!regexChiffre.test(e.target.value) ||
			!regex10Lettres.test(e.target.value) ||
			regexNoSpace.test(e.target.value) ||
			!regexCharSpe.test(e.target.value)
		) {
			setIsPassword1(false);
		} else {
			setIsPassword1(true);
			console.log('ok');
		}
	};

	const verifyRegexPassword2 = (e) => {
		setPasswordVerify(e.target.value);

		if (e.target.value !== document.querySelector('#password1').value) {
			document.querySelector('#password2').style.border = '1px solid red';
			document.querySelector('#password1').style.border =
				'1px solid black';
		} else {
			document.querySelector('#password2').style.border =
				'1px solid black';
			document.querySelector('#password2').style.border =
				'1px solid black';
		}

		if (
			!regexMajuscule.test(e.target.value) ||
			!regexMinuscule.test(e.target.value) ||
			!regexChiffre.test(e.target.value) ||
			!regex10Lettres.test(e.target.value) ||
			regexNoSpace.test(e.target.value) ||
			!regexCharSpe.test(e.target.value)
		) {
			setIsPassword2(false);
		} else {
			setIsPassword2(true);
		}
	};

	const verifyRegexPseudo = (e) => {
		if (regexPseudo.test(e.target.value)) {
			setPseudo(e.target.value);
			setIsPseudo(true);
			document.querySelector('.pseudoError').style.display = 'none';
		} else {
			setIsPseudo(false);
			if (e.target.value === '') {
				document.querySelector('.pseudoError').style.display = 'none';
			} else {
				document.querySelector('.pseudoError').style.display = 'flex';
				setIsPseudo(true);
			}
		}
	};

	const verifyVille = (e) => {
		setIsVilleValid(e.target.value);
	};
	
	const handleVisibilityPass = (e)=>{
		setIsVisible(!isVisible);
	}

	return (
		<>
			<div className="signup">
				<div className="signup_container">
					<h2>Signup</h2>
					<form
						onSubmit={(e) => {
							handleSubmit(e);
						}}
					>
						<label htmlform="email">Email</label>
						<input
							type="email"
							placeholder="email"
							className="email"
							onInput={(e) => verifyRegexEmail(e)}
						/>
						<label htmlform="pseudo">Pseudo</label>
						<input
							type="text"
							placeholder="pseudo"
							className="pseudo"
							onInput={(e) => verifyRegexPseudo(e)}
						/>
						<div className="pseudoError">2 charactères minimum</div>
						<label htmlform="password">Password</label>
						<div className="visibilityPass">
						<input
							type={isVisible ? "text" : "password"}
							placeholder="password"
							className="password"
							id="password1"
							onInput={(e) => verifyRegexPassword1(e)}
						/>
					
						<i className={isVisible ? "fa-sharp fa-solid fa-eye" : "fa-solid fa-eye-slash"} onClick={(e)=>handleVisibilityPass(e)}/>
						</div>
						{/*minimum : 10 char, 1 char spécial $@!?, 1 maj, 1 min, 1 nombre pas d'espace*/}
						<div className="passwordErrorMax">
							Minimun 10 charactères
						</div>
						<div className="passwordErrorSpe">
							1 charactère spécial minimun : $&@!?
						</div>
						<div className="passwordErrorMajus">
							Minimum 1 majuscule{' '}
						</div>
						<div className="passwordErrorMinus">
							Minimum 1 minuscule
						</div>
						<div className="passwordErrorNb">Minimum 1 chiffre</div>
						<div className="passwordErrorSpace">Pas d'espace</div>

						<label htmlform="confirm_password">
							Confirm password
						</label>
						<div className="visibilityPass">
						<input
							type={isVisible ? "text" : "password"}
							placeholder="password"
							className="password"
							id="password2"
							onInput={(e) => verifyRegexPassword2(e)}
						/>
						<i className={isVisible ? "fa-sharp fa-solid fa-eye" : "fa-solid fa-eye-slash"} onClick={(e)=>handleVisibilityPass(e)}/>
						</div>
						<label htmlform="question">Secret question</label>
						<input
							type="text"
							placeholder="prénom soeur erwin ? "
							className="secretQuestion"
							onInput={(e) => verifyVille(e)}
						/>
						<div className="msgError"></div>

						<button type="submit">souscrire</button>
					</form>
					<div
						className="switch_login"
						onClick={() => props.changeisNotSubscribe(false)}
					>
						Se connecter directement
					</div>
				</div>
			</div>
		</>
	);
};
export default Signup;
