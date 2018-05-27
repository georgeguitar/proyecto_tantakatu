const mysql = require('mysql');

module.exports = () => {
  return mysql.createConnection({
    host: 'y5s2h87f6ur56vae.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'j68byzqwf358bsai',
    password: 'i98qp92r6vdete3x',
    database: 'hm2zt6g2m0gkaepr'
   
     /* host: 'ocvwlym0zv3tcn68.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      user: 'mfh5oxm25hprrpon',
      password: 'etk70aoilrc5y8nz',
      database: 'g3gcrh40646vhxdn'*/
  });
}

    © 2018 GitHub, Inc.
    Terms
    Privac