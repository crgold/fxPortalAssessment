// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fxRootContractABI = require("../fxRootContractABI.json");
const nftContractJSON = require("../artifacts/contracts/heroes.sol/Heroes.json");

const nftAddress = "0x65B393B4A5F1542f5038Ba5164522303FD8E4e73"; // place your erc20 contract address here
const nftABI = nftContractJSON.abi;
const fxERC20RootAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de";
const walletAddress = "0x7B8B1d23a5BE13aE858e62c2ef5f9263665b89aD"; // place your public address for your wallet here

async function main() {

    const tokenContract = await hre.ethers.getContractAt(nftABI, nftAddress);
    const fxContract = await hre.ethers.getContractAt(fxRootContractABI, fxERC20RootAddress);

    const approveTx = await tokenContract.approve(fxERC20RootAddress, 500);
    await approveTx.wait();

    console.log('Approval confirmed');


    const depositTx = await fxContract.deposit(nftAddress, walletAddress, 500, "0x6556");
    await depositTx.wait();

    console.log("Tokens deposited");
  
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });