EmsgController = BaseController.extend({
    template: 'Emsg',
    findOptions: function() {
    },

    waitOn: function() {
        Meteor.user();
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