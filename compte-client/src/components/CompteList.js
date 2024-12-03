import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';
import './CompteList.css';

function CompteList() {
  const [comptes, setComptes] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // État pour gérer le mode édition
  const [compteToEdit, setCompteToEdit] = useState({
    id: '',
    solde: '',
    dateCreation: '',
    type: ''
  });

  // Effet secondaire pour récupérer les comptes depuis l'API
  useEffect(() => {
    axios.get(`${API_BASE_URL}/comptes`)
      .then((response) => setComptes(response.data))
      .catch((error) => console.error("Erreur lors de la récupération des comptes :", error));
  }, []);

  // Gérer les changements dans le formulaire
  const handleChange = (event) => {
    setCompteToEdit({ ...compteToEdit, [event.target.name]: event.target.value });
  };

  // Gérer la soumission du formulaire de modification
  const handleSubmit = (event) => {
    event.preventDefault();
   axios.put(`${API_BASE_URL}/comptes/${compteToEdit.id}`, compteToEdit)
      .then(() => {
        alert("Compte modifié avec succès !");
        setIsEditing(false);  // Retour à l'affichage de la liste
        setCompteToEdit({ id: '', solde: '', dateCreation: '', type: '' }); // Réinitialiser les données du formulaire
        fetchComptes(); // Rafraîchir la liste des comptes
      })
      .catch((error) => {
        console.error("Erreur lors de la modification du compte", error);
        alert("Erreur lors de la modification du compte.");
      });
  };

  // Fonction pour afficher le formulaire de modification
  const startEditing = (compte) => {
    setCompteToEdit(compte);
    setIsEditing(true);  // Passer en mode édition
  };

  // Fonction pour annuler l'édition
  const cancelEditing = () => {
    setIsEditing(false);  // Revenir à l'affichage de la liste
    setCompteToEdit({ id: '', solde: '', dateCreation: '', type: '' }); // Réinitialiser les données
  };

  // Fonction pour récupérer les comptes (au cas où on voudrait rafraîchir la liste après une modification)
  const fetchComptes = () => {
    axios.get(`${API_BASE_URL}/comptes`)
      .then((response) => setComptes(response.data))
      .catch((error) => console.error("Erreur lors de la récupération des comptes :", error));
  };

  // Fonction pour supprimer un compte
  const handleDelete = (compteId) => {
    axios.delete(`${API_BASE_URL}/comptes/${compteId}`)
      .then(() => {
        alert("Compte supprimé avec succès !");
        fetchComptes(); // Rafraîchir la liste des comptes après suppression
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du compte", error);
        alert("Erreur lors de la suppression du compte.");
      });
  };

  return (
    <div className="container mt-4">
      <h2>Liste des Comptes</h2>

      {/* Formulaire de modification */}
      {isEditing ? (
        <div>
          <h3>Modifier le Compte</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="solde">Solde</label>
              <input
                type="number"
                name="solde"
                value={compteToEdit.solde}
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
                value={compteToEdit.dateCreation}
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="type">Type</label>
              <select
                name="type"
                value={compteToEdit.type}
                className="form-select"
                onChange={handleChange}
                required
              >
                <option value="COURANT">Courant</option>
                <option value="EPARGNE">Épargne</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary me-2">
              Modifier
            </button>
            <button type="button" className="btn btn-secondary" onClick={cancelEditing}>
              Annuler
            </button>
          </form>
        </div>
      ) : (
        // Affichage de la liste des comptes
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Solde</th>
              <th>Date de Création</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {comptes.map((compte) => (
              <tr key={compte.id}>
                <td>{compte.id}</td>
                <td>{compte.solde}</td>
                <td>{compte.dateCreation}</td>
                <td>{compte.type}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => startEditing(compte)}
                  >
                    Modifier
                  </button>
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => handleDelete(compte.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CompteList;