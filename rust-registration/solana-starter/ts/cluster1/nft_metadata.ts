import wallet from "../../../wallets/dev-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));


(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        
        const image = "https://devnet.irys.xyz/75ABWafGk8DCC1Z8BDhhAnLfsuYLr2NNfQVi6eKAj6iy";
        
        const metadata = {      
                name: "Claudio-Rug",
                symbol: "CR",
                description: "Claudio's awesome rug",
                image,
                attributes:[
                    {trait_type: 'style', value: 'random rug'}
                ],
                properties:{
                    files:[
                        {
                            type: "image/png",
                            uri: image
                        },
                    ]
                },
               creators: [
                {
                    address: "9iG9dJ3n3VZHNstGg3eD4SfEfewNZshx6SavrLYy53sb",
                    share: 100
                }
               ]
            };
        const myUri = await umi.uploader.uploadJson(metadata);
        // console.log("Your metadata URI: ", myUri);
        console.log("Your image URI: ", myUri.replace("arweave.net", "devnet.irys.xyz"));
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
