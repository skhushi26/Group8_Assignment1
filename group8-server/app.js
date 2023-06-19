/**
 * Authors:  Khushali Shah
 *          Abhi Patel
 *          Meet Jani
 *          Gurpreet Singh
 *
 * Group 8 - Node Server
 * Assignment 1 - PROG8730-23S-Sec8-Advanced Full-Stack Programming
 */

import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { readFile } from "node:fs/promises";
import { GraphQLScalarType } from "graphql";
import { connectToDb, getDb } from "./db.js";
import yup from "yup";

let db;
const app = express();

app.use(express.json());

// This API is just for reference, in front-end we are fetching data using /graphql
app.get("/api/employees", (req, res) => {
  employeeList()
    .then((employees) => {
      res
        .json({
          employees: employees,
          message: "All employees found successfully!",
        })
        .status(200);
    })
    .catch((err) => {
      res
        .json({
          employees: null,
          message: "Something went wrong in fetching data",
        })
        .status(500);
    });
});

// Payload validation using yup
const employeeSchema = yup.object().shape({
  employee: yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    age: yup.number().required().positive().integer().min(20).max(70),
    dateOfJoining: yup.date().required(),
    title: yup.mixed().oneOf(["Employee", "Manager", "Director", "VP"]),
    department: yup.mixed().oneOf(["IT", "Marketing", "HR", "Engineering"]),
    employeeType: yup.mixed().oneOf(["FullTime", "PartTime", "Contract", "Seasonal"]),
    currentStatus: yup.boolean(),
  }),
});

app.post("/api/employees", (req, res) => {
  const employeeData = req.body;

  employeeSchema
    .validate(employeeData, { abortEarly: false })
    .then(() => {
      createEmployee(null, employeeData)
        .then((emp) => {
          res
            .json({
              createdEmployee: emp,
              message: "Employee created successfully!",
            })
            .status(200);
        })
        .catch((err) => {
          res
            .json({
              createdEmployee: null,
              message: "Something went wrong while creating a new employee. Please try again!",
            })
            .status(500);
        });
    })
    .catch((validationErrors) => {
      const errorMessages = validationErrors.errors;
      res.status(400).json({ errors: errorMessages });
    });
});

const GraphQlDateTypeResolver = new GraphQLScalarType({
  name: "GraphQlDateType",
  description: "A Date type for GraphQl",
  serialize(value) {
    return new Date(value).toISOString();
  },
  parseValue(value) {
    const newDate = new Date(value);
    return isNaN(newDate) ? undefined : newDate;
  },
});

const employeeList = async () => {
  const employees = await db.collection("employees").find().toArray();
  return employees;
};

const createEmployee = async (_root, { employee }) => {
  const employeeData = await db.collection("employees").insertOne(employee);
  return db.collection("employees").findOne({ _id: employeeData.insertedId });
};

const typeDefs = await readFile("./userSchema.graphql", "utf8");

const resolvers = {
  Query: {
    employeeList: employeeList,
  },
  GraphQlDateType: GraphQlDateTypeResolver,
  Mutation: {
    createEmployee: createEmployee,
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

await apolloServer.start();

app.use("/graphql", expressMiddleware(apolloServer));

connectToDb((url, err) => {
  if (!err) {
    app.listen(4000, () => {
      console.log("App is listening at port 4000!");
      console.log("GraphQl server started on http://localhost:4000/graphql");
      console.log(`MongoDb started on url ${url}`);
    });
    db = getDb();
  }
});
