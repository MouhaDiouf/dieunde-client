import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
function AdminPanel() {
  return (
    <div>
      <h1>Admin Panel</h1>
      <Button component={Link} to="/admin/allusers">
        All Users
      </Button>
      <Button component={Link} to="/admin/allproducts">
        All Products
      </Button>
    </div>
  );
}

export default AdminPanel;
