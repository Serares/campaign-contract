import Web3 from "web3";

// not gonna work because it's rendered on server
window.ethereum.request({ method: "eth_requestAccounts" });
 
const web3 = new Web3(window.ethereum);
 
export default web3;