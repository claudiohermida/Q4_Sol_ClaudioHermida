import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorVaultQ424 } from "../target/types/anchor_vault_q424";

describe("anchor_vault_q4_24", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.AnchorVaultQ424 as Program<AnchorVaultQ424>;

  const vaultState = anchor.web3.PublicKey.findProgramAddressSync([Buffer.from("state"), provider.publicKey.toBytes()], program.programId)[0];
  const vault = anchor.web3.PublicKey.findProgramAddressSync([Buffer.from("vault"), vaultState.toBytes()], program.programId)[0];

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods
    .initialize()
    .accountsPartial({
      user: provider.wallet.publicKey,
      state: vaultState,
      vault,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc();

    console.log("\nYour transaction signature", tx);
    console.log("Your vault info", (await provider.connection.getAccountInfo(vault)));
    // check that vaultState gets created
    console.log("Your state info", (await provider.connection.getAccountInfo(vaultState)));
  });

  it("Deposit 0.2 SOL", async () => {
    const tx = await program.methods
    .deposit(new anchor.BN(0.2 * anchor.web3.LAMPORTS_PER_SOL))
    .accountsPartial({
      user: provider.wallet.publicKey,
      state: vaultState,
      vault,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc();

    console.log("\nYour transaction signature", tx);
    console.log("Your vault info", (await provider.connection.getAccountInfo(vault)));
    console.log("Your vault balance", (await provider.connection.getBalance(vault)).toString());
  });

  it("Withdraw 0.1 SOL", async () => {
    const tx = await program.methods
    .withdraw(new anchor.BN(0.1 * anchor.web3.LAMPORTS_PER_SOL))
    .accountsPartial({
      user: provider.wallet.publicKey,
      state: vaultState,
      vault,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc();

    console.log("\nYour transaction signature", tx);
    console.log("Your vault balance", (await provider.connection.getBalance(vault)).toString());
  });

});