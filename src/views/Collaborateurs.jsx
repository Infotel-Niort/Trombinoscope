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

  getMission(mission) {
    if (mission === '') return 'En intercontrat';
    else if (mission === 'Infotel') return 'En agence Infotel'
    else return mission
  }

  getYearsOfExp(date) {
    const nbMonth = new Date().getMonth() - new Date(date).getMonth() + (12 * (new Date().getFullYear() - new Date(date).getFullYear()));
    return (nbMonth >= 12 ? (Math.floor(nbMonth / 12) + ' ans' + (nbMonth % 12 != 0 ? (' et ' + nbMonth % 12 + ' mois') : '')) : (nbMonth + ' mois'));
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
                <Card>
                  <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                  <Card.Content>
                    <Card.Header>{ elem.firstname } { elem.lastname }</Card.Header>
                    <Card.Meta>
                      <span className='date'>Chez nous depuis { this.getYearsOfExp(elem.joinedDate) }</span>
                    </Card.Meta>
                  </Card.Content>
                  <Card.Content extra>
                    <Icon name='briefcase' />
                    { elem.job }
                  </Card.Content>
                  <Card.Content extra>
                    <Icon name='factory' />
                    { this.getMission(elem.mission) }
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
