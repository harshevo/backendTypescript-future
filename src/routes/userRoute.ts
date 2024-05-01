import express from "express";
import { login, register } from "../controllers/authenticationController";
import { getAllUsers } from "../controllers/users";
import { isAuthenticated } from "../middlewares";

const router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
  return res.status(200).json({ messge: "Server Health Good" });
});

router.post("/auth/register", register);

router.post("/auth/login", login);

router.get("/users", isAuthenticated, getAllUsers);

export default router;
