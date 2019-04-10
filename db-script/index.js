const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Trombinoscope');

const Collaborateur = require('../express/models/Collaborateur');

function addCollaborateur(collaborateur) {
  var c = new Collaborateur();
  c.firstname = collaborateur.firstname;
  c.lastname = collaborateur.lastname;
  c.age = collaborateur.age;
  c.picture = '';
  c.job = collaborateur.job;
  c.mission = collaborateur.mission;
  c.skills = [];
  c.meta = {
    created: new Date(),
    modified: new Date()
  };
  c.save();
}

addCollaborateur({
  firstname: 'Marvin',
  lastname: 'CATOIS',
  age: 24,
  job: 'Ingénieur d\'étude et développement',
  mission: 'Intercontract'
});

addCollaborateur({
  firstname: 'Romain',
  lastname: 'COUTINEAU',
  age: 29,
  job: 'SCRUM Master',
  mission: 'Darva'
});

addCollaborateur({
  firstname: 'Justine',
  lastname: 'THIBAUDEAU',
  age: 25,
  job: 'Responsable RH',
  mission: 'Infotel'
});
