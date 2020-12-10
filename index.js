const express = require("express");
const multer = require("multer");
const upload = multer();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cors = require("cors");
const port = 3001;
const bodyParser = require("body-parser");
const User = require("./user");
require('dotenv').config();

const app = express();
//Start Oraldo


// any request coming in, transfer all body into JSON
app.use(express.json());

// allow cross origin from client localhost
app.use(cors());

// creating POST endpoint /file
app.post("/file", upload.single("file"), (req, res) => {
  console.log("body", req.file.length, req.file);

  // here you can do anything that you want for the file
  // ex: you want to save it to database here

  res.json({ success: true });
});
///End Oraldo upload//
mongoose.connect(
  "mongodb+srv://Sbodazo:admin@cluster0.2q3gi.mongodb.net/Users?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Database connesso");
  }
);

mongoose.connect(process.env.DATABASE_URL, {useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error)=>console.error(error));
db.once('open', ()=>console.log("connected to db"));



app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "trip2day",
    resave: true,
    saveUninitialized: true,
  })
);

// app.use(cookieParser("trip2day"));
// app.use(passport.initialize());
// app.use(passport.session());
// require("./passportConfig")(passport);

const suggestionRouter = require('./routes/suggestion');
app.use('/suggestion', suggestionRouter);

const planner = [
  {
    nickname: "bellagented@gmail.com",
    age: "25",
    from: "Treviglio",
    img:
      "https://images.unsplash.com/photo-1495366691023-cc4eadcc2d7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",

    planner: [
      {
        where: "London",
        id:"Lnd134516",
        title:"Sulle orme di mr. Bean",
        img:
          "https://images.unsplash.com/photo-1473896100090-53523650d4c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=749&q=80",
        fromDate: "2021-07-25",
        toDate: "2021-07-30",
        textRequest: "Consigliatemi luoghi dei film di mr Bean",
        suggestion: [
          {
            id:'mhbdikjnj39889',
            fromWho: "Lorenzo",
            name: "Big Ben",
            category: "monument",
            description: "bello da paura",
            cost: "$$$$",
            timeNeeded: 2,
            photoUrl: "",
          },
          {
            id:'kjhb66758789489',
            fromWho: "Lorenzo",
            name: "restaurant Londonbridge",
            category: "monument",
            description: "bello da paura",
            cost: "$$$$",
            timeNeeded: 2,
            photoUrl: "",
          },
          {
            id:'775785ubhigngb',
            fromWho: "Lorenzo",
            name: "queen museum",
            category: "monument",
            description: "bello da paura",
            cost: "$$$$",
            timeNeeded: 2,
            photoUrl: "",
          },
        ],
        myPlan: []
      },
    ],
    friendList: [
      {
        nickname: "Mario",
        img: "https://nintendoomed.it/wp-content/uploads/2018/10/mario.0.jpg",
      },
      {
        nickname: "Luigi",
        img:
          "https://i.etsystatic.com/11355950/r/il/16ad26/1259915155/il_570xN.1259915155_jheb.jpg",
      },
      {
        nickname: "Wario",
        img:
          "https://i.pinimg.com/originals/56/5e/27/565e27de74219823cb47c0eddcbf5f4a.jpg",
      },
      {
        nickname: "Waluigi",
        img:
          "https://assets.change.org/photos/4/qh/tq/wAQHtqjWnDybkjQ-800x450-noPad.jpg?1521521140",
      },
    ],
  },
  {
    nickname: "Lorenzo Martinoli",
    img:
      "https://images.unsplash.com/photo-1495366691023-cc4eadcc2d7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",

    planner: [
      {
        where: "London",
        id:"Lnd134516",
        title:"Sulle orme di mr. Bean",
        img:
          "https://images.unsplash.com/photo-1473896100090-53523650d4c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=749&q=80",
        fromDate: "2021-07-25",
        toDate: "2021-07-30",
        textRequest: "Consigliatemi luoghi dei film di mr Bean",
        suggestion: [
          {
            accepted:false,
            id:'mhbdikjnj39889',
            fromWho: "Lorenzo",
            name: "Big Ben",
            category: "monument",
            description: "bello da paura",
            cost: "$$$$",
            timeNeeded: 2,
            photoUrl: "",
          },
          {
            accepted:false,
            id:'kjhb66758789489',
            fromWho: "Lorenzo",
            name: "restaurant Londonbridge",
            category: "monument",
            description: "bello da paura",
            cost: "$$$$",
            timeNeeded: 2,
            photoUrl: "",
          },
          {
            accepted:true,
            id:'775785ubhigngb',
            fromWho: "Lorenzo",
            name: "queen museum",
            category: "monument",
            description: "bello da paura",
            cost: "$$$$",
            timeNeeded: 2,
            photoUrl: "",
          },
        ],
        myPlan: [
          {
            title: "London Eye",
            startDate: new Date(2021, 7, 26, 9, 30),
            endDate: new Date(2021, 7, 26, 11, 30),
          },
          {
            title: "Piccadilly circus",
            startDate: new Date(2021, 7, 28, 12, 0),
            endDate: new Date(2021, 7, 28, 13, 0),
          },
        ],
      },
    ],
    friendList: [
      {
        nickname: "Mario",
        img: "https://nintendoomed.it/wp-content/uploads/2018/10/mario.0.jpg",
      },
      {
        nickname: "Luigi",
        img:
          "https://i.etsystatic.com/11355950/r/il/16ad26/1259915155/il_570xN.1259915155_jheb.jpg",
      },
      {
        nickname: "Wario",
        img:
          "https://i.pinimg.com/originals/56/5e/27/565e27de74219823cb47c0eddcbf5f4a.jpg",
      },
      {
        nickname: "Waluigi",
        img:
          "https://assets.change.org/photos/4/qh/tq/wAQHtqjWnDybkjQ-800x450-noPad.jpg?1521521140",
      },
    ],
  },
];

