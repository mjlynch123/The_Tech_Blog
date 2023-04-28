const router = require("express").Router();
const { Post, User } = require("../models");

// ! All routes had to be added to this page due to same bug causing access denial

router.get("/", async (req, res) => {
  console.log("home", req.session.loggedIn);

  // Get all posts from the database
  const posts = await Post.findAll();
  const datePosted = posts[0].created_at.toLocaleDateString();

  // Map each post to an object containing the post data and the user who posted it
  const postList = await Promise.all(
    posts.map(async (post) => {
      const user = await User.findOne({
        where: {
          id: post.user_id,
        },
      });
      return {
        user: user.username,
        time: datePosted,
        title: post.title,
        body: post.body,
        postId: post.id,
      };
    })
  );

  // Render the home page and pass the post list and loggedIn status to the view
  res.render("home", { postList, loggedIn: req.session.loggedIn });
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
      req.session.userId = UserData.id;
      console.log(req.session.loggedIn);
      res.render("home", { loggedIn: req.session.loggedIn });
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
  // ! This is making sure that the login button is changed to logout if the user is logged in
  res.render("login", { loggedIn: req.session.loggedIn });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.redirect("/login");
    });
  } else {
    res.status(404).end();
  }
});

router.get("/newPost", async (req, res) => {
  // ! This is making sure that the login button is changed to logout if the user is logged in
  res.render("new_post", { loggedIn: req.session.loggedIn });
});

router.post("/newPost", async (req, res) => {
  try {
    const { title, content } = req.body;

    // Get the user ID from the session
    const userId = req.session.userId;

    req.session.userId = User.id

    console.log("User ID", userId);
    // Create a new post object with the user_id included
    const newPost = {
      title: title,
      body: content,
      user_id: userId,
    };

    // Save the new post to the database
    await Post.create(newPost);

    // Redirect the user to the homepage
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get('/post', async (req, res) => {
  try {
    const postId = req.query.id;
    const post = await Post.findOne({ where: { id: postId } });
    res.render('post-details', { post });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: { model: User, attributes: ['username'] }
    });

    if (!post) {
      res.status(404).render('404');
      return;
    }

    // * This is where I am grabbing the susername from the post data
    const username = post.user.dataValues.username;

    const datePosted = post.created_at.toLocaleDateString();
    const postData = {
      user: username,
      time: datePosted,
      title: post.title,
      body: post.body,
    };

    res.render('partials/post-details', { postData, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
