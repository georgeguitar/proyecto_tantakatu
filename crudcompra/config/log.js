var winston=require('winston');
var logger = new winston.Logger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: './src/log/logs.log' })
    ]
  });
module.exports=logger;

    © 2018 GitHub, Inc.
    Terms
    Privacy
