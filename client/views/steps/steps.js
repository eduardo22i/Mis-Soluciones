Template.myStep.helpers({
  submittedText: function() {
    return new Date(this.submitted).toString();
  },
    stepStatus: function() {
        if (this.status == 1) {
            return "status-done";
        } else {
            return "status-pending";
        }
    },
    stepStatusText: function() {
        if (this.status == 1) {
            return "Hecho";
        } else {
            return "Pendiente";
        }
    }
 
});

Template.myStep.events({

    'click a': function(e) {
        //console.log(this._id);
        var step = Steps.find( { _id: this._id }).fetch()[0];        
        if (step.status == 1) {
            Steps.update(this._id, {$set: {status: 0}});
        }else {
            Steps.update(this._id, {$set: {status: 1}});
        }
        

    }
});
