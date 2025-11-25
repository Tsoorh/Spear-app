import bcrypt from "bcrypt";
import cryptr from "cryptr";
import { loggerService } from "../../service/logger.service.js";
import { authService } from "./auth.service.js";

export async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await authService.login(username,password);
    loggerService.info(`User login- ${user}`)

    const loginToken = authService.getLoginToken(user)
    res.cookie('loginToken',loginToken,{sameSite:'None',secure:true});

    res.json(user);
  } catch (err) {
    loggerService.error("Cannot login", err);
    res.status(400).send("Cannot login");
  }
}
export async function signup(req, res) {
  const credentials = req.body;

    try {
        const account = await authService.register(credentials);

  } catch (err) {
    loggerService.error("Cannot register", err);
    res.status(400).send("Cannot register");
  }
}
export async function logout(req, res) {
  try {
  } catch (err) {
    loggerService.error("Cannot logout", err);
    res.status(400).send("Cannot logout");
  }
}
