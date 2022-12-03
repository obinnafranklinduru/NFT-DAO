const { ethers } = require("hardhat");
const { NFT_CONTRACT_ADDRESS } = require("../constants/");

async function main() {

  const FakeNFTMarketplaceContract = await ethers.getContractFactory("FakeNFTMarketplace");

  const deployFakeNFTMarketplaceContract = await FakeNFTMarketplaceContract.deploy();

  await deployFakeNFTMarketplaceContract.deployed();

  const BinnaDevsDAOContract = await ethers.getContractFactory("BinnaDevsDAO");

  const deployBinnaDevsDAOContract = await BinnaDevsDAOContract(
    deployFakeNFTMarketplaceContract.address,
    NFT_CONTRACT_ADDRESS,
    {value: ethers.utils.parseEther("1")}
  );

  await deployBinnaDevsDAOContract.deployed();

   console.log(`FakeNFTMarketplaceContract => ${deployBinnaDevsDAOContract.address}`);
  console.log(`FakeNFTMarketplaceContract => ${deployFakeNFTMarketplaceContract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
