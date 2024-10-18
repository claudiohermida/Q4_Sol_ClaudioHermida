// Import the Keypair class from the Solana web3.js library
import { Keypair } from "@solana/web3.js";

// Generate a new Solana keypair
let kp = Keypair.generate();

// Log the generated public key in Base58 format
console.log(`You've generated a new Solana wallet:`);
console.log(`Public Key: ${kp.publicKey.toBase58()}`);

// Convert the secret key (which is a Uint8Array) to a comma-separated string and log it
console.log(`Secret Key: [${Array.from(kp.secretKey).join(', ')}]`);