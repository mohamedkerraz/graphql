import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './NavBar.css';  // Importez votre fichier CSS

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className='navbar'>
      <ul className='ul-nav'>
        <li><Link to="/">Accueil</Link></li>
        {!isAuthenticated && <li><Link to="/login">Connexion</Link></li>}
        {!isAuthenticated && <li><Link to="/signup">Inscription</Link></li>}
        {isAuthenticated && <li><Link to="/articles">Articles</Link></li>}
        {isAuthenticated && <li><button onClick={logout}>Logout</button></li>}
      </ul>
    </nav>
  );
};

export default NavBar;
