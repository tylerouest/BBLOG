import {Accounts} from 'meteor/accounts-base';
catch_err = function(err,e){
    if (typeof err == 'undefined') return;
    let errArr = [];
    let successArr = [];
    switch (err.error) {
        case 403:
            switch (err.reason) {
                case'Username already exists.':
                    msg = "Le pseudo est déjà utilisé";
                    errArr.push(elems.pseudo);
                    break;
                case'Email already exists.':
                    msg = "L'email est déjà utilisé";
                    errArr.push(elems.email);
                    break;
            }
            break;
        case 402:
            msg = "";
            break;
        case 401:
            msg = "";
            break;
        case 400:
            msg = "";
            break;

    }
    for(let i=0;i<errArr.length;i++){
        $(errArr[i]).addClass('error');
    }
    sAlert.error(msg);
};
passData = function (e){
    elems = e.target.parentNode.elements;
    let errArr = [];
    let successArr = [];
    let msgArr = [];
    let pass = true;
    if (elems.password.value == '' || elems.password2.value == ''){
        if (elems.password.value == '') errArr.push(elems.password);
        if (elems.password2.value == '') errArr.push(elems.password2);
        msgArr.push("Vous devez entrer un mot de passe");
        pass = false;
    }else if(elems.password.value != elems.password2.value){
        errArr.push(elems.password2);
        errArr.push(elems.password);
        msgArr.push("Les mots de passe ne correspondent pas");
        pass = false;
    }else{
        successArr.push(elems.password2);
        successArr.push(elems.password);
    }
    if(elems.pseudo.value == ''){
        errArr.push(elems.pseudo);
        msgArr.push("Vous devez entrer un pseudo");
        pass = false;
    }else{
        successArr.push(elems.pseudo);
    }
    if(elems.email.value == ''){
        errArr.push(elems.email);
        msgArr.push("Vous devez entrer une adresse email valide");
        pass = false;
    }else{
        successArr.push(elems.email);
    }
    if(elems.nom.value == ''){
        errArr.push(elems.nom);
        msgArr.push("Vous devez entrer un nom");
        pass = false;
    }else{
        successArr.push(elems.nom);
    }
    if(elems.prenom.value == ''){
        errArr.push(elems.prenom);
        msgArr.push("Vous devez entrer un prénom");
        pass = false;
    }else{
        successArr.push(elems.prenom);
    }
    if(elems.ville.value == ''){
        errArr.push(elems.ville);
        msgArr.push("Vous devez entrer une ville");
        pass = false;
    }else{
        successArr.push(elems.ville);
    }
    console.dir(errArr);
    for(let i=0;i<errArr.length;i++){
        $(errArr[i]).addClass('error');
    }
    for(let i=0;i<successArr.length;i++){
        $(successArr[i]).removeClass('error').addClass('success');
    }
    if (pass){
        let options =  {
            username:elems.pseudo.value,
            email:elems.email.value,
            password:elems.password.value,
            profile: {
                nom: elems.nom.value,
                prenom: elems.prenom.value,
                adresse: elems.adresse.value,
                zipcode: elems.zipcode.value,
                city: elems.ville.value,
                gsm: elems.gsm.value
            }
        }
        Meteor.call('createUserBlog',{
            options
        }, function(err, result) {
            if (err){
                sAlert.error(err);
            }else{
                sAlert.success('Vous êtes enregistré !');
                getLogin();
                bootbox.hideAll();
            }
        });
        /*
        Accounts.createUser({
            username:elems.pseudo.value,
            email:elems.email.value,
            password:elems.password.value,
            profile:{
                nom:elems.nom.value,
                prenom:elems.prenom.value,
                adresse:elems.adresse.value,
                zipcode:elems.zipcode.value,
                city:elems.ville.value,
                gsm:elems.gsm.value
            }
        },function(err){
            if (err){
                catch_err(err);
            }else{
                sAlert.success('Vous êtes enregistré !');
                getLogin();
                bootbox.hideAll();
            }
        })*/
    }else{
        for(let i=0;i<msgArr.length;i++){
            sAlert.error(msgArr[i]);
        }
    }
};
Template.signUp.events({
    'click #cancelbtn'(event) {
        bootbox.hideAll();
    },
    'click #signupBtn'(e) {
        e.preventDefault();
        passData(e);
    },
    'keyup input'(event){
        switch (event.which) {
            case 13:

                break;
            case 27:
                bootbox.hideAll();
        }
    },
});
Template.signUp.rendered = function(){

};