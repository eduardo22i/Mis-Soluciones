Template.postPage.helpers({
    comments: function() {
        return Comments.find({postId: this._id});
    },
    steps: function() {
        return Steps.find({postId: this._id});
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
            return "I got another name :)"
        }
    
    },
    authorMail : function() {
        //if (this.user().profile.name) {
            //alert(this.user().profile.name)   
        //}
        theAuthor =  Meteor.users.findOne({_id: this.userId}) ;

        console.log(theAuthor)
        if (theAuthor.services) {
            return theAuthor.services.facebook.email
        } else {
            return "I got another name :)"
        }
    
    },
    authorPicture : function() {
        //if (this.user().profile.name) {
            //alert(this.user().profile.name)   
        //}
        theAuthor =  Meteor.users.findOne({_id: this.userId}) ;
        
        if (theAuthor.services.facebook.id != null) {
            return "http://graph.facebook.com/"+theAuthor.services.facebook.id+"/picture?width=75"
        } else {
            return "http://placekitten.com/g/75/75"
        }
    
    }
    
});

Template.postPage.events({
  'click .vote-up': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);  
    
  },
   'click .vote-down': function(e) {
    e.preventDefault();
    Meteor.call('downvote', this._id);  
    
  }
});
