	import React, {Component} from 'react';  
	import './App.css';  
  import { Switch, Route } from "react-router-dom";
  import Home from "./Components/Home";
  import Bid from './Components/Bid';
  import Pt from './Components/pt';
  import History from './Components/History';
  import payment from './Components/Payment';
  import logout from './Components/Logout';

			const App = () => (
	      <Switch>
          <Route exact path="/" component={Home} />
		  <Route exact path="/Bid" component={Bid}/>
		  <Route exact path="/pt" component={Pt}/>
		  <Route exact path="/History" component={History}/>
		  <Route exact path="/Payment" component={payment}/>
		  <Route exact path="/Logout" component={logout}/>


        </Switch>
	    );  
	    
	
	  
	export default App;  
