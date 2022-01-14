Template.list_conv.events({
    'mousewheel'(event) {

    },
    'mouseenter .reactionArticle'(event) {

    },
    'mouseleave .pageArticle'(event) {

    }

});
Template.list_conv.rendered = function () {

};
Template.list_conv.helpers({
    'conversations_list': function () {
        return Conversations.find({}
        );
    },
    'id': function () {
        return Meteor.user()._id;
    },
    'profile': function () {

    }
});
getMessages = function(cid){
    $('.emsg_center').html('');
    UI.renderWithData(Template.list_mess, function(){return {_id:cid}}, $('.emsg_center')[0]);
}