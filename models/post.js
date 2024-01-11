const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const PostSchema = new Schema ({
  title: { type: String, required: true, maxLength: 60 },
  text: { type: String, required: true },
  published: { type: Boolean, required: true, default: true },
  dateAdded: { type: Date, required: true, default: Date.now },
}, { timestamps: true });

PostSchema.virtual('url').get(function () {
  return `/posts/${this._id}`;
});

PostSchema.virtual('formatDate').get(function () {
  return moment(this.dateAdded).format('MMM D, YYYY [at] h:mma');
});

PostSchema.virtual('editMessage').get(function () {
  return `/posts/${this._id}/edit`;
});

PostSchema.virtual('deleteMessage').get(function () {
  return `/posts/${this._id}/delete`;
});

module.exports = mongoose.model("Post", PostSchema);
