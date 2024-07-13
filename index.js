
// const express = require("express");
// const path = require("path");
// const collection = require("./config");
// const bcrypt = require('bcrypt');
// const session = require("express-session");



// const app = express();
// // convert data into json format
// app.use(express.json());
// // Static file

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// // Session middleware setup
// app.use(session({
//     secret: 'your_secret_key',
//     resave: false,
//     saveUninitialized: false
// }));

// app.use(express.static(path.join(__dirname, "public")));

// app.use(express.urlencoded({ extended: false }));

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "views", "index.html"));
// });

// app.get("/signup", (req, res) => {
//     res.sendFile(path.join(__dirname, "views", "signup.html"));
// });

// app.get("/index", (req, res) => {
//     res.sendFile(path.join(__dirname, "views", "index.html"));
// });

// app.get("/login", (req, res) => {
//     res.sendFile(path.join(__dirname, "views", "login.html"));
// });

// app.get("/community", (req, res) => {
//     res.sendFile(path.join(__dirname, "views", "community.html"));
// });

// // Search route

// // Login user 
// app.post("/login", async (req, res) => {
//     try {
//         const check = await collection.findOne({ email: req.body.email });
//         if (!check) {
//             res.send("User not found");
//         } else {
//             const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
//             if (!isPasswordMatch) {
//                 res.send("Wrong password");
//             } else {
//                 req.session.email = check.email; // Store user's email in session
//                 req.session.name = check.name; // Store user's name in session
//                 res.redirect("/index");
//             }
//         }
//     } catch {
//         res.send("An error occurred");
//     }
// });
// app.post("/community", (req, res) => {
//     // Handle form submission here
//     // For example, you can access form data using req.body
//     const { name, email, message } = req.body;
//     console.log("Form Data:", { name, email, message });
//     // Process the form data as needed and send a response
//     res.send("Form submitted successfully!");
// });


// app.post("/signup", async (req, res) => {
//     const data = {
//         name: req.body.username,
//         email: req.body.email,
//         password: req.body.password
//     }

//     const existingUser = await collection.findOne({ email: data.email });

//     if (existingUser) {
//         res.send('User already exists. Please choose a different Email id.');
//     } else {
//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(data.password, saltRounds);

//         data.password = hashedPassword;

//         const userdata = await collection.insertMany([data]);
//         const check = await collection.findOne({ email: req.body.email });
//         req.session.email = check.email; // Store user's email in session
//         req.session.name = check.name; // Store user's name in session
//         console.log(userdata);
//         res.redirect("/index");
//     }
// });

// app.get("/account", (req, res) => {
//     if (req.session.email) {
//         const user = { name: req.session.name, email: req.session.email };
//         res.render("account", { user, req });
//     } else {
//         res.redirect("/login");
//     }
// });

// app.get("/logout", (req, res) => {
//     req.session.destroy();
//     res.redirect("/login");
// });

// app.post("/logout", (req, res) => {
//     req.session.destroy();
//     res.redirect("/login");
// });

// // Update user
// app.post("/account/update", async (req, res) => {
//     const user = await collection.findOne({ email: req.session.email });
//     if (!user) {
//         res.redirect("/login");
//     } else {
//         const updatedUser = {
//             name: req.body.name,
//             email: req.body.email,
//             password: await bcrypt.hash(req.body.password, 10)
//         };
//         await collection.updateOne({ email: req.session.email }, { $set: updatedUser });
//         req.session.name = req.body.name; // Update session with new name
//         req.session.email = req.body.email; // Update session with new email

//         const delayedFunction = () => {
//             res.redirect("/login?passwordUpdated=true");
//         }
//         setTimeout(delayedFunction, 2000);
//     }
// });
// app.post("/account/delete", async (req, res) => {
//     try {
//         // Find the user in the database
//         const user = await collection.findOne({ email: req.session.email });
//         if (!user) {
//             // If user not found, redirect to login
//             res.redirect("/login");
//         } else {
//             // If user found, delete the user from the database
//             await collection.deleteOne({ email: req.session.email });
//             // Destroy session
//             req.session.destroy();
//             // Redirect to login page or any other desired page
//             res.redirect("/login?accountDeleted=true");
//         }
//     } catch (error) {
//         console.error("Error deleting account:", error);
//         res.redirect("/login?error=true");
//     }
// });





// // Define Port for Application
// const port = 4000;
// app.listen(port, () => {
//     console.log(`Server listening on port ${port}`)
// });


const express = require("express");
const path = require("path");
const collection = require("./config");
const session = require("express-session");

const app = express();
// convert data into json format
app.use(express.json());
// Static file

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session middleware setup
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "signup.html"));
});

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/community", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "community.html"));
});

// Search route

// Login user
app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ email: req.body.email });
    if (!check) {
      res.send("User not found");
    } else {
      // No password hashing/comparison here - assuming plain text password storage (not recommended)
      if (req.body.password === check.password) {
        req.session.email = check.email; // Store user's email in session
        req.session.name = check.name; // Store user's name in session
        res.redirect("/index");
      } else {
        res.send("Wrong password");
      }
    }
  } catch {
    res.send("An error occurred");
  }
});
app.post("/community", (req, res) => {
  // Handle form submission here
  // For example, you can access form data using req.body
  const { name, email, message } = req.body;
  console.log("Form Data:", { name, email, message });
  // Process the form data as needed and send a response
  res.send("Form submitted successfully!");
});


app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,
    email: req.body.email,
    password: req.body.password // Plain text password storage (not recommended)
  }

  const existingUser = await collection.findOne({ email: data.email });

  if (existingUser) {
    res.send('User already exists. Please choose a different Email id.');
  } else {
    const userdata = await collection.insertMany([data]);
    const check = await collection.findOne({ email: req.body.email });
    req.session.email = check.email; // Store user's email in session
    req.session.name = check.name; // Store user's name in session
    console.log(userdata);
    res.redirect("/index");
  }
});

app.get("/account", (req, res) => {
  if (req.session.email) {
    const user = { name: req.session.name, email: req.session.email };
    res.render("account", { user, req });
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

app.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

// Update user
app.post("/account/update", async (req, res) => {
  const user = await collection.findOne({ email: req.session.email });
  if (!user) {
    res.redirect("/login");
  }
  else {
    const updatedUser = {
      name: req.body.name,
      email: req.body.email,
    };
    await collection.updateOne({ email: req.session.email }, { $set: updatedUser });
    req.session.name = req.body.name; // Update session with new name
    req.session.email = req.body.email; // Update session with new email

    const delayedFunction = () => {
      res.redirect("/login?passwordUpdated=true");
    }
    setTimeout(delayedFunction, 2000);
  }
});
app.post("/account/delete", async (req, res) => {
  try {
    // Find the user in the database
    const user = await collection.findOne({ email: req.session.email });
    if (!user) {
      // If user not found, redirect to login
      res.redirect("/login");
    } else {
      // If user found, delete the user from the database
      await collection.deleteOne({ email: req.session.email });
      // Destroy session
      req.session.destroy();
      // Redirect to login page or any other desired page
      res.redirect("/login?accountDeleted=true");
    }
  } catch (error) {
    console.error("Error deleting account:", error);
    res.redirect("/login?error=true");
  }
});





// Define Port for Application
const port = 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});