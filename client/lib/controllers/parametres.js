parametresController = BaseController.extend({
    template: 'parametres',
    findOptions: function() {
    },

    waitOn: function() {

    },
    data: function(){

    },
    onBeforeAction: function(){
        if (!Meteor.user()) {
            if (Meteor.loggingIn()) {
                this.render(this.loadingTemplate);
            } else {
                this.render('accessDenied');
            }
        } else {
            this.next();
        }
    }
});