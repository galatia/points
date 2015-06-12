Points = new Mongo.Collection('points')

if (Meteor.isClient) {

  Template.points.helpers({
    points: function () {
      return Points.findOne({person: this.person}).points_count;
    }
  });

  Template.points.events({
    'click .button.inc': function () {
      Points.update(Points.findOne({person: this.person})['_id'], {$inc: {points_count: 1}})
    },
    'click .button.dec': function () {
      Points.update(Points.findOne({person: this.person})['_id'], {$inc: {points_count: -1}})
    }
  });
}

if (Meteor.isServer) {
  var createPerson = function (person) {
    if(!Points.findOne({person: person}))
      Points.insert({person: person, points_count: 0})
  }
  Meteor.startup(function() {
    createPerson('e')
    createPerson('d')
  })
}
