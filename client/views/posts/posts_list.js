/*
Template.postsList.helpers({
  posts: function() {
    return Posts.find({}, {sort: {submitted: -1}});
  }
});
*/

Template.postsList.helpers({
  hasMorePosts: function(){
    this.posts.rewind();
    this.posts2.rewind();

    return Router.current().limit() == this.posts.fetch().length;
  }

});
