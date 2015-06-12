Points = new Mongo.Collection('points')

if (Meteor.isClient) {

  Template.points.helpers({
    points: function () {
      return Points.findOne({person: this.person}).points_count;
    }
  });

  function inc(person,delta) {
    Points.update(Points.findOne({person: person})['_id'], {$inc: {points_count: delta}})
  }
  Template.points.events({

    'click .button.inc': function () { inc(this.person,1); },
    'click .button.dec': function () { inc(this.person,-1); },

    'touchend .button.inc': function(event) {
      event.preventDefault();
      inc(this.person,1);
    },
    'touchend .button.dec': function(event) {
      event.preventDefault();
      inc(this.person,-1);
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
