Notifications = new Meteor.Collection('notifications');

Notifications.allow({
  update: ownsDocument
});

createCommentNotification = function(comment) {
  var post = Posts.findOne(comment.postId);
  /*
  var commentsNot = Comments.find({postId: post._id}, {userId: 1}).fetch()
  var b = {};

  for (i = 0; i < Comments.find({postId: post._id}, {userId: 1}).count(); i ++) {

    b[commentsNot[i].userId] = commentsNot[i].userId;


  }

  b[post.userId] = post.userId;


  usersIds = [];
  for (var key in b) {
    usersIds.push(key);
  }
  //alert(Meteor.user()._id);
    */
    
    usersIds = [];
 var usersIds = Subscriptions.find({postId: post._id}).fetch()

    
  for ( i = 0; i < usersIds.length;  i ++) {

    if (usersIds[i].userId !== Meteor.user()._id) {
        Notifications.insert({
        userId: usersIds[i].userId,
        postId: post._id,
        commentId: comment._id,
        commenterName: comment.author,
        read: false,
        commenterId:Meteor.user()._id
        });
    }
  }
    
    
};
