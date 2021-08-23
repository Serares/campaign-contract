import React from 'react';
import { Layout } from '../../../components/Layout';
import { Button, Table } from 'semantic-ui-react'
import { Link } from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class RequestsIndex extends React.Component {

    static async getInitialProps(props) {
        const { campaignAddress } = props.query;
        const campaign = Campaign(campaignAddress);
        const requestCount = await campaign.methods.getRequestsCount().call();
        const approversCount = await campaign.methods.approversCount().call();

        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element, index) => {
                return campaign.methods.requests(index).call();
            })
        );
        console.log(requestCount);
        console.log(requests);
        return { campaignAddress, requests, requestCount, approversCount };
    }

    renderRows() {
        return this.props.requests.map((request, index) => {
            return <RequestRow 
                request={request}
                id={index}
                key={index}
                campaignAddress={this.props.campaignAddress}
                approversCount={this.props.approversCount}
            />;
        })
    }

    render() {
        return (
            <Layout>
                <h1>Requests list</h1>
                <Link route={`/campaigns/${this.props.campaignAddress}/requests/new`}>
                    <a>
                        <Button primary>
                            Add request
                        </Button>
                    </a>
                </Link>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                ID:
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Description
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Amount
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Recipient
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Approval Count
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Approve
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Finalize
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.renderRows()}
                    </Table.Body>
                </Table>
            </Layout>
        )
    }
}

export default RequestsIndex;