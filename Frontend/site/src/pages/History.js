import React from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import { base_url } from "../config.js"
import $ from 'jquery'; // <-to import jquery

export default class History extends React.Component{
    constructor(){
        super()
        this.state = {
            history: [],
            // token: "",
            id: "",
            id_lelang: "",
            id_masyarakat: "",
            penawaran_harga: ""
        }

        // if (localStorage.getItem("token")) {
        //     this.state.token = localStorage.getItem("token")
        // } else {
        //     window.location = "/login"
        // }
        // this.headerConfig.bind(this)

    }

    // headerConfig = () => {
    //     let header = {
    //         headers: { Authorization: `Bearer ${this.state.token}` }
    //     }
    //     return header
    // }

    getHistory = () => {
        let url = base_url + "/history"
        axios.get(url) 
        // this.headerConfig() 
        .then(response=> {
            this.setState({history: response.data.data})
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
        this.getHistory()
    }


    dropHistory= selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/history/" + selectedItem.id
            axios.delete(url)
            // , this.headerConfig()
            .then(response => {
                window.alert(response.data.message)
                this.gethistory()
            })
            .catch(error => console.log(error))
        }
    }

    render(){
        return(
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-dark mt-2">History Lelang</h3>
                    <div className="row">
                    <table className="table table-bordered table-hover text-center">
                        <thead>
                            <tr>
                                <th>ID Lelang</th>
                                <th>ID Masyarakat</th>
                                <th>Penawaran Harga</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        { this.state.history.map( item => (
                            <tbody>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.nama_history}</td>
                                    <td>{item.tgl}</td>
                                    <td>{item.harga_awal}</td>
                                    <td>{item.deskripsi}</td>
                                    {/* <td>{product_image_url + "/" + item.image}</td> */}
                                    <td>Gambar</td>
                                    <td>
                                        <div className="btn-group btn-group-toggle">
                                            <label className="btn btn-danger" onClick={() => this.dropHistory(item)}>
                                                Delete
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        )) }
                    </table>
                    </div>
                   <br></br>
                   <br></br>
                </div>
            </div>
        )
    }
}