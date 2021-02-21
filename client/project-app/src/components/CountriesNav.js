import { Nav } from "react-bootstrap";
import { Link, useHistory, Switch,Route } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import CountriesSnapshot from './countriesSnapshot/CountriesSnapshot'
import UserCountriesList from "./userListCountries/UserCountriesList"
import Hello from './Hello'
export default function CountriesNav() {
  const history = useHistory();
  return (
    <div>
    <Hello/>
      <Nav variant="tabs" defaultActiveKey="defaultActive" >
  <Nav.Item>
    <LinkContainer to="/nav/countriesSnapshot">
    <Nav.Link eventKey="defaultActive" > countries Snapshot</Nav.Link>
    </LinkContainer>
  </Nav.Item>
  <Nav.Item>
<LinkContainer to="/nav/userCountriesList"> 
    <Nav.Link> My Countries List</Nav.Link>
    </LinkContainer>
  </Nav.Item>
</Nav> 
<Switch>
        <Route component={CountriesSnapshot} path="/nav/countriesSnapshot" />
        <Route component={UserCountriesList} path="/nav/userCountriesList" />
      </Switch>
   </div>
  )
}
