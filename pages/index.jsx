import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { Layout } from '../components/Layout';

class CampaignIndex extends Component {
    // makes the rendering more eficient if used with static
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        console.log(campaigns);
        // this object is provided to the class as props
        return { campaigns };
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(campaign => {
            return {
                header: campaign,
                description: <a>View</a>,
                fluid: true
            }
        })

        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <div>
                    <p>Campaigns :</p>
                    <Button floated="right" content="Create Campaign" icon="add" primary />
                    <div>{this.renderCampaigns()}</div>
                </div>
            </Layout>
        )
    }
}

export default CampaignIndex;