// app.post("/auth", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) throw err;
//     if (!user) {
//       console.log(req.body);
//       res.send(req.body.username);
//     } else {
//       req.logIn(user, (err) => {
//         if (err) throw err;
//         res.send(req.user);
//         console.log(req.user);
//       });
//     }
//   })(req, res, next);
// });

// app.post("/register", (req, res) => {
//   User.findOne({ username: req.body.username }, async (err, doc) => {
//     if (err) throw err;
//     if (doc) res.send("User already Exists");
//     if (!doc) {
//       const hashedPassword = await bcrypt.hash(req.body.password, 10);
//       const newUser = new User({
//         username: req.body.username,
//         password: hashedPassword,
//       });
//       await newUser.save();
//       res.send("User Created");
//     }
//   });
// });

let pendingquestion = [
  {
    question: {
      img:
        "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80 ",
      name: "Mario",
      where: "Rome",
      id: "hbkIBkjuihk",
    },
    response: [],
  },
  {
    question: {
      img:
        "https://images.unsplash.com/photo-1543783207-ec64e4d95325?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      name: "Luigi",
      where: "Madrid",
      id: "iUBjoKMlk",
    },
    response: [],
  },
];

app
  .route("/ReqSuggestion")
  .get((req, res) => {
    let suggestion = pendingquestion.map((request) => {
      return request.question;
    });
    res.json(suggestion);
  })
  .post((req, res) => {
    let position = pendingquestion.findIndex((request) => {
      return request.question.id === req.body.id;
    });
    pendingquestion[position].response.push(req.body);
    res.json({ status: pendingquestion });
  })
  .all((req, res) => {
    res.json({ error: "Unknown Method" });
  });

