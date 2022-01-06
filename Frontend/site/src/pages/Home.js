import React from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import { base_url } from "../config.js"
import 'bootstrap'

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            // token: "",
            petugasName: null,
            dataBarang: 0,
            dataLelang: 0,
            dataHistory: 0
            
        }

        // if (localStorage.getItem("token")) {
        //     this.state.token = localStorage.getItem("token")
        // } else {
        //     window.location = "/login"
        // }

    }

    // headerConfig = () => {
    //     let header = {
    //         headers: { Authorization: `Bearer ${this.state.token}` }
    //     }
    //     return header
    // }

    getPetugas = () => {
        let petugas = JSON.parse(localStorage.getItem('petugas'))
        this.setState({petugasName: petugas.nama_petugas})
    }

    getBarang = () => {
        let url = base_url + "/barang"
        axios.get(url)
        .then(response=> {
            this.setState({dataBarang: response.data.data.length})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    // this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }

    getLelang = () => {
        let url = base_url + "/lelang"
        axios.get(url)
        .then(response=> {
            this.setState({dataLelang: response.data.data.length})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    // this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }

    getHistory = () => {
        let url = base_url + "/history_lelang"
        axios.get(url)
        .then(response=> {
            this.setState({dataHistory: response.data.data.length})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    // this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }


    componentDidMount(){
        // this.getPetugas()
        this.getBarang()
        this.getLelang()
        this.getHistory()
    }

    render(){
        return(
            <div>
                
                <Navbar />
                <div className="container mt-2">
                    <h3 className="my-2">
                        <strong>Welcome back, Petugas {this.state.petugasName}</strong>
                    </h3>
                    <div className="row">
                        {/* barang count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-dark">
                                    <h4 className="text-white">
                                        <strong>Data Barang</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.dataBarang}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* lelang count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-secondary">
                                    <h4 className="text-white">
                                        <strong>Data Lelang</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.dataLelang}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* history count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-dark">
                                    <h4 className="text-white">
                                        <strong>Data History</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.dataHistory}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            

            </div>
        )
    }
}
