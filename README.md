# NFT-DAO
Build an on-chain DAO / proposal execution for NFT holders

- Anyone with a BinnaDevs NFT can create a proposal to purchase a different NFT from an NFT marketplace.
- Everyone with a BinnaDev NFT can vote for or against the active proposals.
- Each NFT counts as one vote for each proposal.
- A voter cannot vote multiple times on the same proposal with the same NFT.
- If a majority of voters vote in favor of the proposal by the deadline, the NFT purchase is automatic.
- To be able to purchase NFTs automatically when a proposal is passed, you need an on-chain NFT marketplace that you can call a purchase() function on. There are a lot of NFT marketplaces out there, but to avoid overcomplicating things, we will create a simplified fake NFT marketplace for this project as the focus is on the DAO.
- There is a website to allow users to create and vote on proposals.

Contract Address: 0x75d2E690dFee1D78D93dcbd53412e7D93b61A436

[View the contract](https://goerli.etherscan.io/address/0x75d2E690dFee1D78D93dcbd53412e7D93b61A436)

[Website](https://nft-dao-beta.vercel.app/)

[Source code](https://github.com/obinnafranklinduru/NFT-DAO)