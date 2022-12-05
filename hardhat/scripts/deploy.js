const { ethers } = require("hardhat");
const { NFT_CONTRACT_ADDRESS } = require("../constants/index");

async function main() {
  const fakeNFTMarketplaceContract = await ethers.getContractFactory("FakeNFTMarketplace");
  const deployFakeNFTMarketplaceContract = await fakeNFTMarketplaceContract.deploy();
  await deployFakeNFTMarketplaceContract.deployed();
  console.log("NFTMarketplaceContract address => " + deployFakeNFTMarketplaceContract.address);

  const nftContract = NFT_CONTRACT_ADDRESS;
  const binnaDevsDAOContract = await ethers.getContractFactory("BinnaDevsDAO");
  const deployBinnaDevsDAOContract = await binnaDevsDAOContract.deploy(
    deployFakeNFTMarketplaceContract.address,
    nftContract,
    {
      value: ethers.utils.parseEther("0.01")
    }
  );
  await deployBinnaDevsDAOContract.deployed();
  console.log("BinnaDevsDAOContract address => " + deployBinnaDevsDAOContract.address);
  
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
