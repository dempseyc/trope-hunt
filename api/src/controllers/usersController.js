const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/User");

exports.show = function (req, res) {
  console.log(res.locals.user);
  if (res.locals.user) {
    User.findById(res.locals.user._id, function (error, response) {
      if (error) {
        return res.send(error);
      } else {
        response.pw_hash = "secured";
        return res.json(response);
      }
    });
  } else {
    res.status(400).json({ message: "Invalid Password/Email" });
  }
};

const extractUN = (email) => {
  return email.split("@")[0];
};

exports.create = function (req, res) {
  let params = req.body.user;
  bcrypt.hash(params.password, saltRounds, function (error, hash) {
    params.pw_hash = hash;
    params.username = extractUN(params.email);
    let user = new User(params);
    user.save(function (error, response) {
      if (error) {
        return res.send(error);
      } else {
        return res.json(response);
      }
    });
    // catch (error)
  });
};

exports.update = function (req, res) {
  const { newPassword, data } = req.body;
  const { _id } = res.locals.user;
  if (newPassword) {
    try {
      bcrypt.hash(req.body.newPassword, saltRounds, function (error, hash) {
        let params = req.body;
        params.pw_hash = hash;
        params = (({ username, email, pw_hash }) => ({
          username,
          email,
          pw_hash,
        }))(params);
        User.findOneAndUpdate(
          { _id: _id },
          {
            username: params.username,
            email: params.email,
            pw_hash: params.pw_hash,
          },
          { new: true },
          (error, doc) => {
            if (error) {
              return res.send([error]);
            } else {
              return res.send(doc);
            }
          }
        );
      });
    } catch (err) {
      return res.json(err);
    }
  }
  else if (data && _id) {
    User.findOneAndUpdate(
      { _id: _id },
      {
        data: data,
      },
      (err, response) => {
        if (err) {
          return res.send(err);
        } else {
          console.log(response.data);
          return res.json(response.data);
        }
      }
    );
  } else {
    res.status(400).json({ message: "Invalid User Update" });
  }
};

exports.delete = (req, res) => {
  console.log("user delete");
  User.findOneAndDelete({ _id: res.locals.user._id }, (error, doc) => {
    if (error) {
      return res.send([error]);
    } else {
      return res.send(["user deleted"]);
    }
  });
};
