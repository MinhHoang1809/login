import React from 'react';
import {Link, withRouter} from 'react-router-dom'

class UpdateCategory extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name : ''
        }
    }
    componentDidMount(){
        this.getIdCategory()
    }
    handleChang = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    getIdCategory = async () => {
        const {match} = this.props;
        const id = match.params.id;
        const BASE_URL = "http://103.237.144.156:8080/api";
        const SEARCH_CATEGORY_URL = BASE_URL + "/category/" + id;
        try {
            let resp = await fetch(SEARCH_CATEGORY_URL, {
                method : "GET",
                headers : {
                    "Content-Type" : "application/json"
                },
            })
            if(resp.ok){
                let category = await resp.json();
                this.setState(category)
            }
        } catch (error) {
            console.log(error)
        }
    }
    sumbit = async () => {
        const BASE_URL = "http://103.237.144.156:8080/api";
        const UPDATE_CATEGORY_URL = BASE_URL + "/admin/category/update"
        try {
            let token = localStorage.getItem("token")
            let resp = await fetch(UPDATE_CATEGORY_URL,
                {
                    method : "PUT",
                    headers : {
                        "Authorization" : "Basic " + token,
                        "Content-Type" : "application/json"
                    },
                    body : JSON.stringify(this.state)
                })
            if(resp.ok) {
                this.setState({success : "Success"})
                const {history} = this.props;
                history.goBack()
            }
        } catch (error) {
            console.log(error)
        }
    }
    render(){
        return (
        <div>
            <p>{this.state.success}</p>
            <div>
                <label htmlFor="">Name</label>
                <input type="text" value={this.state.name} onChange={this.handleChange} />
            </div>
            <button onClick={this.sumbit}>Update</button>
        </div>
        )}
}
export default withRouter(UpdateCategory)