Template.commentItem.events({
    'mouseenter .control a.delete'(event) {
        $(event.target.parentNode.parentNode).addClass('red');
        let id = event.target.parentNode.parentNode.children[0].attributes['id'].nodeValue;
        $('.commentItem#'+id+' .reponse .commentItem').addClass('red');
    },
    'mouseleave .control a.delete'(event) {
        $(event.target.parentNode.parentNode).removeClass('red');
        let id = event.target.parentNode.parentNode.children[0].attributes['id'].nodeValue;
        $('.commentItem#'+id+' .reponse .commentItem').removeClass('red');
    },
    'mouseenter .control a.reacts'(event) {
        $('.reactions').html('');
        var node = document.createElement("div");
        document.body.appendChild(node);
        UI.render(Template['emoji'], node);
        $(event.target.parentNode.children[4]).html(node);
    },
    'mouseleave .commentItem'(event) {
        $('#emoji').css('display','none');
    },
    'click .control a.reacts'(event) {
        $('#emoji').css('display','none');
        var node = document.createElement("div");
        document.body.appendChild(node);
        UI.render(Template['emoji'], node);
        $(event.target.parentNode.children[4]).html(node);
    },
    'click .control a.emoji'(event) {

    },
    'click .control a.delete'(event) {
        Meteor.call('deleteComment', {
            id:$(event.target.parentNode.parentNode.children[0]).attr('id')
        }, (err, res) => {
            if (err) {
                alert(err);
                sAlert.error(err);
            } else {
                $('.nouveau').html('');
            }
        });
    },
    'click .control a.response'(event) {
        $('.nouveau').html('');
        let node = document.createElement("div");
        document.body.appendChild(node);
        UI.renderWithData(Template['newComment'], null, node);
        $(event.target.parentNode.parentNode.children[3]).html(node);
        $($("#new_comment input:text")[0]).focus();
    }
});
Template.commentItem.rendered = function () {
     if (this.data.notread == "true"){
         Meteor.call('setAsRead', {id: this.data._id});
     }
};

Template.commentItem.helpers({
    'dataArrComRep': function () {
        return Comments.find({parent: this._id});
    },
    'reactions': function () {
        return React.find({id_comment: this._id});
    }
});