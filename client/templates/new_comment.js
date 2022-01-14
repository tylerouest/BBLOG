Template.comments.events({
    'keyup input'(event){
        switch (event.which) {
            case 13:
                //entrée
                event.preventDefault();
                $(event.target).toggleClass('load');
                let html = $(event.target.parentNode.children[0]).val();
                let err = false;
                let parent = $(event.target.parentNode.parentNode.parentNode).attr('idcomment');
                $('.err').removeClass('err');
                if (html == ""){
                    sAlert.error('Vous devez entrer le corps de votre article avant de le publier');
                    $('#commentContent').addClass('err');
                    err = true;
                    return;
                }
                Meteor.call('commentThis', {
                    body: html,
                    parent: parent,
                    parentArticle: $('.pageArticle').attr('idArticle')
                }, (err, res) => {
                    if (err) {
                        alert(err);
                        sAlert.error(err);
                    } else {
                        let uid = $(event.target).closest('.nouveau').attr('uid') || this.userId;
                        let id = $(event.target).closest('.nouveau').attr('id') || this._id;
                        if (typeof parent == 'undefined'){
                            saveNotification(uid,'addComment',location.origin+location.pathname+'#'+res,id,res,Meteor.user().profile.img);
                        }else{
                            saveNotification(uid,'reponseComment',location.origin+location.pathname+'#'+res,id,res,Meteor.user().profile.img);
                        }


                        $('#'+res)[0].scrollIntoView();
                        $('.nouveau').html('');
                    }
                });
                $('.comment input').val('');
                break;
            case 27:
                //échap
                break;


        }
    }
});
