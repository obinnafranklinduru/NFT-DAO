import styles from '../styles/Home.module.css'
import { formatEther } from "ethers/lib/utils";

const Main = ({ treasuryBalance, nftBalance, numProposals, setSelectedTab, renderTabs }) =>
{
    return (
        <>
            <div className={styles.main}>
                <div>
                    <h1 className={styles.title}>Welcome to Binna Devs!</h1>
                    <div className={styles.description}>Welcome to the DAO!</div>
                    
                    <div className={styles.description}>
                        Your BinnaDevs NFT Balance: {nftBalance}
                        <br />
                        Treasury Balance: {formatEther(treasuryBalance)} ETH
                        <br />
                        Total Number of Proposals: {numProposals}
                    </div>
                    
                    <div className={styles.flex}>
                        <button
                            className={styles.button}
                            onClick={() => setSelectedTab("Create Proposal")}
                        >
                            Create Proposal
                        </button>
                        
                        <button
                            className={styles.button}
                            onClick={() => setSelectedTab("View Proposals")}
                        >
                            View Proposals
                        </button>
                    </div>
                    
                    {renderTabs()}
                </div>
                
                <div>
                    <img className={styles.image} src="/0.svg" />
                </div>
            </div>
        </>
    );
}

export default Main