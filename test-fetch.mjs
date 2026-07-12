fetch('http://localhost:3000/api/auth/session')
  .then(res => console.log(res.status))
  .catch(err => console.error(err));
