import React from 'react';
import { Layout } from '../../components/Layout';
import 'semantic-ui-css/semantic.min.css';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

class CampaignNew extends React.Component {
    state = {
        minimumContribution: "",
        errorMessage: "",
        loading: false
    }
    // or use an arrow function to performe lexical binding
    async onSubmit(event) {
        event.preventDefault();
        this.setState({
            loading: true
        });

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampaign(this.state.minimumContribution)
                //dont need to specify gas if we use metamask
                .send({
                    from: accounts[0]
                });
        } catch (err) {
            this.setState({
                errorMessage: "Transaction error"
            });
        }

        this.setState({
            loading: false
        })

    }

    render() {
        return (
            <Layout>
                <p>New campaign</p>
                {/* {this.state.errorMessage && <Message error header="Error" content={this.state.errorMessage} />} */}
                <Form onSubmit={this.onSubmit.bind(this)} error={!!this.state.errorMessage}>
                    <Message error header="Error" content={this.state.errorMessage} />
                    <Form.Field>
                        <label>minimum contribution</label>
                        <Input
                            label="WEI"
                            labelPosition="right"
                            type="number"
                            value={this.state.minimumContribution}
                            onChange={(e) => { this.setState({ minimumContribution: e.target.value }) }}
                        />
                    </Form.Field>
                    <Button primary loading={this.state.loading}>
                        Create
                    </Button>
                </Form>
            </Layout>
        )
    }
}

export default CampaignNew;
