import truncate from 'truncate-html';
Meteor.methods({

    'removeArticle'({ id }) {
        var loggedInUser = Meteor.user();
        if (!loggedInUser) {
            throw new Meteor.Error(401, 'Vous devez vous connecter!');
        }else{
            if (!Roles.userIsInRole(loggedInUser, ['admin','manage-users']))
                throw new Meteor.Error('unauthorized', "Vous n'avez pas les autorisations necessaires");
        }
        //Posts.remove(id);
    },
    'commentThis'({body,parent,parentArticle}) {
        let user = Meteor.user();
        if (!user)
            throw new Meteor.Error(401, 'Vous devez vous connecter!');

        return Comments.insert({
            body:body,
            parent:parent,
            parentArticle:parentArticle,
            notread:'true',
            userId:this.userId,
            author: user.emails[0].address,
            createdAt:new Date()
        });
    },
    'setReactionPage'({id_article,pseudo,valeur}) {
        let user = Meteor.user();
        if (!user)
            throw new Meteor.Error(401, 'Vous devez vous connecter!');
        let data = React.find({id_article:id_article,userId:this.userId,notread:'page'}).fetch();
        if(data.length != 0){
            return React.update({id_article:id_article,userId:this.userId,notread:'page'},{
                $set:{
                    valeur:valeur,
                    createdAt:new Date()
                }
            });
        }else{
            return React.insert({
                id_article:id_article,
                pseudo:pseudo,
                valeur:valeur,
                notread:'page',
                userId:this.userId,
                author: user.emails[0].address,
                createdAt:new Date()
            });
        }
    },
    'setReaction'({id_article,id_comment,pseudo,valeur}) {
        let user = Meteor.user();
        if (!user)
            throw new Meteor.Error(401, 'Vous devez vous connecter!');
        let data = React.find({id_comment:id_comment,userId:this.userId}).fetch();
        if(data.length != 0){
            return React.update({id_comment:id_comment,userId:this.userId},{
                $set:{
                    valeur:valeur,
                    createdAt:new Date()
                }
            });
        }else{
            return React.insert({
                id_comment:id_comment,
                id_article:id_article,
                pseudo:pseudo,
                valeur:valeur,
                userId:this.userId,
                author: user.emails[0].address,
                createdAt:new Date()
            });
        }
    },
    'setAsRead'({id}) {
        let user = Meteor.user();
        if (!user)
            throw new Meteor.Error(401, 'Vous devez vous connecter!');

        return Comments.update({_id:id},{
            $set:{notread:'false'}
        });
    },
    'deleteComment'({ id }) {
        var loggedInUser = Meteor.user();
        if (!loggedInUser) {
            throw new Meteor.Error(401, 'Vous devez vous connecter!');
        }else{
            if (!Roles.userIsInRole(loggedInUser, ['admin','manage-users']))
                throw new Meteor.Error('unauthorized', "Vous n'avez pas les autorisations necessaires");
        }
        Comments.remove(id);
        Comments.remove({parent:id});
        React.remove({id_comment:id});
    },

    'addArticle'({titre,html,url_img,url_img2,type,typedesc}) {
        var loggedInUser = Meteor.user();
        if (!loggedInUser) {
            throw new Meteor.Error(401, 'Vous devez vous connecter!');
        }else{
            if (!Roles.userIsInRole(loggedInUser, ['admin','manage-users']))
                throw new Meteor.Error('unauthorized', "Vous n'avez pas les autorisations necessaires");
        }

        return Posts.insert({
            title:titre,
            body:html,
            desc:truncate(html, 1000),
            url_img:url_img,
            url_img2:url_img2,
            type:type,
            typedesc:typedesc,
            userId:this.userId,
            author: loggedInUser.emails[0].address,
            createdAt:new Date()
        });
    },
    'editArticle'({titre,html,url_img,url_img2,id,type,typedesc}) {
        var loggedInUser = Meteor.user();
        if (!loggedInUser) {
            throw new Meteor.Error(401, 'Vous devez vous connecter!');
        }else{
            if (!Roles.userIsInRole(loggedInUser, ['admin','manage-users']))
                throw new Meteor.Error('unauthorized', "Vous n'avez pas les autorisations necessaires");
        }




        return Posts.update({_id:id},{
            $set:{
                title:titre,
                body:html,
                desc:truncate(html, 1000),
                url_img:url_img,
                url_img2:url_img2,
                type:type,
                typedesc:typedesc,
                userId:this.userId,
                author: loggedInUser.emails[0].address,
                createdAt:new Date()
            }
        });
    },
    saveFile: function(blob, name, path, encoding) {
        var path = '/users/ludo/desktop/binariesblog/public/images/upload/', fs = Npm.require('fs'),
            name = cleanName(name || 'file'), encoding = encoding || 'binary';
        // TODO Add file existance checks, etc...

        fs.writeFile(path + name, blob, encoding, function(err) {
            if (err) {
                return err;
                throw (new Meteor.Error(500, 'Impossible de sauvegarder le fichier.', err));
            } else {
                console.log('Le fichier ' + name + ' (' + encoding + ') a été sauvegardé à cet emplacement ' + path);
                return true;
            }
        });
        function cleanName(str) {
            return str.replace(/\.\./g,'').replace(/\//g,'');
        }
    }
});