let mysuggestion = [
  {
    where: "London",
    activity: [
      {
        category: "monument",
        activity: "big ben",
        cost: "$$",
        timeNeeded: "3",
        description: "hbjbjmn jhbjbkjnbkjnkjnlkllk",
        photo: "photo",
      },
      {
        category: "restaurant",
        activity: "chef Ramsay",
        cost: "$$$$",
        timeNeeded: "1",
        description: "khbsdlzxkcnksjdnzclkaldksnclkns",
        photo: "photo",
      },
    ],
  },
];

app
  .route("/mysuggestion")
  .get((req, res) => {
    
    res.json(mysuggestion);
  })
  .all((req, res) => {
    res.json({ error: "Unknown Method" });
  });

const friendProfile = [
  {
    nickname: "Mario",
    img: "https://nintendoomed.it/wp-content/uploads/2018/10/mario.0.jpg",
    text: "it's a me, Mario",
  },
  {
    nickname: "Luigi",
    img:
      "https://i.etsystatic.com/11355950/r/il/16ad26/1259915155/il_570xN.1259915155_jheb.jpg",
    text: "nobody loves me",
  },
  {
    nickname: "Wario",
    img:
      "https://i.pinimg.com/originals/56/5e/27/565e27de74219823cb47c0eddcbf5f4a.jpg",
    text: "wawawawaawwawaawawawaw",
  },
  {
    nickname: "Waluigi",
    img:
      "https://assets.change.org/photos/4/qh/tq/wAQHtqjWnDybkjQ-800x450-noPad.jpg?1521521140",
    text: "frase ad effetto",
  },
];

app
  .route("/friendprofile/:name")
  .get((req, res) => {
    let profile = friendProfile.filter((friend) => {
      return friend.nickname === req.params.name;
    });
    let request = pendingquestion
      .filter((element) => {
        return element.question.name === req.params.name;
      })
      .map((element) => {
        return element.question;
      });
    let profileinfo = {
      nickname: profile[0].nickname,
      img: profile[0].img,
      text: profile[0].text,
      request: request,
    };
    res.json(profileinfo);
  })
  .post((req, res) => {
    res.json();
  })
  .all((req, res) => {
    res.json({ error: "Unknown Method" });
  });

app
  .route("/:nickname/planner/:plannerid")
  .get((req, res) => {
    let userplanner = planner.find((userplanner) => {
      return req.params.nickname === userplanner.nickname;
    });
    let response = userplanner.planner.find((planner) => {
      return planner.id === req.params.plannerid;
    });
    res.json(response);
  })
  .patch((req, res) => {
    let userplanner = planner.find((userplanner) => {
      return req.params.nickname === userplanner.nickname;
    });
    let userIndex = planner.findIndex((userplanner) => {
      return req.params.nickname === userplanner.nickname;
    });
    let planIndex = userplanner.planner.findIndex((planner) => {
      return planner.id === req.params.plannerid;
    });
    planner[userIndex].planner[planIndex].where = req.body.city;
    planner[userIndex].planner[planIndex].title = req.body.title;
    planner[userIndex].planner[planIndex].fromDate = req.body.fromDate;
    planner[userIndex].planner[planIndex].toDate = req.body.toDate;
    planner[userIndex].planner[planIndex].toDate = req.body.toDate;
    planner[userIndex].planner[planIndex].img = req.body.img;
    res.json({status:'saved'});
  })
  .post((req, res) => {
    let userIndex = planner.findIndex((userplanner) => {
      return req.params.nickname === userplanner.nickname;
    });
   planner[userIndex].planner.push(req.body);
    res.json({status:'added'});
  })
  .all((req, res) => {
    res.json({ error: "Unknown Method" });
  });

app
  .route("/:nickname")
  .get((req, res) => {
    let userplanner = planner.find((userplanner) => {
      return req.params.nickname === userplanner.nickname;
    });

    res.json(userplanner);
  })
  .post((req, res) => {
    res.json();
  })
  .all((req, res) => {
    res.json({ error: "Unknown Method" });
  });

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
