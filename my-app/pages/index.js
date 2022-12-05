import { Contract, providers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";

import styles from '../styles/Home.module.css'
import {
  BINNADEVS_DAO_ABI,
  BINNADEVS_DAO_CONTRACT_ADDRESS,
  BINNADEVS_NFT_ABI,
  BINNADEVS_NFT_CONTRACT_ADDRESS,
} from "../constants";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const web3ModelRef = useRef();

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
  }, []);

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  }

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

  const getDAOTreasuryBalance = async () => {
    
  }

  return (
    <h1>Hello world</h1>
  )
}
