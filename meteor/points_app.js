Accounts.config({restrictCreationByEmailDomain: function(email) {
  emails = Meteor.settings.authorizedEmails
  for(var i = 0; i < emails.length; i++) {
    if(email === emails[i])
      return true
  }
  return false
}})

Points = new Mongo.Collection('points')

if (Meteor.isClient) {
  Meteor.subscribe("points");

  Template.registerHelper("loggedIn", function () {
      return Meteor.userId()
    }
  )

  Template.points.helpers({
    points: function () {
      return Points.findOne({person: this.person}).points_count
    }
  })

  function inc(person, delta) {
    Meteor.call("inc", person, delta)
  }

  Template.points.events({
    'click .button.inc': function () { inc(this.person,1) },
    'click .button.dec': function () { inc(this.person,-1) },

    'touchend .button.inc': function(event) {
      event.preventDefault()
      inc(this.person,1)
    },
    'touchend .button.dec': function(event) {
      event.preventDefault()
      inc(this.person,-1)
    }
  })
}

if (Meteor.isServer) {
  var createPerson = function (person) {
    if(!Points.findOne({person: person}))
      Points.insert({person: person, points_count: 0})
  }
  Meteor.startup(function() {
    createPerson('e')
    createPerson('d')
    Meteor.publish("points", function() {
      if(this.userId) {
        return Points.find()
      }
    });
  })
}

var checkUserAuth = function() {
    if(! Meteor.userId()) {
      throw new Meteor.Error("not-authorized")
    }
}

Meteor.methods({
  inc: function(person, delta) {
    checkUserAuth()
    Points.update(Points.findOne({person: person})['_id'], {$inc: {points_count: delta}})
  }
})
