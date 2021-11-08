import React from 'react'
import { Switch, Route } from "react-router-dom"
import Home from "./pages/Home"
import History from "./pages/History"
import Barang from "./pages/Barang"

export default class App extends React.Component{
  render(){
    return(
      <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/history" component={History}/>
          <Route path="/barang" component={Barang}/>
      </Switch>
    )
  }
}
