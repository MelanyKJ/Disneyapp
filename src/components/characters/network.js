import { Router } from "express";
import * as Controller from "./controller";

const routerCharacter = Router();

routerCharacter.route("/").get(Controller.findAll);
routerCharacter.route("/").post(Controller.create);
routerCharacter.route("/update/:id").put(Controller.update);
routerCharacter.route("/detail/:id").get(Controller.findOneCharacter);
export default routerCharacter;
