Template.loggin.events({
  'submit form': function(e) {
    //e.preventDefault();
    Meteor.loginWithPassword(
      $(e.target).find('[name=username]').val(),
      $(e.target).find('[name=password]').val(),
      console.log("Welcome?")
    );
  }
});
