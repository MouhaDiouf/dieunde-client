import React from 'react';
import { Link } from 'react-router-dom';
function NotFound() {
  return (
    <div>
      <h1>Page not found</h1>
      <p>
        The page you are trying to access doesn't exist or is restricted. Login
        to your account and try again.
      </p>
      <p>
        <Link to="/">Go Back</Link>
      </p>
    </div>
  );
}

export default NotFound;
