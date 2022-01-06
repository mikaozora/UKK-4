import React from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import { base_url } from "../config.js"
import $ from 'jquery'; // <-to import jquery

export default class Lelang extends React.Component{
    constructor(){
        super()
        this.state = {
            lelang: [],
            // token: "",
            action: "",
            id: "",
            id_barang: "",
            tgl_lelang: "",
            harga_akhir: "",
            id_masyarakat: "",
            id_petugas: "",
            status: "",
            endtime: ""
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

    getLelang = () => {
        let url = base_url + "/lelang"
        axios.get(url) 
        // this.headerConfig() 
        .then(response=> {
            this.setState({lelang: response.data.data})
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
        this.getLelang()
    }

    Add = () => {
        $("#modal_lelang").modal("show");
        this.setState({
            action: "insert",
            id: 0,
            id_barang: "",
            tgl_lelang: "",
            harga_akhir: "",
            id_masyarakat: "",
            id_petugas: "",
            status: "",
            endtime: ""
        })
    }

    Edit = selectedItem => {
        $("#modal_lelang").modal("show")
        this.setState({
            action: "update",
            id: selectedItem.id,
            id_barang: selectedItem.id_barang,
            tgl_lelang: selectedItem.tgl_lelang,
            harga_akhir: selectedItem.harga_akhir,
            id_masyarakat: selectedItem.id_masyarakat,
            id_petugas: selectedItem.id_petugas,
            status: selectedItem.status,
            endtime: selectedItem.endtime
        })
    }

    saveLelang = event => {
        event.preventDefault()
        let form = {
            id: this.state.id,
            id_barang: this.state.id_barang,
            tgl_lelang: this.state.tgl_lelang,
            harga_akhir: this.state.harga_akhir,
            id_masyarakat: this.state.id_masyarakat,
            id_petugas: this.state.id_petugas,
            status: this.state.status,
            endtime: this.state.endtime
        }
      

        let url = base_url + "/lelang"
        if (this.state.action === "insert") {
            axios.post(url, form)
            // , this.headerConfig()
            .then(response => {
                window.alert(response.data.message)
                this.getLelang()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form)
            // , this.headerConfig()
            .then(response => {
                window.alert(response.data.message)
                this.getLelang()
            })
            .catch(error => console.log(error))
        }
        $("#modal_lelang").modal("hide")
    }

    dropLelang= selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/lelang/" + selectedItem.id
            axios.delete(url)
            // , this.headerConfig()
            .then(response => {
                window.alert(response.data.message)
                this.getLelang()
            })
            .catch(error => console.log(error))
        }
    }

    render(){
        return(
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-dark mt-2">Data Lelang</h3>
                    <div className="row">
                    <table className="table table-bordered table-hover text-center">
                        <thead>
                            <tr>
                                <th>ID Barang</th>
                                <th>Tanggal Lelang</th>
                                <th>Harga Akhir</th>
                                <th>ID Masyarakat</th>
                                <th>ID Petugas</th>
                                <th>Status</th>
                                <th>Endtime</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        { this.state.lelang.map( item => (
                            <tbody>
                                <tr>
                                    <td>{item.id_barang}</td>
                                    <td>{item.tgl_lelang}</td>
                                    <td>{item.harga_akhir}</td>
                                    <td>{item.id_masyarakat}</td>
                                    <td>{item.id_petugas}</td>
                                    <td>{item.status}</td>
                                    <td>{item.endtime}</td>
                                    <td>
                                        <div className="btn-group btn-group-toggle">
                                            <label className="btn btn-primary" onClick={() => this.Edit(item)} >
                                                Edit
                                            </label>
                                            <label className="btn btn-danger" onClick={() => this.dropLelang(item)}>
                                                Delete
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        )) }
                    </table>
                    </div>
                    <button className="btn btn-dark" onClick={() => this.Add()}>
                       Lelang Baru
                   </button>
                   <br></br>
                   <br></br>
                </div>

                {/* modal Lelang */}
                <div className="modal fade" id="modal_lelang">
                     <div className="modal-dialog">
                         <div className="modal-content">
                             <div className="modal-header">
                                 <h4>Form Data Lelang</h4>
                             </div>
                             <div className="modal-body">
                                 <form onSubmit={ev => this.saveLelang(ev)}>
                                     ID Barang
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.id_barang}
                                     onChange={ev => this.setState({id_barang: ev.target.value})}
                                     required
                                     />
                                     Tanggal Lelang
                                     <input type="date" className="form-control mb-1"
                                     value={this.state.tgl_lelang}
                                     onChange={ev => this.setState({tgl_lelang: ev.target.value})}
                                     required
                                     />
                                     Harga Akhir
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.harga_akhir}
                                     onChange={ev => this.setState({harga_akhir: ev.target.value})}
                                     required
                                     />
                                     ID Masyarakat
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.id_masyarakat}
                                     onChange={ev => this.setState({id_masyarakat: ev.target.value})}
                                     required
                                     />
                                     ID Petugas
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.id_petugas}
                                     onChange={ev => this.setState({id_petugas: ev.target.value})}
                                     required
                                     />
                                     Status
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.status}
                                     onChange={ev => this.setState({status: ev.target.value})}
                                     required
                                     />
                                     EndTime
                                     <input type="date" className="form-control mb-1"
                                     value={this.state.endtime}
                                     onChange={ev => this.setState({endtime: ev.target.value})}
                                     required
                                     />
                                    <button type="submit" className="btn btn-block btn-dark">
                                        Simpan
                                    </button>
                                 </form>
                             </div>
                         </div>
                     </div>
                 </div>
            </div>
        )
    }
}