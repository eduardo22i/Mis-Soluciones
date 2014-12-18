Subscriptions = new Meteor.Collection('subscriptions');

createSubscription = function(comment) {
    //alert("ok");
  //subscribe: function(commentAttributes) {
  //subscribe: function(comment) {
   
    var user = Meteor.userId();
    var post = Posts.findOne(comment);
    // ensure the user is logged in
    
    var postWithSameLink = Subscriptions.findOne({userId: user, postId: post._id});

      
    if (!user)
      throw new Meteor.Error(401, "You need to login to subscribe");
    
    
    if (postWithSameLink) {
        //throw new Meteor.Error(401, "You need to login to EXIST");
    } else {
            

     subscrition = Subscriptions.insert({
        userId: user,
        postId: post._id,
        submitted: new Date().getTime()
        });
    
    // update the post with the number of comments

        return subscrition;
    }
  //}
}