import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Lista from './components/listPokemon';
import Dash from './components/dashboard';
import PageNotFound from './components/notFound';
import Nav from './components/navbar';
function App() {
  return (
    <Router>
      <div className="App">
      <Nav/>
      <Switch>
        <Route exact path="/" component={Lista} />
        <Route exact path="/dashboard" component={Dash} />
        <Route component={PageNotFound} />
      </Switch>
     </div>
    </Router>
    
  );
}

export default App;
