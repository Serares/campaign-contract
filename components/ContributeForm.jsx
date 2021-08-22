import React from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends React.Component {
    state = {
        value: "",
        isLoading: false,
        errorMessage: ""
    };

    async onSubmit(event) {
        event.preventDefault();
        this.setState({
            isLoading: true
        });
        const campaign = Campaign(this.props.campaignAddress);

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, "ether")
            })
        } catch (error) {
            this.setState({
                errorMessage: error.message
            })
        }

        this.setState({
            isLoading: false,
            value: "",
            errorMessage: ""
        });
        Router.replaceRoute(`/campaigns/${this.props.campaignAddress}`);
    };


    render() {
        return (
            <Form onSubmit={this.onSubmit.bind(this)} error={!!this.state.errorMessage}>
                <Message error header="Error" content={this.state.errorMessage} />
                <Form.Field>
                    <label />
                    <Input
                        value={this.state.value}
                        label="ether"
                        labelPosition="right"
                        onChange={event => this.setState({ value: event.target.value })}
                    />
                </Form.Field>
                <Button primary loading={this.state.isLoading}>
                    Contribute
                </Button>
            </Form>
        )
    }
}


export default ContributeForm;