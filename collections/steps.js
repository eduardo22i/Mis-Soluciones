
Steps = new Meteor.Collection('steps');

Steps.allow({
  update: ownsDocument
});

Meteor.methods({
  step: function(stepAttributes) {
      
    var user = Meteor.user();
    var post = Posts.findOne(stepAttributes.postId);
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to make steps");

    if (!stepAttributes.label)
      throw new Meteor.Error(422, 'Please write some content');

    if (!stepAttributes.postId)
      throw new Meteor.Error(422, 'You must step on a post');

    step = _.extend(_.pick(stepAttributes, 'postId', 'label', 'status'), {
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime()
    });

    // update the post with the number of steps
    //Posts.update(step.postId, {$inc: {stepsCount: 1}});

    step._id = Steps.insert(step);

      return step._id;
  }
});
