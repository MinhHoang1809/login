// import React from 'react'
// import { withRouter } from 'react-router-dom';

// class UpdateUser extends React.Component{
//     state={
//         name: "",
//         phone: "",
//         password: '',
//         roles: ['ROLE_MEMBER',"ROLE_ADMIN"],
//         address: ""
//     }
//     getIdUser = async () => {
//         const {match} = this.props;
//         const id = match.params.id;

//         const BASE_URL = "http://103.237.144.156:8080/api";
//         const getId_URL = BASE_URL + "/admin/user" + id;

//         try {
//             let response = await fetch(getId_URL, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type" : "application/json"
//                 }
//             })
//             if(response.ok){
//                 let resp = await response.json();
//                 this.setState(resp)
//             }
//         } catch (error) {
//             console.log(error)
//         }

//     }
//     sumbitUpdate = async () => {
//         const BASE_URL = "http://103.237.144.156:8080/api";
//         const getId_URL = BASE_URL + "/admin/user/update";
//         try {
//             let token = localStorage.getItem("token");
//             let response = await fetch(getId_URL, {
//                 method: "PUT",
//                 headers: {
//                     "Authorization" : "Basic " + token,
//                     "Content-Type" : "application/json"
//                 },
//                 body: JSON.stringify(this.state)
//             })
//             if(response.ok){
               
//                 alert("Update Success")
//                 const {history} = this.props;
//                 history.goBack();
//             }
//         } catch (error) {
//             console.log(error)
//         } 
//     }
//     render(){
//         return(
//             <React.Fragment>
//                 <div>
//                     <label htmlFor="">Name</label>
//                     <input type="text" name="name" onChange={ e => {
//                         this.setState({
//                             name: e.target.value
//                         })
//                     } }/>
//                 </div>
//                 <div>
//                     <label htmlFor="">Phone</label>
//                     <input type="text" name="phone" onChange={ e => {
//                         this.setState({
//                             phone: e.target.value
//                         })
//                     } }/>
//                 </div>
//                 <div>
//                     <label htmlFor="">Password</label>
//                     <input type="text" name="password" onChange={ e => {
//                         this.setState({
//                             password: e.target.value
//                         })
//                     } }/>
//                 </div>
//                 <div>
//                     <label htmlFor="">Adress</label>
//                     <input type="text" name="adress" onChange={ e => {
//                         this.setState({
//                             address: e.target.value
//                         })
//                     } }/>
//                 </div>
//                 <input type="button" onClick={this.sumbitUpdate} value="Sumbit"/>
//             </React.Fragment>
//         )
//     }
// }
// export default withRouter(UpdateUser)
import React from 'react';
import { withRouter } from 'react-router-dom';

class UpdateUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            phone: "",
            password: '',
            address: "",
        }

    }

    componentDidMount() {
        this.loadIdUser()
    }
    //can bind this o trong ham
    handleChangeName = (evt) => {
        this.setState({
            name: evt.target.value
        })
    }
    handleChangePhone = (evt) => {
        this.setState({
            phone: evt.target.value
        })
    }

    handleChangeAddress = (evt) => {
        this.setState({
            address: evt.target.value
        })
    }
    handleChangePassword = (evt) => {
        this.setState({
            password: evt.target.value
        })
    }

    loadIdUser = async () => {
        ///doc id
        const { match } = this.props;
        const id = match.params.id

        const BASE_URL = "http://103.237.144.156:8080/api";
        const SEARCH_CATEGORY_URL = BASE_URL + "/admin/user/" + id

        try {
            let token = localStorage.getItem("token")
            let resp = await fetch(SEARCH_CATEGORY_URL,
                {
                    method: "GET",
                    headers: {
                        "Authorization" : "Basic " + token,
                        "Content-Type": "application/json"
                    },
                }
            )

            if (resp.ok) {
                let user = await resp.json()
                this.setState(user)
            }
        } catch (err) {
            console.log(err)
        }
    }

    submit = async () => {
        const BASE_URL = "http://103.237.144.156:8080/api";
        const UPDATE_CATEGORY_URL = BASE_URL + "/admin/user/update"

        try {
            let token = localStorage.getItem("token")
            let resp = await fetch(UPDATE_CATEGORY_URL,
                {
                    method: "PUT",
                    headers: {
                        "Authorization": "Basic " + token,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.state)
                }
            )

            if (resp.ok) {
                this.setState({ success: "SUCCESS" })
                alert('thanhcong')
                const { history } = this.props
                history.goBack()
            }
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        //trong onclick phai truyen vao 1 ham
        return <div>
            <p>{this.state.success}</p>
            <div>
                <label>Name:</label>
                <input type="text" value={this.state.name} onChange={this.handleChangeName} />
            </div>
            <div>
                <label>phone:</label>
                <input type="text" value={this.state.phone} onChange={this.handleChangePhone} />
            </div>
            <div>
                <label>password:</label>
                <input type="text" value={this.state.password} onChange={this.handleChangePassword} />
            </div>
            <div>
                <label>address:</label>
                <input type="text" value={this.state.address} onChange={this.handleChangeAddress} />
            </div>
            <button onClick={this.submit}>Update</button>
        </div>
    }

}


export default withRouter(UpdateUser)