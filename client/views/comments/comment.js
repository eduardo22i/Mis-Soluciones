Template.comment.helpers({
  submittedText: function() {
      var date = new Date(this.submitted)
      var m_names = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    return date.getDate() + " de " + m_names[date.getMonth()]  + " del " + date.getFullYear();
  },
    authorName : function() {
        //if (this.user().profile.name) {
            //alert(this.user().profile.name)   
        //}
        theAuthor =  Meteor.users.findOne({_id: this.userId}) ;

        if (theAuthor.profile) {
            return theAuthor.profile.name
        } else {
            return "User"
        }
    
    },
     authorPicture : function() {
        //if (this.user().profile.name) {
            //alert(this.user().profile.name)   
        //}
        theAuthor =  Meteor.users.findOne({_id: this.userId}) ;

        console.log(theAuthor)
        if (theAuthor.profile) {
            return "http://graph.facebook.com/"+theAuthor.services.facebook.id+"/picture?width=75"
        } else {
            return "http://placekitten.com/g/75/75"
        }
    
    }
    
});
