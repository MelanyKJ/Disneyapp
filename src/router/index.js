import { TestRouter } from "../components";
import { RouterMovie } from "../components";
import { RouterCharacter } from "../components";
import { RouterGender } from "../components";
// cada vez que quiera agregar unaruta nueva,
// creo el path e importo el componente
const listRoutes = [["/test", TestRouter],["/movie",RouterMovie],["/character",RouterCharacter],["/gender", RouterGender]];
export const routes = (app) => {
  listRoutes.forEach(([path, controller]) => {
    app.use(path, controller);
  });
};
