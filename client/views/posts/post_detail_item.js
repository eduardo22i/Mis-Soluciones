
Template.postsList.helpers({
  posts: function () {
    return Posts.find();
  }
});

Template.postDetailItem.helpers({
  ownPost: function() {
    return this.userId == Meteor.userId();
  },
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  date: function ()  {
    return new Date(this.submitted);
  },
  upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return ' disable ';
    } else {
      return 'upvotable voted-yes';
    }
  } , 
    
    authorName : function() {
        //if (this.user().profile.name) {
            //alert(this.user().profile.name)   
        //}
        theAuthor =  Meteor.users.findOne({_id: this.userId}) ;

        console.log(theAuthor)
        if (theAuthor.profile) {
            return theAuthor.profile.name
        } else {
            return "I got another name :)"
        }
    
    },
    authorPicture : function() {
        //if (this.user().profile.name) {
            //alert(this.user().profile.name)   
        //}
        theAuthor =  Meteor.users.findOne({_id: this.userId}) ;

        console.log(theAuthor)
        if (theAuthor.services) {
            return "http://graph.facebook.com/"+theAuthor.services.facebook.id+"/picture?width=75"
        } else {
            return "http://placekitten.com/g/75/75"
        }
    
    }

});

Template.postDetailItem.events({
  'click .upvote': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);
  }
});
