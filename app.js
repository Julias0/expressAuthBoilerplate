const app = require("express")();
const session = require("express-session");
const bodyParser = require("body-parser");
var MongoDBStore = require("connect-mongodb-session")(session);

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/boilerPlate", { useNewUrlParser: true });

mongoose.connection
  .once("open", () => {
    console.log("DB is fired up");
  })
  .on("error", err => {
    console.log(err);
  });

var store = new MongoDBStore({
  uri: "mongodb://localhost/boilerPlate",
  collection: "sessions"
});

app.use(bodyParser.json());

app.use(
  session({
    secret: "youCantSeeMe",
    resave: false,
    saveUninitialized: true,
    store
  })
);

const authRoutes = require("./routes/auth");

app.use("/auth", authRoutes);

app.use("/protected",require('./helpers/middleware/authMiddleware'),(req,res)=>{
    res.send('Hello to protected!'+ JSON.stringify(req.session));
});

app.use("/",(req,res)=>{
    res.send('Hello!'+ JSON.stringify(req.session));
});

// Session Test
// app.get('/', (req,res) => {
//     console.log(req.session);
//     if (!req.session.age) {
//         req.session.age = 1;
//     } else {
//         req.session.age += 1;
//         if(req.session.age > 5) {
//             req.session.destroy();
//         }
//     }
//     res.send('Test-wa');
// });

app.listen(3000, () => {
  console.log("server running");
});
