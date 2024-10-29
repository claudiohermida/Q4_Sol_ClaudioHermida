import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../../../wallets/dev-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("GapMxXunz9ckfnzS8HE1jXWzN9f5xFoNjXK17KCxq4GC");

// Recipient address
const to = new PublicKey("BhDhXcHcmBDCKtDcEywBNey2Sk1hr7yjLLKxNoRa7amx");

const token_decimals = 1_000_000n;

// (async () => {
//     try {
//         // Get the token account of the fromWallet address, and if it does not exist, create it

//         // Get the token account of the toWallet address, and if it does not exist, create it

//         // Transfer the new token to the "toTokenAccount" we just created
//         const txId = await transfer{

//         }
  
  
//     } catch(e) {
//         console.error(`Oops, something went wrong: ${e}`)
//     }
// })();

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        let ataFromWallet = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey
        );
        // Get the token account of the toWallet address, and if it does not exist, create it
        let ataToWallet = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            to
        );
        // Transfer the new token to the "toTokenAccount" we just created
        let txSignature = await transfer(
            connection,
            keypair,
            ataFromWallet.address,
            ataToWallet.address,
            keypair,
            token_decimals
        );
  
        console.log(`Success! Check out your TX here:
            https://explorer.solana.com/tx/${txSignature}?cluster=devnet`)
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();