import React from "react"
import Navbar from "../Components/Navbar"
import axios from 'axios'
import { base_url } from "../config";
import './Home.css';

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            dataBarang:[]
    }
}
getBarang=()=>{
    let url = base_url + "/barang"
    axios.get(url).then(r=>{
        this.setState({dataBarang:r.data})
        console.log(this.state.dataBarang);
    })
}
componentDidMount(){
    this.getBarang()
}
    render(){
        return(
            
            <div><Navbar />
            <div >
            <div >
            <h1 class="mosoengga" >Lelang lebih mudah dengan senangNgoding</h1>
            <p>halp</p>
            {this.state.dataBarang.map(item=>{
                (<p>{item.harga_awal}</p>)
            })}
                </div>
            </div>
        
        </div>
        
            
        )
    }
    }

