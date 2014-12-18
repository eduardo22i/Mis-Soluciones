
Template.postsList.helpers({
  posts: function () {
    return Posts.find();
  }
});

Template.postItem.helpers({
  ownPost: function() {
    return this.userId == Meteor.userId();
  },
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  date: function ()  {
      var date = new Date(this.submitted)
      var m_names = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    return date.getDate() + " de " + m_names[date.getMonth()]  + " del " + date.getFullYear();
  },
  upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return ' disable ';
    } else {
      return 'upvotable voted-yes';
    }
  },
    downvotedClass: function() {
        var userId = Meteor.userId();
        if (userId && !_.include(this.upvoters, userId)) {
        return ' disable ';
        } else {
        return 'downvotable voted-yes';
        }
  },
    
    authorName : function() {
        //if (this.user().profile.name) {
            //alert(this.user().profile.name)   
        //}
        theAuthor =  Meteor.users.findOne({_id: this.userId}) ;

        console.log(theAuthor)
        if (theAuthor.profile) {
            return theAuthor.profile.name
        } else {
            return theAuthor.emails[0].address
        }
    
    },
    authorPicture : function() {
        //if (this.user().profile.name) {
            //alert(this.user().profile.name)   
        //}
        theAuthor =  Meteor.users.findOne({_id: this.userId}) ;

        console.log(theAuthor)
        if (theAuthor.profile) {
            return "http://graph.facebook.com/"+theAuthor.services.facebook.id+"/picture?width=75"
        } else {
            return "http://placekitten.com/g/75/75"
        }
    
    }
});

Template.postItem.events({
  'click .upvote': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);  
    
  },
    'click .downvote': function(e) {
    e.preventDefault();
    Meteor.call('downvote', this._id);  
    
  }
});
