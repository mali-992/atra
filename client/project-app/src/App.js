import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/Store";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import CountriesNav from "./components/CountriesNav"
import CountriesSnapshot from "./components/countriesSnapshot/CountriesSnapshot";
import UserListCountries from "./components/userListCountries/UserCountriesList";
import { useEffect } from "react";

function App() {


  return (
    <Provider store={store}>
      <Router>
        
        <div className="container">
          {}
          </div>
          <Switch>
            <Route component={Login} path="/login" />
            <Route component={Signup} path="/signup" />
            <Route component={CountriesNav} path="/nav">       
            </Route>
     
          </Switch>
        
        <Redirect to="/login"></Redirect>
      </Router>
    </Provider>
  );
}

export default App;
