import { Accounts } from 'meteor/accounts-base'

Roles.createRole('admin', {unlessExists: true});
Roles.createRole('moderateur', {unlessExists: true});
Roles.createRole('user', {unlessExists: true});

var users = [
    {name:"Normal User",email:"starlac5000@gmail.com",roles:[]},
    {name:"View-Secrets User",email:"starlac4000@gmail.com",roles:['view-secrets']},
    {name:"Manage-Users User",email:"starlac3000@gmail.com",roles:['manage-users']},
    {name:"Admin User",email:"starlac2000@gmail.com",roles:['admin']}
];

users.forEach(function (user) {
return;
    var id;

        id = Accounts.createUser({
            username: user.name,
            email: user.email,
            password: 'apple1',
            profile: {
                nom: '',
                prenom: '',
                adresse: '',
                zipcode: '',
                city: '',
                gsm: '',
                role: [user.roles],
                type:''
            }
        });

        if (Meteor.roleAssignment.find({'user._id': id}).count() === 0) {
            user.roles.forEach(function (role) {
                Roles.createRole(role, {unlessExists: true});
            });
            // Need _id of existing user record so this call must come after `Accounts.createUser`.
            Roles.addUsersToRoles(id, user.roles);
        }

});


Meteor.methods({
    'createUserBlog'({options}) {
        let id = Accounts.createUser({
            username:options.username,
            email:options.email,
            password:options.password,
            role:[user.roles],
            profile: {
                nom: options.profile.nom,
                prenom: options.profile.prenom,
                adresse: options.profile.adresse,
                zipcode: options.profile.zipcode,
                city: options.profile.city,
                gsm: options.profile.gsm,
                role: [],
                type:''
            }
        });
        if (options.email['0'].address == "starlac2000@gmail.com"){
            Roles.addUsersToRoles(id, ['admin']);
        }else{
            Roles.addUsersToRoles(id, ['user']);
        }

        return  id;
    },
    'setRoles'({uid, roles}) {

        var loggedInUser = Meteor.user();
        if (!loggedInUser) {
            throw new Meteor.Error(401, 'Vous devez vous connecter!');
        }else{
            if (!Roles.userIsInRole(loggedInUser, ['admin','manage-users']))
                throw new Meteor.Error('unauthorized', "Vous n'avez pas les autorisations necessaires");
            return Roles.addUsersToRoles(uid, [''+roles+'']);
        }
    },
    'setUsername'({new_username}) {
        let user = Meteor.user();
        if (!user)
            throw new Meteor.Error(401, 'Vous devez vous connecter!');
        return Accounts.setUsername(user._id, new_username)
    },
    'setType'({new_username}) {
        let user = Meteor.user();
        if (!user)
            throw new Meteor.Error(401, 'Vous devez vous connecter!');
        return Accounts.setUsername(user._id, new_username)
    },
    'addEmail'({usr_id,email,verified}) {
        let user = Meteor.user();
        if (!user)
            throw new Meteor.Error(401, 'Vous devez vous connecter!');
        return Accounts.addEmail(this.userId, email, verified);
    },
    'removeEmail'({usr_id,email}) {
        let user = Meteor.user();
        if (!user)
            throw new Meteor.Error(401, 'Vous devez vous connecter!');
        
        return Accounts.removeEmail(this.userId, email);
    },
    'verifyEmailBlog'({token}) {
        return Accounts.verifyEmail(token);
    },
    'findUserByUsername'({username,options}) {
        return Accounts.findUserByUsername(username, options);
    },
    'findUserByEmail'({email,options}) {
        return Accounts.findUserByEmail(email, options);
    },
    'changePasswordBlog'({old_pass,new_pass}) {
        let user = Meteor.user();
        if (!user)
            throw new Meteor.Error(401, 'Vous devez vous connecter!');
        
        return Accounts.changePassword(old_pass, new_pass);
    },
    'forgotPasswordBlog'({options}) {
        return Accounts.forgotPassword(options);
    },
    'resetPasswordBlog'({token,new_pass}) {
        return Accounts.resetPassword(token, new_pass)
    },
    'setPassword'({usr_id,new_pass,options}) {
        let user = Meteor.user();
        if (!user)
            throw new Meteor.Error(401, 'Vous devez vous connecter!');
        
        return Accounts.setPassword(this.userId, new_pass, options)
    },
    'sendResetPasswordEmail'({usr_id,email,extraTokenData}) {
        let user = Meteor.user();
        if (!user)
            throw new Meteor.Error(401, 'Vous devez vous connecter!');
        
        return Accounts.sendResetPasswordEmail(this.userId, email, extraTokenData)
    },
    'sendEnrollmentEmail'({usr_id,email,extraTokenData}) {
        let user = Meteor.user();
        if (!user)
            throw new Meteor.Error(401, 'Vous devez vous connecter!');
        
        return Accounts.sendEnrollmentEmail(this.userId, email, extraTokenData)
    },
    'sendVerificationEmail'({usr_id,email,extraTokenData}) {
        let user = Meteor.user();
        if (!user)
            throw new Meteor.Error(401, 'Vous devez vous connecter!');
        
        Accounts.sendVerificationEmail(this.userId, email, extraTokenData)
    },
    'onResetPassordLink'({usr_id}) {
        let user = Meteor.user();
        if (!user)
            throw new Meteor.Error(401, 'Vous devez vous connecter!');
        
    },
    'onEnrollmentLink'({usr_id}) {
        let user = Meteor.user();
        if (!user)
            throw new Meteor.Error(401, 'Vous devez vous connecter!');
        
    },
    'onEmailVerificationLink'({usr_id}) {
        let user = Meteor.user();
        if (!user)
            throw new Meteor.Error(401, 'Vous devez vous connecter!');
        
    },
    'editLastVisit'({}) {
        let user = Meteor.user();
        if (!user)
            throw new Meteor.Error(401, 'Vous devez vous connecter!');
        return Meteor.users.update({_id:this.userId},{
            $set:{
                "profile.lastLogin":new Date()
            }
        });
    },
});