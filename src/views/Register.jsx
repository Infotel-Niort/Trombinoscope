import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authAction from '../redux/actions/authAction'
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Divider
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      firstname: '',
      lastname: ''
    }
  }

  handleChange = (e, data) => {
    this.setState({ [data.name]: data.value })
  }

  handleSubmit = (e, value) => {
    this.props.actions.register(this.state.email, this.state.password, this.state.firstname, this.state.lastname);
  }

  render() {
    return (
      <Grid verticalAlign="middle" columns={2} centered style={{ height: '100%' }}>
        <Grid.Column>
          <Header as="h2" textAlign="center">Inscription</Header>

          <Segment placeholder style={{ maxHeight: '500px', maxWidth: '600px' }}>
            { this.props.err &&
              <Message negative>
                <Message.Header>{ this.props.err.message }</Message.Header>
              </Message>
            }
            <Grid columns={2} relaxed='very' stackable>
              <Grid.Column>
                <Form size="large">
                  <Form.Input onChange={this.handleChange} label='E-mail' icon="at" iconPosition="left" name="email" placeholder="E-mail"/>
                  <Form.Input onChange={this.handleChange} label='Password' icon="lock" iconPosition="left" name="password" placeholder="Mot de passe" type="password" />
                  <Form.Input onChange={this.handleChange} label='Prénom' icon="user" iconPosition="left" name="firstname" placeholder="Prénom" />
                  <Form.Input onChange={this.handleChange} label='Nom' icon="user" iconPosition="left" name="lastname" placeholder="Nom" />

                  <Button primary size="large" onClick={this.handleSubmit}>Se connecter</Button>
                </Form>
              </Grid.Column>

              <Grid.Column verticalAlign='middle'>
                <Button content='Se connecter' icon='signup' size='big' as={Link} to='/login' />
              </Grid.Column>
            </Grid>

            <Divider vertical>Ou</Divider>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(authAction, dispatch),
});

const mapStateToProps = state => ({
  err: state.authentication.err
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
