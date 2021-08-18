const assert = require("assert");
const gnache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(gnache.provider({ gasLimit: "10000000" }));

const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

let accounts;
let factory;
let campaignAddress;
let campaign;


beforeEach(async () => {
    // accounts provided by gnache of length 10
    accounts = await web3.eth.getAccounts();
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: "10000000" });

    await factory.methods.createCampaign("100").send({
        from: accounts[0],
        gas: "10000000"
    });

    [campaignAddress] = (await factory.methods.getDeployedCampaigns().call());
    campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.interface), campaignAddress);
});


describe("Campaigns", () => {
    it("Deploys a factory and a campaign", () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it("Make sure the caller is the manager", async () => {
        // for public instance variables solidity will create getter methods
        const manager = await campaign.methods.manager().call();
        assert.strictEqual(manager, accounts[0]);
    });

    it("Allows people to contribute", async () => {
        await campaign.methods.contribute().send({
            value: "200",
            from: accounts[1]
        });

        const isContributor = await campaign.methods.approvers(accounts[1]).call();

        assert(isContributor);
    });

    it("Requires a minimum contribution", async () => {
        try {
            await campaign.methods.contribute().send({
                from: accounts[1],
                value: "5"
            });
            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    it("Allows manager to create paymanet request", async () => {
        await campaign.methods.createRequest(
            "Buy springs",
            "100",
            accounts[1]
        )
            .send({
                from: accounts[0],
                gas: "10000000"
            });

        const request = await campaign.methods.requests(0).call();
        assert.strictEqual("100", request.value);
    });

    it("Processes requests", async () => {
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei("10", "ether")
        });

        await campaign.methods.createRequest("A", web3.utils.toWei("5", "ether"), accounts[1])
            .send({
                from: accounts[0],
                gas: "10000000"
            });

        await campaign.methods.approveRequest(0).send({
            from: accounts[0],
            gas: "10000000"
        });

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: "10000000"
        });

        // this is in wei
        let recieverBalance = await web3.eth.getBalance(accounts[1]);
        // be aware that ganache can't reset accounts balances
        // tests can change accounts balance
        balance = web3.utils.fromWei(recieverBalance, "ether");
        balance = parseFloat(balance);
        console.log(balance);
        assert(balance > 100);
    });
});
