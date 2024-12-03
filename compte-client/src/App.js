import React from 'react';
import CompteList from './components/CompteList';
import CompteForm from './components/CompteForm';

function App() {
  return (
    <div>
      {/* Affiche le composant pour ajouter un nouveau compte */}
      <CompteForm />
      {/* Affiche la liste des comptes existants */}
      <CompteList />
    </div>
  );
}

export default App;