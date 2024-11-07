const {
    Connection,
    Keypair,
    PublicKey,
    SystemProgram,
    Transaction
} = require('@solana/web3.js');
const fs = require('fs');

// Menggunakan devnet network
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// Di sini karna private key masih dalam string jadi perlu di konversi dulu
const privkeystr = 'privkey';
const privkey = Uint8Array.from(Buffer.from(privkeystr, 'hex')); // Konversi dari string menjadi Uint8Array
const keypair = Keypair.fromSecretKey(privkey);

// Public key penerima
const penerima = new PublicKey("penerima");

// Karna dalam Solana dia pakai Lamports jadi perlu di kali 1e9
const jumlahtf = 3 * 1e9;

connection.getLatestBlockhash().then(({ blockhash }) => {
    console.log("Latest Blockhash fetched:", blockhash);

    // Buat requests transaksi baru
    const transaction = new Transaction({
        recentBlockhash: blockhash,
        feePayer: keypair.publicKey,
    });

    // Tambahkan informasi transaksi ke dalam transaction
    transaction.add(
        SystemProgram.transfer({
            fromPubkey: keypair.publicKey,
            toPubkey: penerima,
            lamports: jumlahtf,
        })
    );

    console.log("Permintaan transaksi telah dibuat.")
    console.log("Transaksi telah dikirimkan ke network solana.")

    // Lakukan sign dan kirim transaksi
    connection.sendTransaction(transaction, [keypair]).then((signature) => {
        console.log("Transaksi berhasil, berikut signature transaskinya:", signature);
        console.log(`Hasil transaksi: https://explorer.solana.com/tx/${signature}?cluster=devnet`)

        // Konfirmasi transaksi
        connection.confirmTransaction(signature).then(() => {
            console.log("Transaksi telah terkonfirmasi.");
        }).catch((error) => {
            console.error("Tidak dapat konfirmasi transaksi:", error);
        });
    }).catch((error) => {
        console.error("Terjadi kesalahan saat mengirim solana:", error);
    });

}).catch((error) => {
    console.error("Tidak dapat mendapatkan blockhash terbaru:", error);
});
