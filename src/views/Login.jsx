import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authAction from '../redux/actions/authAction'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  handleChange = (e, data) => {
    this.setState({ [data.name]: data.value })
  }

  handleSubmit = (e, value) => {
    this.props.actions.login(this.state.email, this.state.password)
  }

  render() {
    return (
      <Grid centered columns={2}>
        <Grid.Column verticalAlign="bottom">
          <Header as="h2" textAlign="center">Connexion</Header>

          <Segment>
            <Form size="large">
              <Form.Input fluid onChange={this.handleChange} icon="user" iconPosition="left" name="email" placeholder="E-mail"/>
              <Form.Input fluid onChange={this.handleChange} icon="lock" iconPosition="left" name="password" placeholder="Mot de passe" type="password" />

              <Button color="blue" fluid size="large" onClick={this.handleSubmit}>Se connecter</Button>
            </Form>
          </Segment>
          <Message>Pas encore inscrit ? <a href="#">S'inscrire</a></Message>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(authAction, dispatch),
})

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
