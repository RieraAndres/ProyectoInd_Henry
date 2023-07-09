import { Route } from "react-router-dom";

import Create from "./Views/Create/Create";
import Detail from "./Views/Detail/Detail";
import Home from "./Views/Home/home";

import "./App.css";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route path="/home/:id" component={Detail} />
        <Route path="/create" component={Create} />
      </Switch>
    </div>
  );
}

export default App;
