const router = require("express").Router();
const { posts, User } = require("../models");

router.get("/", async (req, res) => {
    console.log("home", req.session.loggedIn);
  res.render("home", {loggedIn: req.session.loggedIn});
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  try {
    console.log(req.session.loggedIn);
    const { email, username, password } = req.body;
    const newUser = await User.create({ email, username, password });
    req.session.loggedIn = true;
    console.log(req.session.loggedIn);
    res.render("login");
    // res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const UserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    console.log("logging in");

    if (!UserData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    const validPassword = await UserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      console.log(req.session.loggedIn);
      res.render('home', { loggedIn: req.session.loggedIn });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login", { loggedIn: req.session.loggedIn });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.redirect("/login");
      });
    } else {
      res.status(404).end();
    }
});

module.exports = router;
