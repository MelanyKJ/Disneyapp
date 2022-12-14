import { Router } from "express";
import * as Controller from "./controller";

const routerCharacter = Router();

//routerCharacter.route("/").get(Controller.findAll);
routerCharacter.route("/").post(Controller.create);
routerCharacter.route("/update/:id").put(Controller.update);
routerCharacter.route("/remove/:id").delete(Controller.remove);
routerCharacter.route("/detail/:id").get(Controller.findOneCharacter);
routerCharacter.route("/").get(Controller.FindByQuery);
export default routerCharacter;
