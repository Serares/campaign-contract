import React from "react";
import { Layout } from '../../components/Layout';
import factory from '../../ethereum/factory';

class CampaignShow extends React.Component {
    // called with props as argument to access query params
    static async getInitialProps(props) {
        console.log(props.query.campaignAddress);
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