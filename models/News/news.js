const mongoose = require('mongoose');
const {Schema} = mongoose;

const NewsSchema = new Schema (
    {
        title: {type: String, text: true, require: true},
        content: {type: String, require: true},
        cover: {type: String, require: true},
        images: [{type: String, require: true}],
        isFeature: {type: Boolean, require: true},
        category: {type: Schema.Types.ObjectId, ref: "Category", require: true}
    },
    {
        toJSON: { virtuals: true },
        timestamps: true,
        collection: "news"
    }
)

const News = mongoose.model("News", NewsSchema);

module.exports = News;