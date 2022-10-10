const Find = require('../models/Find');

exports.index = function(req,res) {
    Find.find(
        {},
        (err,docs) => {
            const results = ['no results'];
            if (err) {
                res.send(err);
            } else if (docs.length>0) {            
                res.send(results)
            }
        }
	);
};

exports.show = function(req,res) {
    console.log('req', req.params)
    Find.findById(
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
    const params = req.body;
    params.user_id = res.locals.user._id;
    Find.create(
        { params },
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
    
    Find.findOneAndUpdate(
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
     Find.findOneAndDelete(
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