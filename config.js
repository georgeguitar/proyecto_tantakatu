module.exports = {
  port: process.env.PORT || 3001,
  SECRET_TOKEN: 'miclavedetokens',
  
//JawsDB: mysql
//  db: {
//    host: 'y5s2h87f6ur56vae.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//    user: 'j68byzqwf358bsai',
//    password: 'i98qp92r6vdete3x',
//    database: 'hm2zt6g2m0gkaepr'    
// }
  
//Maria DB: maria
//db: {
//host: 'c9cujduvu830eexs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//user: 'i0l5aooujiq9m2qf',
//password: 'jni80ltt763w13oa',
//database: 'f6xrltohq6ji1ouq'    
//}  

// sucreciudadblanca.com: Mysql
//db: {
//    host: 'sucreciudadblanca.com',
//    user: 'sucre_numa',
//    password: 'tantakatu2018',
//    database: 'sucre_pvv',
//    port: 3306
// }

  db: process.env.JAWSDB_MARIA_URL || process.env.JAWSDB_URL

}