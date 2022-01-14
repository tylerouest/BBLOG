Template.emsg.events({
    'mousewheel'(event) {

    },
    'mouseenter .reactionArticle'(event) {

    },
    'mouseleave .pageArticle'(event) {

    }

});
Template.emsg.rendered = function () {
    $(' .emsg_center').css('max-height',(window.innerHeight - 130)+'px')
    $(' .emsg_left').css('max-height',(window.innerHeight - 50)+'px')
    $(' .emsg_right').css('max-height',(window.innerHeight - 130)+'px')
};
Template.emsg.helpers({
    'user': function () {

    },
    'email': function () {

    },
    'profile': function () {

    }
});
$( window ).resize(function() {
    $(' .emsg_center').css('max-height',(window.innerHeight - 130)+'px')
    $(' .emsg_left').css('max-height',(window.innerHeight - 50)+'px')
    $(' .emsg_right').css('max-height',(window.innerHeight - 130)+'px')
});