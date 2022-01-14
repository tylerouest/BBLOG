MainPageController = BaseController.extend({
    template: 'postsList',

    findOptions: function() {

    },

    waitOn: function() {

    },
    data: function(){
        Posts.find();
    }
});

