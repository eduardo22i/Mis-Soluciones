Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  //waitOn: function() { return Meteor.subscribe('posts'); }
/*
  waitOn: function() {
    return [Meteor.subscribe('posts'), Meteor.subscribe('comments'), Meteor.subscribe('notifications')];
  }

*/
  waitOn: function() {
    return [Meteor.subscribe('notifications'), Meteor.subscribe('subscriptions') ]
  }

});


PostsListController = RouteController.extend({
  template: 'postsList',
  increment: 3,
  limit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.limit()};
  },
  onBeforeAction: function() {
    return Meteor.subscribe('posts', this.findOptions());
  },
  posts: function() {
    //alert("ok");
    return Posts.find({}, {sort: { submitted: -1, _id: -1 } } );
  },
  posts2: function() {
    return Posts.find({}, {sort: {votes: -1, submitted: -1, _id: -1}});
  },
  data: function() {
    var hasMore = this.posts().count() === this.limit();
    //var nextPath = this.route.path({postsLimit: this.limit() + this.increment});
    return {
      posts: this.posts(),
      posts2: this.posts2(),
      nextPath: hasMore ? this.nextPath() : null
    };
  }
});




NewPostsListController = PostsListController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.newPosts.path({postsLimit: this.limit() + this.increment})
  }
});

BestPostsListController = PostsListController.extend({
  sort: {votes: -1, submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.bestPosts.path({postsLimit: this.limit() + this.increment})
  }
});





Router.map(function() {
  this.route('home', {
    path: '/',
    controller: NewPostsListController
  });

  this.route('newPosts', {
    path: '/new/:postsLimit?',
    controller: NewPostsListController
  });

  this.route('bestPosts', {
    path: '/best/:postsLimit?',
    controller: BestPostsListController
  });

  this.route('postPage', {
    path: '/posts/:_id',
    waitOn: function() {
      return [
        Meteor.subscribe('singlePost', this.params._id),
        Meteor.subscribe('comments', this.params._id),
        Meteor.subscribe('steps', this.params._id),
      ];
    },
    data: function() {
          return Posts.findOne(this.params._id);
    }
  });

  this.route('postEdit', {
    path: '/posts/:_id/edit',
    progress: {enabled: false},
    waitOn: function() {
      return [
          Meteor.subscribe('singlePost', this.params._id),
          Meteor.subscribe('steps', this.params._id),
      ];
    },
    data: function() { return Posts.findOne(this.params._id); }
  });

  this.route('postSubmit', {
      path: '/submit',
      progress: {enabled: false}
  });
    
    
    
    this.route('stepPage', {
        path: '/steps/:_id',
        waitOn: function() {
            return Meteor.subscribe('singleStep', this.params._id);
        },
        data: function() {
            console.log(Steps.findOne(this.params._id))
            return Steps.findOne(this.params._id);
        }
    });
    
    
    
});


var requireLogin = function() {
  if (! Meteor.user()) {

    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');

    this.stop();
  }
}

//Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
Router.onBeforeAction(function() { clearErrors() });