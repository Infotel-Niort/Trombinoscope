import React from 'react';
import { Button, Header, Image, Modal, Icon, Form } from 'semantic-ui-react';
import PictureUpload from '../PictureUpload'

class AddCollaborateur extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  componentDidMount() {
  }

  render() {
    const { open, dimmer } = this.state

    return (
      <div>
        <Button animated positive onClick={this.show(true)}>
          <Button.Content visible>
            <Icon name='add' />
          </Button.Content>
          <Button.Content hidden>Ajouter</Button.Content>
        </Button>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Ajouter un collaborateur</Modal.Header>
          <Modal.Content image>
            <PictureUpload />
            <Form size="large">
              <Form.Group widths='equal'>
                <Form.Input fluid onChange={this.handleChange} label='Prénom' icon="user" iconPosition="left" name="firstname" placeholder="Prénom" />
                <Form.Input fluid onChange={this.handleChange} label='Nom' icon="user" iconPosition="left" name="lastname" placeholder="Nom" />
              </Form.Group>
              <Form.Input fluid onChange={this.handleChange} label='E-mail' icon="at" iconPosition="left" name="email" placeholder="E-mail"/>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.close} content="Annuler" />
            <Button positive icon='checkmark' labelPosition='right' content="Ajouter !" onClick={this.close} />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default AddCollaborateur;
