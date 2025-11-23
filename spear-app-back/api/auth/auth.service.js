import bcrypt from "bcrypt";
import { userService } from "../user/user.service.js";
import Cryptr from "cryptr";

const cryptr = new Cryptr(process.env.SECRET_KEY);

export const authService = {
  login,
  getLoginToken,
  register,
};

async function login(username, password) {
  const user = await userService.getByUser(username);
  if (!user) throw "Unknown username";

  // check password
  const match = bcrypt.compare(password, user.password);
  if (!match) return "Invalid username or password";

  // passing only safe details
  const miniUser = {
    _id: user._id,
    username: user.username,
    name: user.name,
    img: user.img,
    admin: user.admin,
  };
  return miniUser;
}

async function getLoginToken(user) {
  const str = JSON.stringify(user);
  const encryptedStr = cryptr.encrypt(str);
  return encryptedStr;
}

async function register({ username, password, name }) {
    const saltRounds = 10;

    if(!username || !password || !fullname) return 'missing required information';
    
    const userExist = userService.getByUser(name)
}
