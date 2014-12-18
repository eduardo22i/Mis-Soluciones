Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = this._id;

    var postProperties = {
        title: $(e.target).find('[name=title]').val(),
        problem: $(e.target).find('[name=problem]').val(),
        solution: $(e.target).find('[name=solution]').val()
    }

    Posts.update(currentPostId, {$set: postProperties}, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
      } else {
        Router.go('postPage', {_id: currentPostId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      var currentPostId = this._id;
      Posts.remove(currentPostId);
      Router.go('home');
    }
  }
});

Template.postEdit.helpers({
    comments: function() {
        return Comments.find({postId: this._id});
    },
    steps: function() {
        return Steps.find({postId: this._id});
    }
    
});
