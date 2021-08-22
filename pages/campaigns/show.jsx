import React from "react";
import { Layout } from '../../components/Layout';
import Campaign from '../../ethereum/campaign';

class CampaignShow extends React.Component {
    // called with props as argument to access query params
    static async getInitialProps(props) {
        const campaing = Campaign(props.query.campaignAddress);
        const summary = await campaing.methods.getSummary().call();
        console.log(summary);
        return {}
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
