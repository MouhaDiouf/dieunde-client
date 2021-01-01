import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchOneProduct = async () => {
      console.log('fetching one product');
      try {
        const response = await fetch(`http://localhost:3001/produits/${id}`);
        const data = await response.json();
        if (data) {
          setProduct(data);
          setLoading(false);
        } else {
          setProduct(null);
          setLoading(false);
        }
      } catch (error) {
        setProduct(null);
        setLoading(false);
      }
    };
    fetchOneProduct();
  }, [id]);

  if (loading) {
    return 'Chargement...';
  }
  if (!product) {
    return <h2>Aucun produit à afficher</h2>;
  }

  return (
    <div>
      One Page Product for id ${product.nom}
      <img src={product.image.url} alt="" />
      <h2>Par ${product.user.email}</h2>
    </div>
  );
}

export default ProductPage;
