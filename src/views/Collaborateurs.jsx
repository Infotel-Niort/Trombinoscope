import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import * as collaborateurAction from '../redux/actions/collaborateurAction'
import AddCollaborateur from '../components/collaborateur/add'
import {
  Button,
  Card,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
} from 'semantic-ui-react'

class Collaborateurs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.actions.getCollaborateurs();
  }

  render() {
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <AddCollaborateur />
          </Grid.Row>
          <Grid.Row columns={3}>
            { this.props.collaborateurs.map((elem, i) =>
              <Grid.Column key={i}>
                <Card href={'/collaborateur/' + elem._id}>
                  <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                  <Card.Content>
                    <Card.Header>{ elem.firstname } { elem.lastname }</Card.Header>
                    <Card.Meta>
                      <span className='date'>Chez nous depuis { new Date(elem.meta.created).getFullYear() }</span>
                    </Card.Meta>
                  </Card.Content>
                  <Card.Content extra>
                    <Icon name='briefcase' />
                    { elem.job }
                  </Card.Content>
                  <Card.Content extra>
                    <Icon name='factory' />
                    { elem.mission }
                  </Card.Content>
                </Card>
              </Grid.Column>
            ) }
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(collaborateurAction, dispatch) });
const mapStateToProps = state => ({ collaborateurs: state.collaborateur.collaborateurs });
export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Collaborateurs);
