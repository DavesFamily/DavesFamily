import {
    ethers
} from "ethers";

/**
 * Web3 integration by Jone.
 * 
 * Check wallet connection, redirect to Minting page.
 */
// Change this address to mainnet address of deployed smart contract
const CONTRACT_ADDRESS = "0xfD4e576efBf627E8310A431Fd3c0Fd4ec7105D4f"

// This should be the one of deployed smart contract
const ABI = require("./dave-abi.json")

export const connectWallet = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const obj = {
                status: "Wallet is connected",
                address: addressArray[0],
            };
            return obj;
        } catch (e) {
            return {
                address: "",
                status: e.message
            };
        }
    } else {
        return {
            address: "",
            status: "Metamask is not installed"
        }
    }
}

export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_accounts",
            });
            if (addressArray.length > 0) {
                return {
                    address: addressArray[0],
                    status: "Wallet is connected",
                };
            } else {
                return {
                    address: "",
                    status: "🦊 Connect to Metamask.",
                };
            }
        } catch (err) {
            return {
                address: "",
                status: "😥 " + err.message,
            };
        }
    } else {
        return {
            address: "",
            status: "Metamask is not installed"
        };
    }
};

export const checkWhitelisted = async () => {
    try {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner()
            let addr
            try{
                addr = await ethereum.request({method: 'eth_accounts'})
            }catch(e){
                console.log(e)
                return 0
            }
            const daveContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
            console.log("Checking white listed ...")

            try {
                let tx = await daveContract.presaleWhitelist(addr[0])
                // Should add some logic according to tx
                return tx
            } catch (e){
                console.log(e)
                return 0
            }
        } else {
            console.log("Ethereum object does not exist")
            return 0
        }
    } catch (e) {
        console.log(e);
        return true
    }
}

const eth2wei = (amount) => {
    return amount * 10 ** 18;
}

export const mintPresale = async (amount) => {
    const iface = new ethers.utils.Interface(ABI);
    const tx = iface.encodeFunctionData("mintPresale", [amount])

    let price = 0.05555;
    const transactionParameters = {
        to: CONTRACT_ADDRESS,
        from: window.ethereum.selectedAddress,
        data: tx,
        value: eth2wei(price * amount).toString(16)
    };
    try {
        const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });
        console.log(txHash)
    } catch (e) {
        console.log(e)
    }
}