pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("vPoJ2QKwJFB5Uby9FrbpCq6y6CzDZyknmZyE98GASYk");

#[program]
pub mod anchor_marketplace {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>, name: String, fee: u16) -> Result<()> {
        _ctx.accounts.init(name, fee, &_ctx.bumps)
    }

    pub fn list(_ctx: Context<List>, price: u64) -> Result<()> {
        _ctx.accounts.create_listing(price, &_ctx.bumps)
    }

    pub fn purchase(_ctx: Context<Purchase>) -> Result<()> {
        _ctx.accounts.send_sol()?;
        _ctx.accounts.send_nft()?;
        _ctx.accounts.send_rewards()?;
        _ctx.accounts.close_mint_vault()
    }

    pub fn delist(_ctx: Context<Delist>) -> Result<()> {
        _ctx.accounts.withdraw_nft()?;
        _ctx.accounts.close_mint_vault()
    }
}
