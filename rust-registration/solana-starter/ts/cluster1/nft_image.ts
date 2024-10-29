import wallet from "../../../wallets/dev-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFile } from "fs/promises"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

// // Monkey patch the Connection prototype
// Connection.prototype.getRecentBlockhash = async function (commitment) {
//   try {
//     const { blockhash, lastValidBlockHeight } = await this.getLatestBlockhash(
//       commitment
//     );
//     const recentPrioritizationFees = await this.getRecentPrioritizationFees();
//     const averageFee =
//       recentPrioritizationFees.length > 0
//         ? recentPrioritizationFees.reduce(
//             (sum, fee) => sum + fee.prioritizationFee,
//             0
//           ) / recentPrioritizationFees.length
//         : 5000;

//     return {
//       blockhash,
//       feeCalculator: {
//         lamportsPerSignature: averageFee,
//       },
//     };
//   } catch (e) {
//     throw new Error("failed to get recent blockhash: " + e);
//   }
// };

(async () => {
    try {
        //1. Load image
        //2. Convert image to generic file.
        //3. Upload image

        
        // const image = ???
        const image = await readFile('/Users/claudiohermida/WORKSPACES/Solana/Turbin3-WBA/solana-starter/NFT-Pictures/generug.png');
        const genericFile = await createGenericFile(image,'NFT-Claudio-Rug',{contentType: 'image/png'});
        
        // const [myUri] = ??? 
        const [myUri] = await umi.uploader.upload([genericFile]);
        // console.log("Your image URI: ", myUri);
         console.log("Your image URI: ", myUri.replace("arweave.net", "devnet.irys.xyz"));
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
