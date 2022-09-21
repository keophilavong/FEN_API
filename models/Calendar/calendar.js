const mongoose = require('mongoose');
const {Schema} = mongoose;

const CalendarSchema = new Schema (
    {
        cover: {type: String, require: true},
        category: {type: String, require: true},
        semester: {type: String, require: true}
    },
    {
        toJSON: {virtuals: true},
        timestamps: true,
        collection: "calendar"
    }
)

const Calendar = mongoose.model("Calendar", CalendarSchema);

module.exports = Calendar;