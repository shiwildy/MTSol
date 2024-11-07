const { Keypair } = require('@solana/web3.js');

// Generate new wallet
const keypair = Keypair.generate();
const pubkey = keypair.publicKey.toString();
const privkey = Buffer.from(keypair.secretKey).toString('hex');

console.log("Berikut wallet yang telah digenerate");
console.log("------------------------------------------");
console.log(`Public Key   : ${pubkey}`);
console.log(`Private Key  : ${privkey}`);
console.log("------------------------------------------");