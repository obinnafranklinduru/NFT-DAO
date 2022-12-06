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

 The FakeNFTMarketplace exposes some basic functions that we will be using from the DAO contract to purchase NFTs if a proposal is passed. A real NFT marketplace would be more complicated - as not all NFTs have the same price.

### The functionality we need in the DAO contract

- Store created proposals in the contract state
- Allow holders of the BinnaDev NFT to create new proposals.
- Allow holders of the BinnaDev NFT to vote on proposals, given that they haven't already voted and that the proposal hasn't passed its deadline yet.
- Allow BinnaDev NFT holders to execute a proposal after its deadline has passed, triggering an NFT purchase if it does not.

Fake NFT Marketplace Contract Address => 0x437889D00F14055F5de7b8F2f447179B9ceF1E97

BinnaDevs DAO Contract Address => 0x75d2E690dFee1D78D93dcbd53412e7D93b61A436