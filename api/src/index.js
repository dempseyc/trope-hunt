require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const morgan = require("morgan");

const cors = require("cors");

const jwt = require("jsonwebtoken");

const usersRouter = require("./routes/usersRouter");
const authRouter = require("./routes/authRouter");

const tropesRouter = require("./routes/tropesRouter");
const gameMoviesRouter = require("./routes/gameMoviesRouter");
const findsRouter = require("./routes/findsRouter");

const User = require("./models/User");

const mongoose = require("mongoose");
const app = express();

const dbURL = process.env.DB_URL;

if (dbURL) {
  mongoose.connect(dbURL);
} else {
  console.log("no process.env");
}

// const FacebookTokenStrategy = require('passport-facebook-token');
// const passport = require('passport');
// required below ('express-session');

// passport.use(new FacebookTokenStrategy({
//     clientID: process.env.FB_ID,
//     clientSecret: process.env.FB_SECRET,
// }, function(accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ "facebook_id": profile.id }, function (err, user) {
//         console.log('user', user, err);
//         return done(error,user);
//     });
// }
// ));

// passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });

// passport.deserializeUser(function(id, done) {
//     done(null, id);
// });

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  morgan("dev", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
    stream: process.stderr,
  })
);
app.use(
  morgan("dev", {
    skip: function (req, res) {
      return res.statusCode >= 400;
    },
    stream: process.stdout,
  })
);

// app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// app.use(passport.initialize());
// app.use(passport.session());

const extractDetails = function (req, res, next) {
  const auth = req.headers.authorization.split(" ")[1];
  try {
    const details = Buffer.from(auth, "base64").toString().split(":");
    res.locals.details = details;
    next();
  } catch (error) {
    console.log("auth with details error");
    return res.status(401).json({ message: "Invalid Password/Email -1" });
  }
};

app.use("/api/auth/login", extractDetails);
// app.use('/api/auth/fb', passport.authenticate('facebook-token'), function(error, user) {
//     console.log('hit /fb route', user);
//     //respond or next here
// });
app.use("/api/auth", authRouter);

////////////////////////////////////////////// SOCKET STUFF

// // const io = require('socket.io')(server);
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//     // allowedHeaders: ["my-custom-header"],
//     // credentials: true
//   }
// });

// io.on('connection', (socket) => {
//   //
//   // seems like some of my logic would be here, but maybe broken out into other files
//   //
// //   socket.broadcast.emit("hello", "world");
//   //
//   socket.broadcast.emit("greeting",socket.id)
//   console.log("greeting",socket.id)
//   socket.on('subscribeToTimer', (interval) => {
//     console.log("socket is subscribing to timer with interval ", interval);
//     setInterval(() => {
//       socket.emit('timer', new Date());
//     }, interval);
//   });
// });

// server.listen(8000, ()=> console.log("io on 8000"));

////////////////////////////////////////////////
function exclude(path, middleware) {
  return function (req, res, next) {
    if (path === req.path) {
      return next();
    } else {
      return middleware(req, res, next);
    }
  };
}

app.use("/api/users", exclude("/create", tokenCheck));
app.use("/api/users/create", pwValidate);

app.use("/api/users", usersRouter);
app.use("/api/users/:id/update", pwCheck);

app.use("/api/tropes", exclude("/", tokenCheck));
app.use("/api/tropes", tropesRouter);

app.use("/api/gameMovies/create", tokenCheck);
app.use("/api/gameMovies/delete", tokenCheck);
app.use("/api/gameMovies/update", tokenCheck);
app.use("/api/gameMovies", gameMoviesRouter);

app.use("/api/finds", tokenCheck);
app.use("/api/finds", findsRouter);

function tokenCheck(req, res, next) {
  console.log("inside tokencheck");
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_KEY, function (err, payload) {
      if (payload) {
        User.findById(payload.user_id).then((doc) => {
          console.log("token ok");
          res.locals.user = doc;
          next();
        });
      } else {
        console.log("user not found", req.headers);
        res.status(401).json({ message: "Unauthorized" });
      }
    });
  } catch (error) {
    console.log("catch in tokenCheck", req.headers);
    res.status(401).json({ message: "Unauthorized" });
  }
}

function pwCheck(req, res, next) {
  try {
    bcrypt.compare(
      req.body.password,
      res.locals.user.pw_hash.toString(),
      (err, isMatch) => {
        if (err) {
          throw err;
        } else if (isMatch) {
          next();
        } else {
          res.status(401).json({ message: "Invalid Password/Email" });
        }
      }
    );
  } catch (error) {
    console.log("catch in pwCheck");
    res.status(400).json({ message: "Editing Wrong User" });
  }
}

function pwValidate(req, res, next) {
  try {
    const pwString = req.body.user.password;
    const isValid = (str) => {
      if (str.length < 6) { return false; };
      const ok = str.split("").every(char => {
        return /[a-zA-Z_0-9@\!#\$\^%&*+=\-\.\|:\?]/.test(char);
      });
      return ok;
    }
    const valid = isValid(pwString);
    if (valid) {
      next();
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log("catch in pwValidate");
    res
      .status(201)
      .json({
        message: "Minimum 6 characters, at least one letter and one number",
      });
  }
}

const PORT = process.env.PORT || 3002;
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});

module.exports = app;
