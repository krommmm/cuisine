import logo from '../images/logo.jpg';
import { NavLink } from 'react-router-dom';

const Header = () => {


	

	return (
		<>
			<header>
				<p class="logoPolice">Cuisine famille</p>
				<div class="center_header">
				<NavLink
					to="/"
					className={({ isActive }) =>
						isActive ? 'activeLink' : undefined
					}
				>
					Recettes
				</NavLink>
				<NavLink
					to="/Profil"
					className={({ isActive }) =>
						isActive ? 'activeLink' : undefined
					}
				>
				Compte
				</NavLink>
				</div>
			</header>
		</>
	);
};

export default Header;
