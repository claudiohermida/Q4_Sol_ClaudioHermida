import wallet from "../../../wallets/dev-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { 
    createMetadataAccountV3, 
    CreateMetadataAccountV3InstructionAccounts, 
    CreateMetadataAccountV3InstructionArgs,
    DataV2Args
} from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
// mport { base58 } from "@metaplex-foundation/umi/serializers";

// Define our Mint address
// const mint = publicKey("<mint address>")
const mint = publicKey("GapMxXunz9ckfnzS8HE1jXWzN9f5xFoNjXK17KCxq4GC");

// Create a UMI connection
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
    try {
        // Start here
        // let accounts: CreateMetadataAccountV3InstructionAccounts = {
        //     ???
        // }
        let accounts: CreateMetadataAccountV3InstructionAccounts = {
            mint: mint,
            mintAuthority: signer
        }

        // let data: DataV2Args = {
        //     ???
        // }
        let data: DataV2Args = {
            name: "WBA Token - Claudio H",
            symbol: "WBA",
            uri: "",
            sellerFeeBasisPoints: 0,
            creators: null,
            collection: null,
            uses: null,
        }

        // let args: CreateMetadataAccountV3InstructionArgs = {
        //     ???
        // }
        let args: CreateMetadataAccountV3InstructionArgs = {
            data: data,
            isMutable: true,
            collectionDetails: null,
        }

        // let tx = createMetadataAccountV3(
        //     umi,
        //     {
        //         ...accounts,
        //         ...args
        //     }
        // )
        let tx = createMetadataAccountV3(
            umi,
            {
                ...accounts,
                ...args
            }
        )




        // let result = await tx.sendAndConfirm(umi);
        // console.log(bs58.encode(result.signature));
        let result = await tx.sendAndConfirm(umi);
        console.log(bs58.encode(result.signature));
        // A Better way to deserialize
        // console.log(base58.deserialize(result.signature));
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();
