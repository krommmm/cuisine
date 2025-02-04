import "./styles/index.css";
import { Routes, Route } from 'react-router-dom';
import Index from './scenes/Home/Index';
import Focus from './scenes/focus/Focus';
import Profil from './scenes/Profil/IndexProfil';
import Header from './components/Header';
import Footer from './components/Footer';
import AddRecipes from "./scenes/Home/recipes/AddRecipes";
import ResetPassword from "./components/ResetPassword";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Index />} />
				<Route path="/RecipeFocus/:id" element={<Focus />} />
				<Route path="/Profil" element={<Profil />} />
				<Route path="Add-recipes" element={<AddRecipes/>} />
				<Route path="/reset-password/:id" element={<ResetPassword/>}/>
			</Routes>
			<Footer />
		</>
	);
}

export default App;
