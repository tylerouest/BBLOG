
Template.login.events({
    'click #cancelbtn'(event) {
        bootbox.hideAll();
    },
    'click #loginBtn'(event) {
        Meteor.loginWithPassword($('.login input[type="text"]').val(), $('.login input[type="password"]').val(),function(err){
            if (err){
                sAlert.error(err);
            }else{

                Meteor.call('editLastVisit', {
                }, (err, res) => {
                    if (!err) console.dir(res);
                });
                sAlert.success('Vous êtes connecté !');
                $('#dropDown span.drop-down__name').text(Meteor.user().emails[0].address);
                $('.drop-down').removeClass('drop-down--active');
                bootbox.hideAll();
            }
        })
    },
    'keyup input'(event){
        switch (event.which) {
            case 13:
                //entrée
                Meteor.loginWithPassword($('.login input[type="text"]').val(), $('.login input[type="password"]').val(),function(err){
                    if (err){
                        sAlert.error(err);
                    }else{
                        sAlert.success('Vous êtes connecté !');
                        $('#dropDown span.drop-down__name').text(Meteor.user().emails[0].address);
                        $('.drop-down').removeClass('drop-down--active');
                        bootbox.hideAll();
                    }
                })
                break;
            case 27:
                //échap
                bootbox.hideAll();
                break;


        }
    },
});
Template.login.rendered = function(){

};