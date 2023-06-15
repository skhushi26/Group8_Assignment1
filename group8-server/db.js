import { MongoClient } from "mongodb";

const url =
  "mongodb+srv://khushi123:khushi2000@cluster0.rcfeocb.mongodb.net/employeeDb?retryWrites=true&w=majority";
let db;

const connectToDb = (callback) => {
  MongoClient.connect(url)
    .then((client) => {
      db = client.db();
      callback(url);
    })
    .catch((err) => {
      console.log("err", err);
      callback(null, err);
    });
};

const getDb = () => {
  return db;
};

export { connectToDb, getDb };
