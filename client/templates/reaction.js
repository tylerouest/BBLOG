Template.reaction.rendered = function () {
    this.autorun(() => {
        Meteor.subscribe('reactionsComment  ', this.data._id);
    });
};
Template.reaction.helpers({
    'nbReaction': function () {
        return React.find({id_comment: this._id}).count();
    },
    'listReaction1': function () {
        return React.find({id_comment: this._id,valeur:'1'});
    },
    'listReaction2': function () {
        return React.find({id_comment: this._id,valeur:'2'});
    },
    'listReaction3': function () {
        return React.find({id_comment: this._id,valeur:'3'});
    },
    'listReaction4': function () {
        return React.find({id_comment: this._id,valeur:'4'});
    },
    'listReaction5': function () {
        return React.find({id_comment: this._id,valeur:'5'});
    },
    'listReaction6': function () {
        return React.find({id_comment: this._id,valeur:'6'});
    },

    'listReactions1': function () {
        return React.find({id_comment: this._id,valeur:'1'}).count();
    },
    'listReactions2': function () {
        return React.find({id_comment: this._id,valeur:'2'}).count();
    },
    'listReactions3': function () {
        return React.find({id_comment: this._id,valeur:'3'}).count();
    },
    'listReactions4': function () {
        return React.find({id_comment: this._id,valeur:'4'}).count();
    },
    'listReactions5': function () {
        return React.find({id_comment: this._id,valeur:'5'}).count();
    },
    'listReactions6': function () {
        return React.find({id_comment: this._id,valeur:'6'}).count();
    }
});