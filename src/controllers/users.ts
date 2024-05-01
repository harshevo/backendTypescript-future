import express from "express";
import NodeCache from "node-cache";

import { getUsers } from "./userController";

const myCache = new NodeCache();

export const getAllUsers = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    let users;

    if (myCache.has("users")) {
      users = JSON.parse(<string>myCache.get("users"));
    } else {
      users = await getUsers();
      myCache.set("users", JSON.stringify(users));
    }

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
