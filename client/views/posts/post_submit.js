Template.postSubmit.events({
    
    'submit form': function(e) {
        e.preventDefault();
        
        var stepsCount = Number($(e.target).find('[name=stepsCount]').val());
        var steps = [];
        
        
        
        var post = {
        
            title: $(e.target).find('[name=title]').val(),
            problem: $(e.target).find('[name=problem]').val(),
            solution: $(e.target).find('[name=solution]').val(),
            steps: steps
        }
        
        
        
        Meteor.call('post', post, function(error, id) {
            if (error)
                return alert(error.reason);
            
            //Meteor.call('addstep', id);
            
            var stepsCount = Number($(e.target).find('[name=stepsCount]').val());
                        

            for (var i = 1; i<= stepsCount  ; i++){
                //var actStep = document.getElementsByName("step"+(i))[0].value;
                alert(id + " "+ $(e.target).find('[name=step'+ i+']').val());
                var step = {
                    label:  $(e.target).find('[name=step'+ i+']').val(),
                    status: 0,
                    postId: id
                }
                
                 Meteor.call('step', step, function(error, id) {
                    if (error){
                        throwError(error.reason);
                    } else {
                        aler("ok" + id);   
                    }
                 });
            }
            Router.go('postPage', {_id: id});
        });

    },
    
    'click #addMore': function(e){
        e.preventDefault();
        addStep();
    }
    
});
