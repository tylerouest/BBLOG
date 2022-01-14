Template.question.events({
    'mousewheel'(event) {

    },
    'mouseenter .reactionArticle'(event) {

    },
    'mouseleave .pageArticle'(event) {

    }

});
Template.question.rendered = function () {

};
Template.question.helpers({
    'question': function () {
        return this.question;
    },
    'reponsea': function () {
        return this.reponseA;
    },
    'reponseb': function () {
        return this.reponseB;
    }
});