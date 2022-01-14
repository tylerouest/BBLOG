import SimpleSchema  from 'simpl-schema';
global.SimpleSchema = SimpleSchema;
SimpleSchema.extendOptions(['autoform']);

var commentFields = {
    body: {
        type: String
    },
    parent: {
        type: String,
    },
    parentArticle: {
        type: String
    },
    notread: {
        type: String
    },
    _id: {
        type: String,
        optional: true,
    },
    userId: {
        type: String,
        optional: true,
    },
    author: {
        type: String,
        optional: true,
    },
    createdAt: {
        type: Date,
        optional: true,
    }
};
PostSchema = new SimpleSchema(commentFields);