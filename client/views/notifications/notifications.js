Template.notifications.helpers({
  notifications: function() {
    return Notifications.find({userId: Meteor.userId(), read: false});
  },
  notificationCount: function(){
    return Notifications.find({userId: Meteor.userId(), read: false}).count();
  }
});

Template.notification.helpers({
  notificationPostPath: function() {
    return Router.routes.postPage.path({_id: this.postId});
  },
    authorName : function() {
        //alert(this.commenterId)
        
        theAuthor =  Meteor.users.findOne({_id: this.commenterId}) ;
        if (theAuthor.profile) {
            return theAuthor.profile.name
        } else {
            return "User"
        }
    
    }
})

Template.notification.events({
  'click a': function() {
    Notifications.update(this._id, {$set: {read: true}});
  }
});



Template.notificationsCountPanel.helpers({
  notificationCount: function(){
    return Notifications.find({userId: Meteor.userId(), read: false}).count() > 99 ? 99 : Notifications.find({userId: Meteor.userId(), read: false}).count();
  }
});


Template.notificationsCountPanel.events({
   'click #notificationCountAndName' : function(e) {
      var notfsDisplay = document.getElementById("notificationWindow");
       if (notfsDisplay.style.display != "block") {
           notfsDisplay.style.display = "block";
       } else {
           notfsDisplay.style.display = "none";
       }
      
   }
});

