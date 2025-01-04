import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/AccountCreation.css';

const AccountCreation = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    confirmEmail: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Nettoyer l'erreur lorsque l'utilisateur commence à corriger
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = 'Les adresses email ne correspondent pas';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }

    if (!formData.phone.match(/^[0-9]{10}$/)) {
      newErrors.phone = 'Le numéro de téléphone doit contenir 10 chiffres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Formulaire soumis:', formData);
      // Ajouter ici la logique de soumission du formulaire
    }
  };

  return (
    <div className="account-creation-container">
      <h1 className="title">Créer un compte</h1>

      <form onSubmit={handleSubmit} className="form-container">
        {/* Nom */}
        <div className="field-pair">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Nom"
            className="input-field"
            required
          />
        </div>

        {/* Prénom */}
        <div className="field-pair">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Prénom"
            className="input-field"
            required
          />
        </div>

        {/* Téléphone */}
        <div className="field-pair">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Téléphone"
            className={`input-field ${errors.phone ? 'error-field' : ''}`}
            required
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>

        {/* Email */}
        <div className="field-pair">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`input-field ${errors.email ? 'error-field' : ''}`}
            required
          />
        </div>

        {/* Confirmation Email */}
        <div className="field-pair">
          <input
            type="email"
            name="confirmEmail"
            value={formData.confirmEmail}
            onChange={handleChange}
            placeholder="Confirmer l'email"
            className={`input-field ${errors.confirmEmail ? 'error-field' : ''}`}
            required
          />
          {errors.confirmEmail && <div className="error-message">{errors.confirmEmail}</div>}
        </div>

        {/* Adresse */}
        <div className="field-pair">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Adresse"
            className="input-field"
            required
          />
        </div>

        {/* Mot de passe */}
        <div className="field-pair">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mot de passe"
            className={`input-field ${errors.password ? 'error-field' : ''}`}
            required
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>

        {/* Confirmation Mot de passe */}
        <div className="field-pair">
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirmer le mot de passe"
            className={`input-field ${errors.confirmPassword ? 'error-field' : ''}`}
            required
          />
          {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
        </div>

        <button type="submit" className="submit-button">
          Créer le compte
        </button>
      </form>

      <div className="back-link">
        <Link to="/">Retour à la connexion</Link>
      </div>
    </div>
  );
};

export default AccountCreation;