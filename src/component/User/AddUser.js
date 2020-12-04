import React from 'react'
import {Link, withRouter} from "react-router-dom"
import { configureStore } from '@reduxjs/toolkit'

class AddUser extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name: "",
            phone: "",
            password: "",
            roles: ['ROLE_MEMBER',"ROLE_ADMIN"],
            address: ""
        }
    }
    upUser = async () => {
        let token = btoa("0123456789:123456");
        let ADD_URL = "http://103.237.144.156:8080/api/admin/user/add";
     try {
       
        let response = await fetch(ADD_URL, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : "Basic "+ token
            },
            body: JSON.stringify(this.state)
        })
        console.log(response);
        if(response.ok){
            let resp = await response.json();
            console.log(resp.data)
            const {history} = this.props;
            history.replace("/admin/user");
        }
     } catch (error){
         console.log(error)
     }
    }
    render(){
        return(
          <form action="">
             <div>
                 <label htmlFor="">Name</label>
                 <input type="text" name="name" onChange={ e => {
                     this.setState({
                         name: e.target.value
                     })
                 } }/>
             </div>
             <div>
                 <label htmlFor="">Phone</label>
                 <input type="text" name="phone" onChange={ e => {
                     this.setState({
                         phone: e.target.value
                     })
                 } }/>
             </div>
             <div>
                 <label htmlFor="">Password</label>
                 <input type="text" name="password" onChange={ e => {
                     this.setState({
                         password: e.target.value
                     })
                 } }/>
             </div>
             <div>
                 <label htmlFor="">Address</label>
                 <input type="text" name="address" onChange={ e => {
                     this.setState({
                         address: e.target.value
                     })
                 } }/>
             </div>
             <div>
                 <input type="button" value="Sumbit" onClick={this.upUser}/>
                 <Link to="/admin/user">Quay lai</Link>
             </div>
          </form>
        )
    }
}
export default withRouter(AddUser);

