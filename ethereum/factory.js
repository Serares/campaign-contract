// importing the factory contract from network
import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory), "0x38C14d207a8170a5F06bED42C889E4330C636991")
export default instance;
