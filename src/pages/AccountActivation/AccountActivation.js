import React from 'react';

function AccountActivation() {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const confirmation = params.get('account_confirmation_success');

  if (!confirmation) {
    return 'Account not activated';
  }
  return <div>Account activated successfully</div>;
}

export default AccountActivation;
