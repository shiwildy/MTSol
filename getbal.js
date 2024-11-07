const { Connection, PublicKey } = require('@solana/web3.js');

// Menggunakan devnet network
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const publicKeyStr = "pubkey";

// Konversi pubkeystring jadi object publickey
const publicKey = new PublicKey(publicKeyStr);

connection.getBalance(publicKey).then((balance) => {
    // Konversi balance dari lamport 1 SOL = 1e9 Lamports
    const balanceInSol = balance / 1e9;
    console.log(`Address : ${publicKeyStr}`);
    console.log(`Balance : ${balanceInSol} SOL`);

}).catch((njirerror) => {
    console.error(`Terjadi kesalahan`, njirerror)
});