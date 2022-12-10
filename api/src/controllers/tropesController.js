const { Error } = require("mongoose");
var mongoose = require('mongoose');
const Trope = require("../models/Trope");

exports.index = async function (req, res) {
  try {
    const docs = await Trope.find({}).exec();
    let results = ["no results"];
    if (docs.length) {
      results = docs;
    }
    res.json(results);
  } catch (error) {
    res.status(401).json({ message: `${error.message}` });
  }
};

exports.show = async function (req, res) {
  try {
    const trope = await Trope.findById(req.params._id).exec();
    if (trope) {
      return res.json(trope);
    } else {
      throw new Error("trope not found");
    }
  } catch (error) {
    res.status(401).json({ message: `${error.message}` });
  }
};

exports.create = async function (req, res) {
  try {
    const params = req.body;
    const trope = new Trope(params);
    const response = await trope.save();
    if (response) {
      res.json(response);
    } else {
      throw new Error("error in trope create");
    }
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
  }
};

exports.update = async function (req, res) {
  try {
    const params = req.body;
    if (!params._id) {
      params._id = new mongoose.mongo.ObjectId();
    }
    const trope = await Trope.findOneAndUpdate({ _id: params._id }, params, {
      new: true,
      upsert: true,
    }).exec();
    if (trope) {
      res.json(trope);
    } else {
      throw new Error("error in trope update");
    }
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
  }
};

exports.delete = async function (req, res) {
  try {
    await Trope.findOneAndDelete({ _id: req.params.id }).exec();
    res.json({ message: `One Trope deleted ${req.params.id}` });
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
  }
};
