const { ethers } = require("hardhat");
const {  } = require("../constants/");

async function main() {
  

  console.log(`BinnaDevs Contract Address => ${}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
