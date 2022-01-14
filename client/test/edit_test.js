Template.editTest.events({
    'mousewheel'(event) {

    },
    'mouseenter .reactionArticle'(event) {

    },
    'click .question'(event) {
        $(event.target).toggleClass('open');
    }

});
Template.editTest.rendered = function () {

};
Template.editTest.helpers({
    'questions': function () {
        return Questions.find({

        });
    },
    'email': function () {

    },
    'profile': function () {

    }
});