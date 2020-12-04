import React from 'react'
import {Link, withRouter} from 'react-router-dom'

class AddCategory extends React.Component{
     state = {
         name: ''
     }
    addCategory = async () => {
        let token = btoa("0123456789:123456");
        const BASE_URL = "http://103.237.144.156:8080/api";
        const ADD_CATEGORY_URL = BASE_URL + "/admin/category/add";
        try {
            let response = await fetch(ADD_CATEGORY_URL, {
                method: "POST",
                headers: {
                    "Authorization" : "Basic " + token,
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(this.state)
            })
            console.log(response);
            if(response.ok){
                let resp = await response.json();
                this.setState(resp)
                alert("Add Category success")
                const {history} = this.props;
                history.goBack();
            }
        } catch (error) {
            console.log(error)
        }
    }
     render(){
         return(
            <React.Fragment>
                <div>
                    <label htmlFor="">Name</label>
                    <input type="text" name="name" onChange={ e => {
                        this.setState({
                            name : e.target.value
                        })
                    }} id=""/>
                    <button onClick={this.addCategory}>Add</button>
                </div>
            </React.Fragment>
         )
     }
}
export default withRouter(AddCategory)