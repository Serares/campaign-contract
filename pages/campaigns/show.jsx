import React from "react";
import { Layout } from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card, Grid, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends React.Component {
    // called with props as argument to access query params
    static async getInitialProps(props) {
        const campaing = Campaign(props.query.campaignAddress);
        // {[key: number]: value} it's an object
        const summary = await campaing.methods.getSummary().call();

        console.log(summary);
        return {
            campaignAddress: props.query.campaignAddress,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        }
    }

    renderCards() {
        const { balance, manager, minimumContribution, requestsCount, approversCount } = this.props;
        const items = [
            {
                header: manager,
                meta: 'Address of manager',
                description: 'The manager created this campaign',
                style: { overflowWrap: "break-word" }
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Current campaign balance (ether)',
                description: 'How much money this campaign has'
            },
            {
                header: minimumContribution,
                meta: 'Min Contribution WEI',
                description: 'You need this much wei to be an approver'
            },
            {
                header: requestsCount,
                meta: 'Nr of requests',
                description: 'A request tries to withdraw eth from contract. Requests must be approved by approvers'
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of people who have donated to this campaign'
            },
        ];

        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <h3>Campaign Summary</h3>
                <Grid>
                    <Grid.Row>

                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm campaignAddress={this.props.campaignAddress} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.campaignAddress}/requests`}>
                                <a>
                                    <Button primary>
                                        View requests
                                    </Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        )
    }
}


export default CampaignShow;
