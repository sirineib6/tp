import React, { useState } from 'react';
import Formulaire from './components/Formulaire'; // Assurez-vous d'importer Formulaire
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(true);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="App">
      {showPopup && (
        <div className="popup">
          <p>
            Hello ! Cette page a pour but de commencer à réfléchir à la répartition des lits pour Noël ! Si t'as la moindre question, hésite pas à nous écrire sur Messenger ou par email ! :)
          </p>
          <button onClick={closePopup}>Fermer</button>
        </div>
      )}
      <Formulaire />
    </div>
  );
}

export default App;
