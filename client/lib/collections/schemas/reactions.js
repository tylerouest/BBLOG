import SimpleSchema  from 'simpl-schema';
global.SimpleSchema = SimpleSchema;
SimpleSchema.extendOptions(['autoform']);

var reactionsFields = {
    id_comment: {
        type: String,
        label: 'Titre'
    },
    id_article: {
        type: String,
        label: 'Article',
        autoform: {
            type: 'textarea',
            rows: 5
        }
    },
    pseudo: {
        type: String,
        label: 'desc',
        autoform: {
            type: 'textarea',
            rows: 5
        }
    },
    valeur: {
        type: String,
        optional: true,
        autoform: {
            omit: true
        }
    },
    _id: {
        type: String,
        optional: true,
        autoform: {
            omit: true
        }
    },
    userId: {
        type: String,
        optional: true,
        autoform: {
            omit: true
        }
    },
    author: {
        type: String,
        optional: true,
        autoform: {
            omit: true
        }
    },
    createdAt: {
        type: Date,
        optional: true,
        autoform: {
            omit: true
        }
    }
};
ReactionSchema = new SimpleSchema(reactionsFields);