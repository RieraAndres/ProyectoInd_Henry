import { Route, Redirect } from "react-router-dom";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";

import Create from "./Views/Create/Create";
import Detail from "./Views/Detail/Detail";
import Home from "./Views/Home/home";
import Landing from "./Views/Landing/Landing";
import Error from "./Views/Error/Error";
import "./App.css";
import About from "./Views/About/About";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/welcome" />
          {/*Al cargar la pagina me lleva a /welcome*/}
        </Route>
        <Route path="/welcome" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route path="/home/:id" component={Detail} />
        <Route path="/create" component={Create} />
        <Route path="/about" component={About} />
        <Route path="*" component={Error} />
      </Switch>
    </div>
  );
}

export default App;
