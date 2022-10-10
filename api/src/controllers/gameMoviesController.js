const GameMovie = require('../models/GameMovie');

exports.index = function(req,res) {
    GameMovie.find(
        {},
        (err,docs) => {
            let results = ['no results'];
            if (err) {
                res.send(err);
            } else if (docs.length>0) { 
                results = docs;           
                res.send(results);
            }
        }
	);
};

exports.show = function(req,res) {
    console.log('req', req.params)
    GameMovie.findById(
        req.params.id, 
        (err,doc) => {
            if (err) {
                return res.send(err);
            } else {
                return res.json(doc);
            }
        }
    );
};

exports.create = function(req, res) {
    const params = req.body.gameMovie;
    params.created_by = res.locals.user._id;
    GameMovie.findOneAndUpdate(
        { tmdb_id: params.tmdb_id },
        { $set: params },
        {
            new: true,   // return new doc if one is upserted
            upsert: true // insert the document if it does not exist
        },
        (err,doc) => {
            if (err) {
                res.send(err);
            } else {
                res.json(doc);
            }
        }
    );
 };

 exports.update = function(req, res) {
    const params = req.body;
    
    GameMovie.findOneAndUpdate(
        {"_id": req.params.id},
        { $set: params },
        {new: true},
        (err,doc) => {
            if (err) {
                res.send(err);
            } else {
                res.json(doc);
            }
        }
    );
 };

 exports.delete = (req, res) => {
     console.log(req.params, 'params');
     GameMovie.findOneAndDelete(
        {"_id": req.params.id},
        (err,doc) => {
            if (err) {
                res.send(err);
            } else {
                const response = doc._id;
                res.send(response);
            }
        }
    );
 };

 exports.search = function(req,res) {
	const query = req.body;
	console.log(query, 'search');
    GameMovie.find(
        {$text: {$search: query}}
        )
       .limit(10)
       .exec((err,docs) => {
		let results = ['no results'];
		if (err) {
			res.send(err);
		} else if (docs.length>0) {            
			results = docs
		}
		res.send(results)
	});
};