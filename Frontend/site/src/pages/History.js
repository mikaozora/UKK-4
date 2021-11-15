import React from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import { base_url } from "../config.js"
import $ from 'jquery'; // <-to import jquery

export default class History extends React.Component{
    constructor(){
        super()
        this.state = {
            barang: [],
            // token: "",
            action: "",
            id: "",
            nama_barang: "",
            tgl: "",
            harga_awal: "",
            deskripsi: "",
            image: "",
            uploadFile: true,
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

    getBarang = () => {
        let url = base_url + "/api/v1/barang"
        axios.get(url) 
        // this.headerConfig() 
        .then(response=> {
            this.setState({barang: response.data.data})
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
        this.getBarang()
    }

    Add = () => {
        $("#modal_barang").modal("show");
        this.setState({
            action: "insert",
            id: 0,
            nama_barang: "",
            tgl: "",
            harga_awal: "",
            deskripsi: "",
            image: null,
            uploadFile: true
        })
    }

    Edit = selectedItem => {
        $("#modal_barang").modal("show")
        this.setState({
            action: "update",
            id: selectedItem.id,
            nama_barang: selectedItem.nama_barang,
            tgl: selectedItem.tgl,
            harga_awal: selectedItem.harga_awal,
            deskripsi: selectedItem.deskripsi,
            image: null,
            uploadFile: false
        })
    }

    saveBarang = event => {
        event.preventDefault()
        let form = {
            id: this.state.id,
            nama_barang: this.state.nama_barang,
            tgl: this.state.tgl,
            harga_awal: this.state.harga_awal,
            deskripsi: this.state.deskripsi
        }
      

        let url = base_url + "/api/v1/barang"
        if (this.state.action === "insert") {
            axios.post(url, form)
            // , this.headerConfig()
            .then(response => {
                window.alert(response.data.message)
                this.getBarang()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form)
            // , this.headerConfig()
            .then(response => {
                window.alert(response.data.message)
                this.getbarang()
            })
            .catch(error => console.log(error))
        }
        $("#modal_barang").modal("hide")
    }

    dropBarang= selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/api/v1/barang/" + selectedItem.id
            axios.delete(url)
            // , this.headerConfig()
            .then(response => {
                window.alert(response.data.message)
                this.getBarang()
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
                                <th>ID Barang</th>
                                <th>Nama Barang</th>
                                <th>Tanggal Upload</th>
                                <th>Harga Awal</th>
                                <th>Deskripsi</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        { this.state.barang.map( item => (
                            <tbody>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.nama_barang}</td>
                                    <td>{item.tgl}</td>
                                    <td>{item.harga_awal}</td>
                                    <td>{item.deskripsi}</td>
                                    {/* <td>{product_image_url + "/" + item.image}</td> */}
                                    <td>
                                        <div className="btn-group btn-group-toggle">
                                            <label className="btn btn-primary" onClick={() => this.Edit(item)} >
                                                Edit
                                            </label>
                                            <label className="btn btn-danger" onClick={() => this.dropBarang(item)}>
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
                        Tambah Barang
                   </button>
                   <br></br>
                   <br></br>
                </div>

                {/* modal Barang */}
                <div className="modal fade" id="modal_barang">
                     <div className="modal-dialog">
                         <div className="modal-content">
                             <div className="modal-header">
                                 <h4>Form Data Barang</h4>
                             </div>
                             <div className="modal-body">
                                 <form onSubmit={ev => this.saveBarang(ev)}>
                                     Nama Barang
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.nama_barang}
                                     onChange={ev => this.setState({nama_barang: ev.target.value})}
                                     required
                                     />
                                     Harga Awal
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.harga_awal}
                                     onChange={ev => this.setState({harga_awal: ev.target.value})}
                                     required
                                     />
                                     Deskripsi
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.deskripsi}
                                     onChange={ev => this.setState({deskripsi: ev.target.value})}
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