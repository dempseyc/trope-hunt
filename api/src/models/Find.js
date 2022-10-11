const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FindSchema = new Schema({
    found_on: [{ type: Date }],
    found_by: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    movie_id: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
    trope_id: { type: Schema.Types.ObjectId, ref: 'Trope', required: true },
    bonus_memos: [{ type: String }]
});

module.exports = mongoose.model('Find', FindSchema);