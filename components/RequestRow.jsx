import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

class RequestRow extends React.Component {

    async onApprove() {
        const campaign = Campaign(this.props.campaignAddress);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.approveRequest(this.props.id).send({
            from: accounts[0]
        })
    }

    async onFinalize() {
        const campaign = Campaign(this.props.campaignAddress);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.finalizeRequest(this.props.id).send({
            from: accounts[0]
        })
    }

    render() {
        const { Cell, Row } = Table;
        const { description, value, recipient, approvalCount, complete } = this.props.request;
        const { id, approversCount } = this.props;
        const readyToFinalize = approvalCount > approversCount / 2;
        return (
            <Row disabled={complete} positive={readyToFinalize && !complete}>
                <Cell>
                    {id}
                </Cell>
                <Cell>
                    {description}
                </Cell>
                <Cell>
                    {web3.utils.fromWei(value, 'ether')}
                </Cell>
                <Cell>
                    {recipient}
                </Cell>
                <Cell>
                    {approvalCount} / {approversCount}
                </Cell>
                <Cell>
                    {!complete &&
                        <Button color="green" basic onClick={this.onApprove.bind(this)}>
                            Approve
                        </Button>
                    }
                </Cell>
                <Cell>
                    {
                        !complete &&
                        <Button color="yellow" basic onClick={this.onFinalize.bind(this)}>
                            Finalize
                        </Button>
                    }
                </Cell>
            </Row>
        )
    }
}

export default RequestRow;
