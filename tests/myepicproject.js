const anchor = require("@project-serum/anchor");

const { SystemProgram } = anchor.web3;

const main = async () => {
  console.log("🚀 Starting test...");

  //const provider = anchor.Provider.env();
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Myepicproject;

  // create an account keypair for our program to use.
  const baseAccount = anchor.web3.Keypair.generate();

  // call start_stuff_off, pass it the params it needs!
  const tx = await program.rpc.startStuffOff({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount],
  });

  console.log("Your transaction signature", tx);

  // fetch data from the account
  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("👀 GIF Count", account.totalGifs.toString());

  // call add_gif
  await program.rpc.addGif(
    "https://media.giphy.com/media/FUi94opKPNopjUmQvR/giphy.gif",
    {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      },
    }
  );

  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("👀 GIF Count ", account.totalGifs.toString());

  console.log("👀 GIF Count ", account.gifList);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

runMain();
