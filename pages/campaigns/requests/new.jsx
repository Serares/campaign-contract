import React from 'react';
import { Layout } from '../../../components/Layout';
import { Button, Form, Message, Input } from 'semantic-ui-react'
import { Link, Router } from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';

class RequestNew extends React.Component {
    state = {
        value: "",
        description: "",
        recipient: "",
        isLoading: false,
        errorMessage: ""
    }

    static async getInitialProps(props) {
        const { campaignAddress } = props.query;

        return { campaignAddress };
    }

    async onSubmit(event) {
        event.preventDefault();

        const campaign = Campaign(this.props.campaignAddress);
        const { description, value, recipient } = this.state;
        try {
            this.setState({
                isLoading: true,
                errorMessage: ""
            });
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(description, web3.utils.toWei(value, "ether"), recipient).send({
                from: accounts[0]
            });
            Router.pushRoute(`/campaigns/${this.props.campaignAddress}/requests`)
        } catch (error) {
            console.log(Error);
            this.setState({
                errorMessage: error.message
            })
        }
        this.setState({
            isLoading: false
        });
    }

    render() {
        return (
            <Layout>
                <h3>Create request</h3>

                <Form onSubmit={this.onSubmit.bind(this)} error={!!this.state.errorMessage}>
                    <Message error content={this.state.errorMessage} header="Error message" />
                    <Form.Field>
                        <label>Desciption:</label>
                        <Input
                            value={this.state.description}
                            onChange={event => this.setState({ description: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Value in ether:</label>
                        <Input
                            value={this.state.value}
                            onChange={event => this.setState({ value: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Recipient:</label>
                        <Input
                            value={this.state.recipient}
                            onChange={event => this.setState({ recipient: event.target.value })}
                        />
                    </Form.Field>
                    <Button primary loading={this.state.isLoading}>Create</Button>
                    <Link route={`/campaigns/${this.props.campaignAddress}/`}>
                        <a>
                            <Button primary>
                                Back
                            </Button>
                        </a>
                    </Link>
                </Form>
            </Layout>
        )
    }
}

export default RequestNew;
