// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const nftContractJSON = require("../artifacts/contracts/heroes.sol/Heroes.json");

const nftAddress = ""; // place your mumbai contract address here
const nftABI = nftContractJSON.abi;
const walletAddress = "0x7B8B1d23a5BE13aE858e62c2ef5f9263665b89aD"; // place your public address for your wallet here

async function main() {

    const nft = await hre.ethers.getContractAt(nftABI, nftAddress);

    console.log("You now have: " + await nft.balanceOf(walletAddress) + " NFTs");
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });