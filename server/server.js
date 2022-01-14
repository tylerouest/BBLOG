process.env.HTTP_FORWARDED_COUNT = 1;

Posts = new Mongo.Collection('posts');
Comments = new Mongo.Collection('comments');
centre_notifications = new Mongo.Collection('notifications');
React = new Mongo.Collection('reactions');
Messages = new Mongo.Collection('messages');
Conversations = new Mongo.Collection('conversations');
typing = new Mongo.Collection('typing');
Questions = new Mongo.Collection('questions');

