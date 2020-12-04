
import React, { Component } from 'react';
import { withRouter } from 'react-router';
class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password:'',
            error: false
        }
    }
    login = async () => {
     
        const BASE_URL = "http://103.237.144.156:8080/api";
        const MEMBER_URL = BASE_URL + "/member/me"
      
        try {
            let token = btoa(this.state.username + ":" + this.state.password)
            let resp = await fetch(MEMBER_URL, 
                {
                method: "POST",
                headers: {
                    "Authorization": "Basic " + token,
                    "Content-Type": "application/json"
                },
            })
         
        
            if(resp.ok){
                let userDTO = await resp.json();
                console.log(userDTO)
                localStorage.setItem("token",token);
                localStorage.setItem("user",JSON.stringify(userDTO))
                const {history} = this.props;
                history.replace("/admin")
            }else {
                                this.setState({
                                    error: true
                                })
                            }
        } catch (error) {
            console.log(error)
        }
    }
    render(){
        return (
            <div>
                <div>
                    <label htmlFor="">Username</label>
                    <input type="text"  onChange={ e => {
                       this.setState({
                           username: e.target.value
                       })
                    }} />
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input type="password"  onChange={ e => {
                       this.setState({
                           password: e.target.value
                       })
                    }} />
                </div>
                {this.state.error && <div>Tai khoan va mat khau sai</div>}
                <div>
                   <button onClick={this.login}>Login</button>
                </div>
            </div>
        )
    }
}
export default withRouter(Login)

