Meteor.publish('posts', function(options) {
  return Posts.find({}, options);
  //return Posts.find();
});

Meteor.publish('posts2', function(options) {
  return Posts.find({}, options);
  //return Posts.find();
});


Meteor.publish('singlePost', function(id) {
  return id && Posts.find(id);
});

Meteor.publish('comments', function(postId) {
  return Comments.find({postId: postId});
});

Meteor.publish('steps', function(postId) {
  return Steps.find({postId: postId});
});

Meteor.publish('singleStep', function(stepId) {
  return Steps.find(stepId);
});



Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId});
});

Meteor.publish('subscriptions', function() {
  return Subscriptions.find();
});


Meteor.publish('aUser', function() {
  return Meteor.users.find({}, {fields: {'id': 1, 'emails.address' : 1,'profile.name' : 1 ,'services.facebook.email': 1 , 'services.facebook.id': 1 }});
});

Meteor.publish("currentAccessToken", function(){
  return Meteor.users.find(this.userId, {fields: {'services.facebook.email': 1 , 'emails.address' : 1, 'services.facebook.id': 1}});
});
