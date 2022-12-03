// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/IBinnaDevsNFT.sol";
import "../interfaces/IFakeNFTMarketplace.sol";

contract BinnaDevsDAO is Ownable {
    struct Proprosal {
        // nftTokenId - the tokenID of the NFT to purchase from FakeNFTMarketplace
        // if the proposal passes
        uint256 nftTokenId;
        // deadline -  Proposal can be executed after the deadline has been exceeded.
        uint256 deadline;
        // yayVotes - number of yes votes for this proposal   
        uint256 yayVotes;
        // nayVotes - number of no votes for this proposal
        uint256 nayVotes;
        // executed - whether or not this proposal has been executed yet.
        // Cannot be executed before the deadline has been exceeded.
        bool executed;
        // voters - a mapping of BinnaDevsNFT tokenIDs to booleans indicating whether 
        // that NFT has already been used to cast a vote or not
        mapping(uint256 => bool) voter;
    }

    // Create a mapping of ID to Proposal to track all of the proposals
    mapping(uint256 => Proprosal) public proprosals;

    // Number of proposals that have been created
    uint256 public numProposals;

    IFakeNFTMarketplace nftMarketplace;
    IBinnaDevsNFT binnaDevsNFT;

    /**
     * Create a payable constructor which initializes the contract
     * instances for FakeNFTMarketplace and BinnaDevsNFT
     * The payable allows this constructor to accept an ETH deposit when it is being deployed
     */
    constructor(address _nftMarketplace, address _binnaDevsNFT) payable {
        nftMarketplace = IFakeNFTMarketplace(_nftMarketplace);
        binnaDevsNFT = IBinnaDevsNFT(_binnaDevsNFT);
    }

    modifier nftHolderOnly(){
        require(binnaDevNFT.balanceOf(msg.sender) > 0, "NOT_A_DAO_MEMBER");
        _;
    }

    /**
     * @dev createProposal allows a BinnaDevsNFT holder to create a new proposal in the DAO
     * @param _nftTokenId - the tokenID of the NFT to be purchased from FakeNFTMarketplace 
     * if this proposal passes
     * 
     * @return Returns the proposal index for the newly created proposal
     */
    function createProposal()
    external
    nftHolderOnly
    {

    }

    /**
     * @dev voteOnProposal allows a BinnaDevsNFT holder to cast 
     * their vote on an active proposal.
     * 
     * @param proposalIndex - the index of the proposal to vote on in the proposals array
     * @param vote - the type of vote they want to cast
     */
    function voteOnProposal()
    external
    nftHolderOnly
    {

    }

    /**
     * @dev executeProposal allows any BinnaDevsNFT holder to execute a proposal
     * after it's deadline has been exceeded.
     * 
     * @param proposalIndex - the index of the proposal to execute in the proposals array
     */
    function executeProposal()
    external
    nftHolderOnly
    {

    }

     // Function to receive Ether. msg.data must be empty
    receive() external payable {}
    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}