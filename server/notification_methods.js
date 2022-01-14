Meteor.methods({
    'setNotification'({to,subject,url,idarticle,hash,img}) {
        let user = Meteor.user();
        let label = {};
        if (!user)
            throw new Meteor.Error(401, 'Vous devez vous connecter!');

            switch (subject) {
                case'addComment':
                    label.un = "a ajouté un nouveau";
                    label.deux = "commentaire";
                    label.trois = "sur votre";
                    label.quatre = "article";
                    break;
                case'reponseComment':
                    label.un = "a répondu à votre";
                    label.deux = "commentaire";
                    label.trois = "";
                    label.quatre = "";
                    break;
                case'removeComment':
                    label.un = "a supprimé son";
                    label.deux = "commentaire";
                    label.trois = "sur votre";
                    label.quatre = "article";
                    break;
                case'editComment':
                    label.un = "a modifié son";
                    label.deux = "commentaire";
                    label.trois = "sur votre";
                    label.quatre = "article";
                    break;
                case'addArticle':
                    label.un = "a ajouté un nouvel";
                    label.deux = "article";
                    label.trois = "";
                    label.quatre = "";
                    break;
                case'removeArticle':
                    label.un = "a supprimé";
                    label.deux = "l'article";
                    label.trois = "";
                    label.quatre = "";
                    break;
                case'editArticle':
                    label.un = "a édité";
                    label.deux = "l'article";
                    label.trois = "";
                    label.quatre = "";
                    break;
                case'reactionComment':
                    label.un = "a réagit à votre";
                    label.deux = "commentaire";
                    label.trois = "sur";
                    label.quatre = "l'article";
                    break;
                case'reactionPage':
                    label.un = "a réagit à votre";
                    label.deux = "article";
                    label.trois = "";
                    label.quatre = "";
                    break;
                case'message':
                    label.un = "vous a envoyé un nouveau";
                    label.deux = "message";
                    label.trois = "";
                    label.quatre = "";
                    break;
                default:
                    label.un = 'error:no subject notif';
            }


        return centre_notifications.insert({
            to:to,
            subject:label,
            url:url,
            hash:hash,
            parentId:idarticle,
            img:img,
            userId:user._id,
            author: user.emails[0].address,
            createdAt:new Date()
        });
    },
    'delNotification'({id}) {
        let user = Meteor.user();
        if (!user)
            throw new Meteor.Error(401, 'Vous devez vous connecter!');
        return centre_notifications.remove(id);
    }
});