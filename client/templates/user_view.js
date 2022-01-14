Template.userView.events({
    'mousewheel'(event) {

    },
    'click .emsg_new'(event) {
        let uid = event.target.dataset.user
        newConversation(uid);
    },
    'mouseleave .pageArticle'(event) {

    }

});
Template.userView.rendered = function () {

};
Template.userView.helpers({
    'user': function () {

    },
    'email': function () {

    },
    'profile': function () {

    }
});