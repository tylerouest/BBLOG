Template.messages_list.events({
    'click .link_more'(event) {
        Blaze.remove(Blaze.getView(Template.instance().$('.conversation')[0]))
        event.stopPropagation();
    }
});
Template.messages_list.rendered = function (e) {
    this.autorun(function() {
        Meteor.subscribe('messages', Template.instance().data._id, 0, msgInConv);
    });
};
Template.messages_list.helpers({
    'messages': function () {
        return Messages.find({chatId:this._id});
    }
});
