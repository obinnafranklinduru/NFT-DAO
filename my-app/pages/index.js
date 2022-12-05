import { Contract, providers } from "ethers";
import { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";

import Meta from '../components/Meta'
import Main from '../components/Main'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.css'
import {
  BINNADEVS_DAO_CONTRACT_ADDRESS,
  BINNADEVS_DAO_ABI,
  BINNADEVS_NFT_CONTRACT_ADDRESS,
  BINNADEVS_NFT_ABI,
} from "../constants";

export default function Home() {
  // True if user has connected their wallet, false otherwise
  const [walletConnected, setWalletConnected] = useState(false);
  // True if waiting for a transaction to be mined, false otherwise.
  const [loading, setLoading] = useState(false);
  // ETH Balance of the DAO contract
  const [treasuryBalance, setTreasuryBalance] = useState("0");
  // Number of proposals created in the DAO
  const [numProposals, setNumProposals] = useState("0");
  // Array of all proposals created in the DAO
  const [proposals, setProposals] = useState([]);
  // User's balance of BinnaDevs NFTs
  const [nftBalance, setNftBalance] = useState(0);
  // Fake NFT Token ID to purchase. Used when creating a proposal.
  const [fakeNftTokenId, setFakeNftTokenId] = useState("");
  // One of "Create Proposal" or "View Proposals"
  const [selectedTab, setSelectedTab] = useState("");
  const web3ModelRef = useRef();

  // piece of code that runs everytime the value of `walletConnected` changes
  // so when a wallet connects or disconnects
  // Prompts user to connect wallet if not connected
  // and then calls helper functions to fetch the
  // DAO Treasury Balance, User NFT Balance, and Number of Proposals in the DAO
  useEffect(() => {
    if (!walletConnected) {
      web3ModelRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false
      });
    }
    connectWallet().then(() => {
      getDAOTreasuryBalance();
      getUserNFTBalance();
      getNumProposalsInDAO();
    })
  }, [walletConnected]);

  // Piece of code that runs everytime the value of `selectedTab` changes
  // Used to re-fetch all proposals in the DAO when user switches
  // to the 'View Proposals' tab
  useEffect(() => {
    if (selectedTab === "View Proposals") {
      fetchAllProposals();
    }
  }, [selectedTab])

   // Helper function to connect wallet
  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  }

  // Helper function to fetch a Provider/Signer instance from Metamask
  const getProviderOrSigner = async (needSigner = false) => {
    try {
      const provider = await web3ModelRef.current.connect();
      const web3Provider = await providers.Web3Provider(provider);

      const { chainId } = await web3ModelRef.getNetwork();
      if (chainId !== 5) {
        window.alert("Please switch to the Goerli network!");
        throw new Error("Please switch to the Goerli network!");
      }

      if (needSigner) {
        const signer = await web3Provider.getSigner();
        return signer;
      }

      return web3Provider;
    } catch (err) {
      console.error(err);
    }
  }

  // Helper function to return a BinnaDevs NFT Contract instance
  // given a Provider/Signer
  const getBinnadevsNFTContractInstance = async (providerOrSigner) => {
    return new Contract(
      BINNADEVS_NFT_CONTRACT_ADDRESS,
      BINNADEVS_NFT_ABI,
      providerOrSigner
    )
  }

  // Helper function to return a DAO Contract instance
  // given a Provider/Signer
  const getDaoContractInstance = async (providerOrSigner) => {
    return new Contract(
      BINNADEVS_DAO_CONTRACT_ADDRESS,
      BINNADEVS_DAO_ABI,
      providerOrSigner
    )
  }

   // Reads the ETH balance of the DAO contract and sets the `treasuryBalance` state variable
  const getDAOTreasuryBalance = async () => {
    try {
      const provider = await getProviderOrSigner();
      const balance = await provider.getBalance(BINNADEVS_DAO_CONTRACT_ADDRESS);
      setTreasuryBalance(balance.toString());
    } catch (err) {
      console.error(err);
    }
  }

  // Reads the balance of the user's CryptoDevs NFTs and sets the `nftBalance` state variable
  const getUserNFTBalance = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = getBinnadevsNFTContractInstance(signer);
      const balance = await contract.balanceOf(signer.getAddress());
      setNftBalance(parseInt(balance.toString()));
    } catch (err) {
      console.error(err);
    }
  }

  // Reads the number of proposals in the DAO contract and
  // sets the `numProposals` state variable
  const getNumProposalsInDAO = async () => {
    try {
      const provider = await getProviderOrSigner();
      const contract = getDaoContractInstance(provider);
      const daoNumProposals = await contract.numProposals();
      setNumProposals(daoNumProposals.toString());
    } catch (err) {
      console.error(err);
    }
  }

  // Calls the `createProposal` function in the contract, using the tokenId from `fakeNftTokenId`
  const createProposal = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = await getDaoContractInstance(signer);
      const tx = await contract.createProposal(fakeNftTokenId);

      setLoading(true);
      await tx.wait();
      setLoading(false);
      await getNumProposalsInDAO();
      window.alert("You have successfully created a proposal. Please wait for others to vote.");
    } catch (err) {
      console.error(err);
      window.alert(err.data.message);
    }
  }

  // Helper function to fetch and parse one proposal from the DAO contract
  // Given the Proposal ID
  // and converts the returned data into a Javascript object with values we can use
  const fetchProposalById = async (id) => {
    try {
      const provider = await getProviderOrSigner();
      const contract = await getDaoContractInstance(provider);
      const proposal = await contract.proposals(id);
      const parsedProposal = {
        proposalId: id,
        nftTokenId: proposal.nftTokenId.toString(),
        deadline: new Date(parseInt(proposal.deadline.toString()) * 1000),
        yayVotes: proposal.yayVotes.toString(),
        nayVotes: proposal.nayVotes.toString(),
        executed: proposal.executed,
      };
      return parsedProposal;
    } catch (err) {
      console.error(err);
    }
  }

  // Runs a loop `numProposals` times to fetch all proposals in the DAO
  // and sets the `proposals` state variable
  const fetchAllProposals = async () => {
    try {
      const proposals = [];
      for (let i = 0; i < numProposals; i++){
        const proposal = await fetchProposalById();
        proposals.push(proposal);
      }
      setProposals(proposals);
      return proposals;
    } catch (err) {
      console.error(err);
    }
  }

  // Calls the `voteOnProposal` function in the contract, using the passed
  // proposal ID and Vote
  const voteOnProposal = async (proposalId, _vote) => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = await getDaoContractInstance(signer);
      // If the vote is yes, enter zero; otherwise, enter one.
      let vote = _vote === "YAY" ? 0 : 1;
      const tx = await contract.voteOnProposal(proposalId, vote);
      
      setLoading(true);
      await tx.wait();
      setLoading(false);
      await fetchAllProposals();
      window.alert("Thank you for voting. Your vote counts.")
    } catch (err) {
      console.error(err);
      window.alert(err.data.message);
    }
  }

  // Calls the `executeProposal` function in the contract, using
  // the passed proposal ID
  const executeProposal = async (proposalId) => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = await getDaoContractInstance(signer);
      const tx = await contract.executeProposal(proposalId);

      setLoading(true);
      await tx.wait();
      setLoading(false);
      await fetchAllProposals();
      window.alert("The proposal was carried out successfully.")
    } catch (err) {
      console.error(err);
      window.alert(err.data.message);
    }
  }

  // Render the contents of the appropriate tab based on `selectedTab`
  function renderTabs() {
    if (selectedTab === "Create Proposal") {
      return renderCreateProposalTab();
    } else if (selectedTab === "View Proposals") {
      return renderViewProposalsTab();
    } else {
      return null;
    }
  }

  // Renders the 'Create Proposal' tab content
  function renderCreateProposalTab() {
    if (loading) {
      return (
        <div className={styles.description}>
          Loading... Waiting for transaction...
        </div>
      )
    } else if (nftBalance === 0) {
      return (
        <div className={styles.description}>
          You do not own any BinnaDevs NFTs. <br />
          <b>You cannot create or vote on proposals</b>
        </div>
      )
    } else {
      return (
        <div className={styles.description}>
          <label>Fake NFT Token ID to Purchase: </label>

          <input
            placeholder="0"
            type="number"
            onChange={(e) => setFakeNftTokenId(e.target.value)}
          />

          <button className={styles.button2} onClick={createProposal}>
            Create
          </button>
        </div>
      )
    }
  }

  // Renders the 'View Proposals' tab content
  function renderViewProposalsTab() {
    if(loading){
      return (
        <div className={styles.description}>
          Loading... Waiting for transaction...
        </div>
      )
    }else if(proposals.length === 0){
      return (
        <div className={styles.description}>No proposals have been created</div>
      )
    } else {
      return (
        <div>
          {proposals.map((p, index) => (
            <div key={index} className={styles.description}>
              <p>Proposal ID: {p.proposalId}</p>
              <p>Fake NFT to Purchase: {p.nftTokenId}</p>
              <p>Deadline: {p.deadline.toLocaleString()}</p>
              <p>Yay Votes: {p.yayVotes}</p>
              <p>Nay Votes: {p.nayVotes}</p>
              <p>Executed?: {p.executed.toString()}</p>

              {p.deadline.getTime() > Date.now() && !p.executed ? (
                <div className={styles.flex}>
                  <button
                    className={styles.button2}
                    onClick={() => voteOnProposal(p.proposalId, "YAY")}
                  >
                    Vote YAY
                  </button>

                  <button
                    className={styles.button2}
                    onClick={() => voteOnProposal(p.proposalId, "NAY")}
                  >
                    Vote NAY
                  </button>
                </div>
              ) :
                p.deadline.getTime() < Date.now() && !p.executed ? (
                  <div className={styles.flex}>
                    <button
                      className={styles.button2}
                      onClick={() => executeProposal(p.proposalId)}
                    >
                      Execute Proposal{" "}
                      {p.yayVotes > p.nayVotes ? "(YAY)" : "(NAY)"}
                    </button>
                  </div>
                ) :
                  (
                    <div className={styles.description}>Proposal Executed</div>
                  )
            }
            </div>
          )
          )}
        </div>
      )
    }
  }

  return (
    <>
      <Meta />
      <Main
        treasuryBalance = {treasuryBalance}
        nftBalance = {nftBalance}
        numProposals = {numProposals}
        setSelectedTab = {setSelectedTab}
        renderTabs = {renderTabs}
      />
      <Footer />
    </>
  )
}