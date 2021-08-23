import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

class RequestRow extends React.Component {

    async onApprove(event) {
        const campaign = Campaign(this.props.campaignAddress);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.approveRequest(this.props.id).send({
            from: accounts[0]
        })
    }

    render() {
        const { Cell, Row } = Table;
        const { description, value, recipient, approvalCount } = this.props.request;
        const { id, approversCount } = this.props;
        return (
            <Row>
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
                    <Button color="green" basic onClick={this.onApprove.bind(this)}>
                        Approve
                    </Button>
                </Cell>
                <Cell>
                    <Button color="yellow" basic>
                        Finalize
                    </Button>
                </Cell>
            </Row>
        )
    }
}

export default RequestRow;
