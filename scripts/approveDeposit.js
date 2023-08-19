// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fxRootContractABI = require("../fxRootContractABI.json");
const nftContractJSON = require("../artifacts/contracts/heroes.sol/Heroes.json");

const nftAddress = "0x379c05853C1C054e5930c8879AaFc88Cbb7D4399"; // place your erc20 contract address here
const nftABI = nftContractJSON.abi;
const fxERC20RootAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de";
const walletAddress = "0x7B8B1d23a5BE13aE858e62c2ef5f9263665b89aD"; // place your public address for your wallet here

async function main() {

    const nftContract = await hre.ethers.getContractAt(nftABI, nftAddress);
    const fxContract = await hre.ethers.getContractAt(fxRootContractABI, fxERC20RootAddress);

    const approveTx = await nftContract.setApprovalForAll(fxERC20RootAddress, true);
    await approveTx.wait();

    console.log('Approval confirmed');

    for (let i = 0; i < 5; i++) {
      const depositTx = await fxContract.deposit(nftAddress, walletAddress, i, "0x6556");
      await depositTx.wait();
    }

    console.log("NFTs deposited");
  
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });