import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';
import './CompteForm.css';

function CompteForm() {
  // Initialisation de l'état pour stocker les données du formulaire
  const [compte, setCompte] = useState({
    solde: '',
    dateCreation: '',
    type: ''
  });

  // Gestion des changements dans les champs du formulaire
  const handleChange = (event) => {
    setCompte({ ...compte, [event.target.name]: event.target.value });
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    // Affichage des données envoyées pour vérifier leur contenu (pour débogage)
    console.log("Données envoyées :", compte);

    // Envoi des données vers le backend
    axios.post(`${API_BASE_URL}/comptes`, compte)
      .then((response) => {
        alert("Compte ajouté avec succès !"); // Message de confirmation
        setCompte({ solde: '', dateCreation: '', type: '' }); // Réinitialisation des champs
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du compte :", error);
        alert("Une erreur s'est produite lors de l'ajout.");
      });
  };

  return (
    <div className="container mt-4">
      <h2>Ajouter un Compte</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="solde">Solde</label>
          <input
            type="number"
            name="solde"
            value={compte.solde}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dateCreation">Date de Création</label>
          <input
            type="date"
            name="dateCreation"
            value={compte.dateCreation}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type">Type</label>
          <select
            name="type"
            value={compte.type}
            className="form-select"
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              -- Sélectionnez un type --
            </option>
            <option value="COURANT">Courant</option>
            <option value="EPARGNE">Épargne</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default CompteForm;