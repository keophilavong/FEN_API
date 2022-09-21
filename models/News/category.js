const mongoose = require('mongoose');
const {Schema} = mongoose;

const CategorySchema = new Schema (
    {
        category_name: {type: String, text: true, require: true},
        news_list: [{type: Schema.Types.ObjectId, ref: "News"}]
    },
    {
        toJSON: {virtuals: true},
        timestamps: true,
        collection: "category"
    }
)

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;