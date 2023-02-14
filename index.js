import express, { query } from "express";
const app = express();
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import cors from "cors";

const firebaseConfig = {
  apiKey: "AIzaSyBf5MhooXsBvsDEP1fv4Y3XXmRo8JdOw-k",
  authDomain: "my-pet-info-dbc57.firebaseapp.com",
  projectId: "my-pet-info-dbc57",
  storageBucket: "my-pet-info-dbc57.appspot.com",
  messagingSenderId: "1064228661366",
  appId: "1:1064228661366:web:6a06dfb149873da0aa1757",
};

let firebaseApp;

if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp(firebaseConfig);
} else {
  firebaseApp = firebase.app();
}

const db = firebase.firestore();

app.use(cors());

app.get("/dog-breeds", (req, res) => {
  let breeds = [];
  db.collection("breeds")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        breeds.push(doc.data());
      });
      res.send(breeds);
    })

    .catch((e) => console.log(e));
});

app.get("/dog-breeds/:id", (req, res) => {
  const id = req.params.id;
  let breedData = {};
  db.collection("breeds")
    .doc(id)
    .collection("breedInfo")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        breedData = doc.data();
      });
      res.send(breedData);
    })
    .catch((e) => {
      console.log(e);
      res.send(e.message);
      res.status(e.status);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
});
