import http from "http";
import url, { UrlWithParsedQuery } from "url";
import {
  createUser,
  deleteUser,
  updateUser,
  getUserById,
  getUsers,
  getUserDataWithoutHobbies,
} from "./controllers/userController";

import { addHobby, deleteHobby, getUserHobbies } from "./controllers/hobbyController";
import { writeResponse } from "./util";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
const express = require('express')

const app = express()
const swaggerDocument = YAML.load("./swagger.yaml");

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const server = http.createServer((req: any, res) => {
  const parsedUrl: any = url.parse(req.url, true);
  const userId = parseInt(parsedUrl.query.id, 10);
  const pathName = parsedUrl.pathname;
  let body = "";
  req.on("data", (chunk: any) => {
    body += chunk.toString();
  });

  switch(req.method) {
    case "GET":
      // Get list of users
      if (pathName === "/users") {
        getUsers(req, res);
      }

      // Get user by id
      if (pathName === "/user" && userId) {
        getUserById(req, res, userId);
      }

      // Get user data (without hobbies)
      if (parsedUrl.pathname === "/user-data" && userId) {
        getUserDataWithoutHobbies(req, res, userId);
      }

      // Get user hobbies
      if (parsedUrl.pathname === "/user/hobbies" && userId) {
        getUserHobbies(req, res, userId);
      }
    break;

    case "POST":
      if (pathName === "/users") {
        req.on("end", () => {
          createUser(req, res, body);
        });
      }

      if (pathName === "/user/hobbies" && userId) {
        req.on("end", () => {
          addHobby(req, res, userId, body);
        });
      }
    break;

    case "PUT":
      if (pathName === "/user" && userId) {
        req.on("end", () => {
          updateUser(req, res, userId, body);
        });
      }
      break;

    case "DELETE":
      if (pathName === "/user" && userId) {
        deleteUser(req, res, userId);
      }

      if (pathName === "/user/hobbies" && userId && parsedUrl.query.hobby) {
        deleteHobby(req, res, userId, parsedUrl.query.hobby)
      }
      break;

    default:
      writeResponse(res, 405, { error: `Method ${req.method} not implemented / allowed yet` });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
})