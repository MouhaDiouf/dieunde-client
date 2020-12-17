import React, { useState } from 'react';

function Produit() {
  const [loading, setLoading] = useState(true);
  if (loading) {
    return 'Chargement produits...';
  }

  return <div>Tous les produits</div>;
}

export default Produit;
