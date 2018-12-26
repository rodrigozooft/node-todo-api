const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

// bcrypt.genSalt(10, (err, salt) =>{
//   bcrypt.hash(password, salt, (err, hash) =>{
//     console.log('Hash and Salt : ', hash);
//   });
// });

var hashedPassword = '$2a$10$TpT8sSHPd3YeMoh0.VzfgOl85HR7dO7hwLDr9iqvoPbBCLgZ.ZdNO';

bcrypt.compare(password, hashedPassword, (err, res) =>{
  console.log(res);
});

var data = {
  id: 10
};

var token = jwt.sign(data, 'MonumentoDelTercerTipo2018$');
console.log(token);
var decoded = jwt.verify(token, 'MonumentoDelTercerTipo2018$');
console.log('Decoded: ', decoded);

// var message = 'Im user number 3'
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//   id: 4
// };

// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'SomeSecretKey').toString()
// };

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'SomeSecretKey').toString();

// if (resultHash === token.hash){
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed. Do not trust');
// }