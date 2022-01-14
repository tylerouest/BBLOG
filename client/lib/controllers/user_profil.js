UserProfilController = BaseController.extend({
    template: 'userProfil',

    waitOn: function(){
        Meteor.subscribe('pubUserProfil',this.params._id);
    },
    data: function() {
        return Meteor.users.findOne({_id:this.params._id});
    }
});