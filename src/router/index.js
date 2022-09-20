import { TestRouter } from "../components";
import { RouterMovie } from "../components";
import { RouterCharacter } from "../components";
// cada vez que quiera agregar unaruta nueva,
// creo el path e importo el componente
const listRoutes = [["/test", TestRouter],["/movie",RouterMovie],["/character",RouterCharacter]];

export const routes = (app) => {
  listRoutes.forEach(([path, controller]) => {
    app.use(path, controller);
  });
};
