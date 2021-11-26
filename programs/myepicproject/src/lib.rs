use anchor_lang::prelude::*;

declare_id!("7YsY7NnkANmSDLLF1ae4f8zTRxWaLpARa3jGiGFapHPr");

#[program]
pub mod myepicproject {
    use super::*;
    pub fn start_stuff_off(ctx: Context<StartStuffOff>) -> ProgramResult {
        // get a reference to the account.
        let base_account = &mut ctx.accounts.base_account;
        base_account.total_gifs = 0;
        Ok(())
    }

    pub fn add_gif(ctx: Context<AddGif>) -> ProgramResult {
        // get a reference to the account and increment total_gifs.
        //let base_account = &mut ctx.accounts.base_account;
        //base_account.total_gifs += 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct StartStuffOff<'info> {
    #[account(init, payer = user, space = 9000)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program <'info, System>,

}

// Specify what data you want in the AddGif context.
//#[derive(Accounts)]
//pub struct AddGif<'info> {
//    #[account(mut)]
//    pub base_account: Account <'info, BaseAccount>,
//}
#[derive(Accounts)]
pub struct AddGif<'info> {
  #[account(mut)]
  pub base_account: Account<'info, BaseAccount>,
}


// tell solana what we want to store on this account
#[account]
pub struct BaseAccount {
    pub total_gifs: u64,
}