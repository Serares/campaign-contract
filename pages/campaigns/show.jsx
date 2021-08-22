import React from "react";
import { Layout } from '../../components/Layout';
import Campaign from '../../ethereum/campaign';

class CampaignShow extends React.Component {
    // called with props as argument to access query params
    static async getInitialProps(props) {
        const campaing = Campaign(props.query.campaignAddress);
        // {[key: number]: value} it's an object
        const summary = await campaing.methods.getSummary().call();

        console.log(summary);
        return {
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: sumary[2],
            approverCount: summary[3],
            manager: summary[4]
        }
    }

    render() {
        return (
            <Layout>
                <h3>Show campaign</h3>
            </Layout>
        )
    }
}


export default CampaignShow;
