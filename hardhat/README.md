# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

- The FakeNFTMarketplace exposes some basic functions that we will be using from the DAO contract to purchase NFTs if a proposal is passed. A real NFT marketplace would be more complicated - as not all NFTs have the same price.