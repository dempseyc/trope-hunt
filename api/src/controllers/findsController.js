const Find = require("../models/Find");

exports.index = function (req, res) {
  Find.find({}, (err, docs) => {
    const results = ["no results"];
    if (err) {
      res.send(err);
    } else if (docs.length > 0) {
      res.send(results);
    }
  });
};

exports.show = function (req, res) {
  console.log("req", req.params);
  Find.findById(req.params.id, (err, doc) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(doc);
    }
  });
};

exports.create = function (req, res) {
  const params = req.body;
  const found_by = res.locals.user._id;
	const found_on = new Date().getTime();
  Find.findOneAndUpdate(
    {
      movie_id: params.movie_id,
      trope_id: params.trope_id,
    },
    {
      $push: {
        found_by: found_by,
        found_on: found_on,
      },
    },
    {
      new: true, // return new doc if one is upserted
      upsert: true, // insert the document if it does not exist
    },
    (err, doc) => {
      if (err) {
        res.send(err);
      } else {
        res.json(doc);
      }
    }
  );
};

exports.update = function (req, res) {
  const params = req.body;

  Find.findOneAndUpdate(
    { _id: req.params.id },
    { $set: params },
    { new: true },
    (err, doc) => {
      if (err) {
        res.send(err);
      } else {
        res.json(doc);
      }
    }
  );
};

exports.delete = (req, res) => {
  console.log(req.params, "params");
  Find.findOneAndDelete({ _id: req.params.id }, (err, doc) => {
    if (err) {
      res.send(err);
    } else {
      const response = doc._id;
      res.send(response);
    }
  });
};
