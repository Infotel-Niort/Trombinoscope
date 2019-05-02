const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Trombinoscope');

const Collaborateur = require('../express/models/Collaborateur');

const addCollaborateur = (collaborateur) => {
  var c = new Collaborateur();
  c.firstname = collaborateur.firstname;
  c.lastname = collaborateur.lastname;
  c.age = collaborateur.age;
  c.picture = '';
  c.job = collaborateur.job;
  c.mission = collaborateur.mission;
  c.skills = [];
  c.joinedDate = collaborateur.joinedDate;
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
  job: 'Ingénieur d\'étude',
  mission: '',
  joinedDate: new Date(2019, 1, 11)
});

addCollaborateur({
  firstname: 'Romain',
  lastname: 'COUTINEAU',
  age: 29,
  job: 'SCRUM Master',
  mission: 'Darva',
  joinedDate: new Date(2016, 4, 7)
});

addCollaborateur({
  firstname: 'Justine',
  lastname: 'THIBAUDEAU',
  age: 25,
  job: 'Ressources Humaines',
  mission: 'Infotel',
  joinedDate: new Date(2017, 3, 1)
});
