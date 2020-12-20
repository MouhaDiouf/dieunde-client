import React from 'react';
import { useParams } from 'react-router-dom';

function ProductPage() {
  const { id } = useParams();

  return <div>One Page Product for id {id}</div>;
}

export default ProductPage;
