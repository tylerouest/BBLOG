Meteor.methods({
    'edit_question'({ question,reponsea,reponseb,vala,valb,typea,typeb,index,id }) {
        var loggedInUser = Meteor.user();
        if (!loggedInUser) {
            throw new Meteor.Error(401, 'Vous devez vous connecter!');
        }else{
            if (!Roles.userIsInRole(loggedInUser, ['admin','manage-users']))
                throw new Meteor.Error('unauthorized', "Vous n'avez pas les autorisations necessaires");
        }

        return Questions.update({_id:id},{
            $set:{
                numQuestion:index,
                question:question,
                reponseA:reponsea,
                reponseB:reponseb,
                valeurA:vala,
                valeurB:valb,
                typeA:typea,
                typeB:typeb,
            }
        });
    },
    'add_question'({question,reponsea,reponseb,vala,valb,typea,typeb,index}) {
        var loggedInUser = Meteor.user();
        if (!loggedInUser) {
            throw new Meteor.Error(401, 'Vous devez vous connecter!');
        }else{
            if (!Roles.userIsInRole(loggedInUser, ['admin','manage-users']))
                throw new Meteor.Error('unauthorized', "Vous n'avez pas les autorisations necessaires");
        }

        return Questions.insert({
            numQuestion:index,
            question:question,
            reponseA:reponsea,
            reponseB:reponseb,
            valeurA:vala,
            valeurB:valb,
            typeA:typea,
            typeB:typeb,
        });
    },
    'del_question'({ id }) {
        var loggedInUser = Meteor.user();
        if (!loggedInUser) {
            throw new Meteor.Error(401, 'Vous devez vous connecter!');
        }else{
            if (!Roles.userIsInRole(loggedInUser, ['admin','manage-users']))
                throw new Meteor.Error('unauthorized', "Vous n'avez pas les autorisations necessaires");
        }
        Questions.remove(id);
    }
});