import React, { Component } from 'react';
import factory from '../ethereum/factory';

class CampaignIndex extends Component {
    // makes the rendering more eficient if used with static
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        console.log(campaigns);
        // this object is provided to the class as props
        return { campaigns };
    }

    render() {
        return (
            <>
                <p>Campaigns :</p>
                <p>{this.props.campaigns ? this.props.campaigns.map(item => <span key={item}>{item}</span>) : <p>No campaigns</p>}</p>
            </>
        )
    }
}

export default CampaignIndex;
