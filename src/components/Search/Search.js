import React from 'react';

function Search({
  produits,
  setsearchnom,
  setminprix,
  setmaxprix,
  setsearchcat,
}) {
  let catégories = [];
  if (produits['produits']) {
    produits = produits.produits[0];
    catégories = produits.map((produit) => {
      return produit.catégorie;
    });
    catégories = [...new Set(catégories)];
  }
  return (
    <div>
      <label htmlFor="search">Rechercher</label>
      <input
        type="search"
        name="search"
        id="search"
        onChange={(e) => setsearchnom(e.target.value)}
      />{' '}
      <br />
      <label htmlFor="filter">Categories</label>
      <select name="catégories" id="catégories">
        {catégories.map((catégorie, idx) => (
          <option name={catégorie} key={idx}>
            {catégorie}
          </option>
        ))}
      </select>
      <label htmlFor="prix">Prix</label>
      <input type="range" name="prix" id="prix" min="0" max="90000" />
    </div>
  );
}

export default Search;
