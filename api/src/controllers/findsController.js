const Find = require("../models/Find");
//81
exports.index = async function (req, res) {
  try {
    const docs = await Find.find({}).exec();
    let results = ["no results"];
    if (docs.length) {
      results = docs;
    }
    return res.json(docs);
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
  }
};

exports.show = async function (req, res) {
  const { id } = req.params;
  try {
    const doc = await Find.findById(id).exec();
    if (doc) {
      return res.json(doc);
    } else {
      throw new Error("error in finds show");
    }
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
  }
};

exports.create = async function (req, res) {
  try {
    const params = req.body;
    const found_by = res.locals.user._id;
    const found_on = new Date().getTime();
    const doc = await Find.findOneAndUpdate(
      {
        movie_id: params.movie_id,
        trope_id: params.trope_id,
      },
      {
        $push: {
          found_by: found_by,
          found_on: found_on,
          indications: params.indication,
        },
      },
      {
        new: true, // return new doc if one is upserted
        upsert: true, // insert the document if it does not exist
      }
    ).exec();
    if (doc) {
      return res.json(doc);
    } else {
      throw new Error("error in finds create");
    }
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
  }
};

exports.update = async function (req, res) {
  try {
    const params = req.body;
    const doc = await Find.findOneAndUpdate(
      { _id: req.params.id },
      { $set: params },
      { new: true }
    ).exec();
    if (doc) {
      return res.json(doc);
    } else {
      throw new Error("error in finds update");
    }
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
  }
};

exports.delete = async function (req, res) {
  try {
    const _id = req.params.id;
    const doc = await Find.findOneAndDelete({ _id }).exec();
    if (doc) {
      return res.json({ message: `find deleted ${doc._id}` });
    } else {
      throw new Error("error in movie delete");
    }
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
  }
};
