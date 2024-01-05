const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const CommentSchema = new Schema ({
  name: { type: String, required: true, maxLength: 25 },
  text: { type: String, required: true, maxLength: 1400 },
  dateAdded: { type: Date, required: true, default: Date.now },
  post: { type: Schema.Types.ObjectId, ref: "Post" }
}, { timestamps: true });

CommentSchema.virtual('url').get(function () {
  return `/posts/${this.post._id}/comments/${this._id}`;
});

CommentSchema.virtual('formatDate').get(function () {
  return moment(this.dateAdded).format('MMM D, YYYY [at] h:mma');
});

CommentSchema.virtual('editMessage').get(function () {
  return `/posts/${this.post._id}/comments/${this._id}/edit`;
});

CommentSchema.virtual('deleteMessage').get(function () {
  return `/posts/${this.post._id}/comments/${this._id}/delete`;
});

module.exports = mongoose.model("Comment", CommentSchema);