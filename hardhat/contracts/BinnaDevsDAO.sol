// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/IBinnaDevsNFT.sol";
import "../interfaces/IFakeNFTMarketplace.sol";

contract BinnaDevsDAO is Ownable {
    IFakeNFTMarketplace nftMarketplace;
    IBinnaDevsNFT binnaDevsNFT;

    /**
     * Create a payable constructor which initializes the contract
     * instances for FakeNFTMarketplace and CryptoDevsNFT
     * The payable allows this constructor to accept an ETH deposit when it is being deployed
     */
    constructor(address _nftMarketplace, address _binnaDevsNFT) payable {
        nftMarketplace = IFakeNFTMarketplace(_nftMarketplace);
        binnaDevsNFT = IBinnaDevsNFT(_binnaDevsNFT);
    }

     // Function to receive Ether. msg.data must be empty
    receive() external payable {}
    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}