import { Router } from "express";
import * as Controller from "./controller";

const routerMovie = Router();

routerMovie.route("/").get(Controller.findAll);
routerMovie.route("/").post(Controller.create);
routerMovie.route("/update/:id").put(Controller.update);
routerMovie.route("/detail/:id").get(Controller.findOneMovie);
export default routerMovie;
