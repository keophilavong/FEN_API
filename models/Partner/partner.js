const mongoose = require('mongoose');
const {Schema} = mongoose;

const PartnerSchema = new Schema (
    {
        title: {type: String, require: true},
        link: {type: String, require: true}
    },
    {
        toJSON: {virtuals: true},
        timestamps: true,
        collection: "partner"
    }
)

const Partner = mongoose.model("Partner", PartnerSchema);

module.exports = Partner;