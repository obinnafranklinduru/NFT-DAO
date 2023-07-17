# BinnaDevsDAO Decentralised Application

The BinnaDevsDAO smart contract facilitates the governance and decision-making process for the BinnaDevs community. It allows BinnaDevsNFT holders to create and vote on proposals to purchase NFTs from the FakeNFTMarketplace. The contract keeps track of proposal details, voting statuses, and executes proposals based on the voting results.

## Smart Contract - BinnaDevsDAO

The BinnaDevsDAO contract includes the following key features:

- Proposal creation: BinnaDevsNFT holders can create proposals to purchase NFTs from the FakeNFTMarketplace.
- Voting mechanism: BinnaDevsNFT holders can cast their votes (YAY or NAY) on active proposals.
- Execution of proposals: After a proposal's deadline has been exceeded, any BinnaDevsNFT holder can execute the proposal if it has received more YAY votes than NAY votes.
- NFT marketplace integration: The contract interacts with the FakeNFTMarketplace contract to check availability and purchase NFTs.

## Smart Contract - FakeNFTMarketplace

The FakeNFTMarketplace smart contract simulates a marketplace for selling fake NFTs. It includes functionality to purchase NFTs with Ether and check the availability and price of NFTs.

- [View the contract](https://goerli.etherscan.io/address/0x75d2E690dFee1D78D93dcbd53412e7D93b61A436)

- [Website](https://nft-dao-beta.vercel.app/)

## Frontend - Next.js

The frontend of the BinnaDevsDAO project is built with Next.js, a React framework for server-side rendering and building web applications. The frontend provides a user-friendly interface for interacting with the BinnaDevsDAO smart contract.

## Technologies Used

The code in this repository utilizes the following technologies:

- Solidity: The programming language used for writing smart contracts.
- Next.js: A React framework for server-side rendering and building web applications.

## How to Use

1. Deploy the BinnaDevsDAO contract and provide the addresses of the FakeNFTMarketplace and BinnaDevsNFT contracts during deployment.
2. Start the Next.js development server to run the frontend.
3. Access the application through your web browser to interact with the BinnaDevsDAO contract.
4. Connect a compatible web3-enabled wallet (e.g., MetaMask) to interact with the BinnaDevsDAO contract.

## Contributions

Contributions to this project are welcome! If you find any issues or have suggestions for improvement, please feel free to create a pull request or submit an issue on the project's repository.

## License

The code in this repository is licensed under the MIT License.
