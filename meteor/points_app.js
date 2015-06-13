isSecure = function() {
  return Meteor.settings && Meteor.settings.public && Meteor.settings.public.isSecure
}

Accounts.config({restrictCreationByEmailDomain: function(email) {
  emails = isSecure() && Meteor.settings.authorizedEmails
  if(emails) {  //Check if there are any specified authorizedEmails
    for(var i = 0; i < emails.length; i++) {
      if(email === emails[i])
        return true
    }
    return false
  } else {
    return true
  }
}})

Points = new Mongo.Collection('points')

if (Meteor.isClient) {
  Meteor.subscribe("points");

  Template.registerHelper("loggedIn", function() {
    if(isSecure()) {
      return Meteor.userId()
    } else {
      return true
    }
  })

  Template.points.helpers({
    points: function() {
      return Points.findOne({person: this.person}).points_count
    }
  })

  function inc(person, delta) {
    Meteor.call("inc", person, delta)
  }

  Template.points.events({
    'click .button.inc': function() { inc(this.person,1) },
    'click .button.dec': function() { inc(this.person,-1) },

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
    //Initialize database
    createPerson('e')
    createPerson('d')
    Meteor.publish("points", function() {
      if(this.userId || !(Meteor.settings.authorizedEmails)) {
        return Points.find()
      }
    });
  })
}

var checkUserAuth = function() {
  if(! Meteor.userId() && Meteor.settings.authorizedEmails) {
    throw new Meteor.Error("not-authorized")
  }
}

Meteor.methods({
  inc: function(person, delta) {
    checkUserAuth()
    Points.update(Points.findOne({person: person})['_id'], {$inc: {points_count: delta}})
  }
})
