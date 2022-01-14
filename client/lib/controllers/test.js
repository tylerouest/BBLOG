TestController = BaseController.extend({
    findOptions: function() {
    },

    waitOn: function() {
        Meteor.subscribe('pubQuestions');
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