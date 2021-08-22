// importing the factory contract from network
import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface), "0xA17F27D43b163413146eaF279af5d84431706317")
export default instance;
