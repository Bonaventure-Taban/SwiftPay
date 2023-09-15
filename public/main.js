document.addEventListener('DOMContentLoaded', function() {
  const signInButton = document.getElementById('signInButton');

  signInButton.addEventListener('click', function() {
      if (typeof window.ethereum !== 'undefined') {
          // Metamask is installed
          window.ethereum.request({ method: 'eth_requestAccounts' })
              .then(function(accounts) {
                  const accountInfo = accounts[0];
                  redirectToDashboard(accountInfo);
              })
              .catch(function(error) {
                  console.error(error);
              });
      } else {
          // Metamask is not installed, redirect to account creation website
          window.location.href = 'https://metamask.io/';
      }
  });

  function redirectToDashboard(accountInfo) {
      const dashboardUrl = `dashboard.html?accountInfo=${accountInfo}`;
      window.location.href = dashboardUrl;
  }
});
