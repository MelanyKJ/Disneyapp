import { Router } from "express";
import * as Controller from "./constroller"

const routerGender = Router();

routerGender.route("/").get(Controller.findAll)
routerGender.route("/create/").post(Controller.create)
routerGender.route("/destroy/:id").delete(Controller.destroy)
routerGender.route("/update/:id").put(Controller.update)
routerGender.route("/buscar/:id").get(Controller.findOneGender)
export default routerGender

