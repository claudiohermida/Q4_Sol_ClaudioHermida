import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import wallet from "../../../wallets/dev-wallet.json"
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const mint = generateSigner(umi);

(async () => {
    // let tx = ???
    let tx = await createNft(umi, {
                             mint,
                            name: 'Claudio Rug',
                            symbol: 'CR',
                            uri: "https://devnet.irys.xyz/8SNzCMph3QQLfAYkh46EQgEagegH8LQyRYHcLcKSd7UB",
                            sellerFeeBasisPoints: percentAmount(5.5),
                    });
    // let result = await tx.sendAndConfirm(umi);
    let result = await tx.sendAndConfirm(umi);
    // const signature = base58.encode(result.signature);
    const signature = base58.encode(result.signature);
    // console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)
    console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)

    console.log("Mint Address: ", mint.publicKey);
})();