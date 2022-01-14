Template.mess_item.events({
    'mousewheel'(event) {

    },
    'mouseenter .reactionArticle'(event) {

    },
    'mouseleave .pageArticle'(event) {

    }

});
Template.mess_item.rendered = function () {
    let elem_cont = $('.emsgscroll')
    $('.emsgscroll').scrollTop($('.emsgscroll')[1].scrollHeight+100);
    //setRead(this.data.chatId,this.data._id);
};
Template.mess_item.helpers({
    'style': function () {
        if (this.userId == Meteor.user()._id) return 'owner';
        return;
    },
    'flagHelp': function () {
        if (this.userId != Meteor.user()._id) return;
        if (this.flag == 'notread'){
            return 'envoyé'
        }else{
            return 'vu'+this.flag;
        }
    },
    'user': function () {

    },
    'email': function () {

    },
    'profile': function () {

    }
});