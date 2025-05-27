const crypto = require('crypto');

// Generate a random 32-byte secret key and encode it in hexadecimal
const secretKey = crypto.randomBytes(32).toString('hex');

console.log('Generated Secret Key:', secretKey);