import React from 'react';
import { Link } from 'react-router-dom';
import AddUser from './AddUser'
import UpdateUser from './UpdateUser'

export default class LoadUser extends React.Component{
    constructor(props){
        super(props)
        this.state={
            responseDTO:{
                data: []
            },
            searchDTO: { length: 10, start: 0, order: [{ column: 0, dir: "desc" }], columns: [{ data: "id" }] }
        }
    }
    componentDidMount(){
        this.loadUser();
    }


    loadUser = async () => {
        try {
            let token = btoa("0123456789:123456")
            let response = await fetch("http://103.237.144.156:8080/api/admin/accounts", {
                method: "POST",
                headers:{
                    "Authorization" : "Basic " + token,
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({})
            })
            console.log(response);
            if(response.ok){
                let resp = await response.json();
                console.log(resp);
                
                // let oldresponseDTO = responseDTO;
                // oldresponseDTO.data = oldresponseDTO.data.concat(responseDTO.data);
                this.setState({
                    responseDTO : resp
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    loadMore = () => {
        let searchDTO = this.state.searchDTO;
        searchDTO.start = searchDTO.start + searchDTO.length;
        this.setState({searchDTO: searchDTO});

        this.loadUser();
    }

    reset = () => {
        let searchDTO = this.state.searchDTO;
        searchDTO.start = 0;
        this.setState({searchDTO:searchDTO});
        this.loadUser();
    }



    render(){
        return(
            <div>
               
                <Link to="/admin/addUser">Add</Link>
                <table className="menu-loadUser" >
                    <th>id</th>
                    <th>name</th>
                    <th>password</th>
                    <th>phone</th>
                    <th>address</th>
                    <th>roles</th>
                    <th>options</th>               
                </table>
                <ul>
                {this.state.responseDTO.data.map(user => {
                        return (
                            <div className="loadItem">
                                <LoadItem user={user}  /> 
                            </div>
                        ) 
                })}
                </ul>
               <input type="button" value="Load More" onClick={this.loadMore}/>
           
            </div>
        )
    }
};



class LoadItem extends React.Component{
    
    deleteUser = async (id) => {
        let token = btoa("0123456789:123456");
        let DELETE_URL = "http://103.237.144.156:8080/api/admin/user/delete/" + String(id);
        try {
            let response = await fetch(DELETE_URL, {
                method: "DELETE",
                headers: {
                    "Authorization" : "Basic "+ token
                }
            })
            console.log(response)
            if(response.ok){
               
                alert("Delete Succes");   
                   
            }
        } catch (error) {
            console.log(error)
        }
    }
    render(){
        return(
            <li>
                <ul className="sub-menu-loadUser">
                    <li>{this.props.user.id}</li>
                    <li>{this.props.user.name}</li>
                    <li>{this.props.user.password}</li>
                    <li>{this.props.user.phone}</li>
                    <li>{this.props.user.address}</li>
                    <li>{this.props.user.roles}</li>
                    <input type="button" onClick={() => this.deleteUser(this.props.user.id)} value="Delete"/>
                    <Link to={"/admin/updateUser/" + this.props.user.id}>Update</Link>
                </ul>
            </li>    
        )
    }
}