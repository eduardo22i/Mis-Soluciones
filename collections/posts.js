Posts = new Meteor.Collection('posts');

Posts.allow({
  update: ownsDocument,
  remove: ownsDocument
});
/*
Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'problem', 'solution', 'title').length > 0);
  }
}
           */

Meteor.methods({
  post: function(postAttributes) {
    var user = Meteor.user(),
      postWithSameLink = Posts.findOne({url: postAttributes.url});

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to post new stories");

    // ensure the post has a title
    if (!postAttributes.title)
      throw new Meteor.Error(422, 'Please fill in a headline');

    // check that there are no previous posts with the same link
    if (postAttributes.url && postWithSameLink) {
      throw new Meteor.Error(302,
        'This link has already been posted',
        postWithSameLink._id);
    }

    // pick out the whitelisted keys
    var post = _.extend(_.pick(postAttributes, 'title', 'problem', 'solution', 'steps'), {
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime(),
      commentsCount: 0,
      upvoters: [],
        downvoters: [],
      votes: 0,
      downvotes: 0,
        
    });

    var postId = Posts.insert(post);

    return postId;
  },
    addstep: function (postId) {
        Posts.update({
            _id: postId,
             $push: { steps: "ser humano" }
        });
    
    },
  upvote: function(postId) {
    var user = Meteor.user();
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to upvote");

    var post = Posts.findOne(postId);
    if (!post)
      throw new Meteor.Error(422, 'Post not found');

    if (_.include(post.upvoters, user._id)) {
        //alert("dm");
        
        Posts.update({
            _id: postId,
            //upvoters: {$ne: user._id}
        }, {
            $pull: {upvoters: user._id},
            $inc: {votes: -1}
        });
      
        //throw new Meteor.Error(422, 'Already upvoted this post');
      
    } else {
        if (_.include(post.downvoters, user._id)) {
        
        Posts.update({
            _id: postId,
            //downvoters: {$e: user._id}
        }, {
            $pull: {downvoters: user._id},
            $inc: {downvotes: -1}
        });
      
        //throw new Meteor.Error(422, 'Already upvoted this post');
      
        }
        createSubscription(postId);

        Posts.update({
            _id: postId,
            upvoters: {$ne: user._id}
        }, {
            $addToSet: {upvoters: user._id},
            $inc: {votes: 1}
        });
      
    }

      
  } ,
    
    downvote: function(postId) {
    var user = Meteor.user();
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to upvote");

    var post = Posts.findOne(postId);
    if (!post)
      throw new Meteor.Error(422, 'Post not found');
        
    if (_.include(post.downvoters, user._id)) {
        
        Posts.update({
            _id: postId,
            //downvoters: {$e: user._id}
        }, {
            $pull: {downvoters: user._id},
            $inc: {downvotes: -1}
        });
      
        //throw new Meteor.Error(422, 'Already upvoted this post');
      
    } else {
        
        if (_.include(post.upvoters, user._id)) {
        //alert("dm");
        
            Posts.update({
                _id: postId,
                //upvoters: {$ne: user._id}
            }, {
                $pull: {upvoters: user._id},
                $inc: {votes: -1}
            });
      
        //throw new Meteor.Error(422, 'Already upvoted this post');
      
        }
        
        Posts.update({
            _id: postId,
            downvoters: {$ne: user._id}
        }, {
            $addToSet: {downvoters: user._id},
            $inc: {downvotes: 1}
        });
      
    }

      
  }
    
});
