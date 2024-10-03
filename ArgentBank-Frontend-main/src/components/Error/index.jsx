import { Link } from 'react-router-dom';

function Error() {
  return (
    <div className="errorPage">
      <h1>Erreur: 404</h1>
      <h2>Oups! La page que vous demandez n'existe pas.</h2>
      <Link to="/">Retourner sur la page d’accueil</Link>
    </div>
  );
}

export default Error;
