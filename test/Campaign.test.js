const assert = require("assert");
const gnache = require("gnache-cli");
const Web3 = require("web3");
const web3 = new Web3(gnache.provider());

const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

let accounts;
let factory;
let campaignAddress;
let campaign;


beforeEach(async () => {
    // accounts provided by gnache
    accounts = await web3.eth.getAccounts();
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0] });

    await factory.methods.createCampaign("100").send({
        from: accounts[0],
        gas: "1000000"
    })

    campaignAddress = await factory.methods.getDeployedCampaigns().call()[0];
    campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.interface), campaignAddress);
});


describe("Factory deploys a contract")