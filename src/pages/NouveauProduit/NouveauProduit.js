import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { newProduct } from '../../actions/actions';

function NouveauProduit() {
  const dispatch = useDispatch();
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState(0);
  const [catégorie, setcatégorie] = useState('smartphones');
  const [image, setimage] = useState(null);
  const onImageChange = (e) => {
    setimage(e.target.files[0]);
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('description', description);
    formData.append('catégorie', catégorie);
    formData.append('image', image);
    formData.append('prix', prix);
    formData.append('user_id', 1);
    dispatch(newProduct(formData));
  };
  return (
    <div>
      <h2>Créer Produit</h2>
      <form onSubmit={handleCreateProduct}>
        <label htmlFor="titre">Nom du produit</label> <br />
        <input
          id="titre"
          type="text"
          onChange={(e) => {
            setNom(e.target.value);
          }}
        />{' '}
        <br />
        <label htmlFor="description">Description</label> <br />
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>{' '}
        <br />
        <label htmlFor="prix">Prix</label> <br />
        <input
          type="number"
          name="prix"
          id="prix"
          onChange={(e) => setPrix(e.target.value)}
        />{' '}
        <br />
        <input
          type="file"
          accept="image/*"
          multiple={false}
          onChange={onImageChange}
        />
        <label htmlFor="catégorie">Catégorie</label> <br />
        <select
          name="categorie"
          id="catégorie"
          onChange={(e) => setcatégorie(e.target.value)}
        >
          <option value="smartphones">smartphones</option>
          <option value="ordinateurs">ordinateurs</option>
          <option value="habillement">habillement</option>
          <option value="électroménager">électroménager</option>
          <option value="livres">livres</option>
          <option value="jouets">jouets</option>
        </select>{' '}
        <br />
        <button type="submit">Créer Produit</button>
      </form>
    </div>
  );
}

export default NouveauProduit;
