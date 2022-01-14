

Template.parametres.events({
    'mousewheel'(event) {

    },
    'mouseenter .reactionArticle'(event) {

    },
    'click #edit_test'(event) {
        Router.go('/edit-test');
    },
    'click #view_test'(event) {
        Router.go('/test');
    }

});
Template.parametres.rendered = function () {

};
Template.parametres.helpers({
    'user': function () {

    },
    'email': function () {

    },
    'profile': function () {

    }
});