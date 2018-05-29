module.exports = {
  port: process.env.PORT || 3001,
  SECRET_TOKEN: 'miclavedetokens',
//  db: {
//    host: 'y5s2h87f6ur56vae.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//    user: 'j68byzqwf358bsai',
//    password: 'i98qp92r6vdete3x',
//    database: 'hm2zt6g2m0gkaepr'    
// }

db: {
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'api_rest'    
 }
}