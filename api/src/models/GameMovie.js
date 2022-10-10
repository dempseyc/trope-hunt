const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const GameMovieSchema = new Schema({
    tmdb_id: { type: Number, required: false },
    created_by: { type: Schema.Types.ObjectId, ref: 'User' },
    backdrop_path: { type: String, required: false },
    poster_path: { type: String, required: false },
    genre_ids: [{ type: Number, required: false }],
    original_language: { type: String, required: false },
    original_title: { type: String, required: true },
    title: { type: String, required: false },
    overview: { type: String, required: false },
    release_date: { type: String, required: false },
    finds: [{ type: Schema.Types.ObjectId, ref: 'Find', required: false }],
});

GameMovieSchema.index({name: 'text', 'overview': 'text'}); // allows Model.find({$text: query})

module.exports = mongoose.model('GameMovie', GameMovieSchema)