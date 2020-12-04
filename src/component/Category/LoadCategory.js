import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import AddCategory from './AddCategory'
import UpdateCategory from './UpdateCategory'
class LoadCategory extends React.Component{
    state = {
        responseDTO: {
            data: []
        },
        searchDTO: { length: 10, start: 0, order: [{ column: 0, dir: "desc" }], columns: [{ data: "id" }] }
    }
    componentDidMount(){
        this.loadCategory();
    }   
    loadMore = () => {
        let searchDTO = this.state.searchDTO;
        searchDTO.start = searchDTO.start + searchDTO.length;
        this.setState({ searchDTO })
        this.loadCategory();
    }
     
    loadCategory = async () => {
        let token = btoa("0123456789:123456");
        let loadCategory_URL = "http://103.237.144.156:8080/api/category/search";
        try {
            let response = await fetch(loadCategory_URL, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : "Basic " + token
                },
                body: JSON.stringify({})
            })
            if(response.ok){
                console.log(response);
                let resp = await response.json();
                let oldResponseDTO =this.state.responseDTO;
                oldResponseDTO.data =oldResponseDTO.data.concat(resp.data)
                this.setState({
                    responseDTO:oldResponseDTO
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    reset = () => {
        let searchDTO = this.state.searchDTO;
        searchDTO.start = 0;//reset ve 0
        this.setState({ searchDTO })

        this.setState({
            responseDTO: {
                data: []
            }
        })

        this.loadCategory()
    }
    render(){
        return(
            <React.Fragment>
                <Link to="/admin/category/add">Add</Link>
             <ul style={{display: 'flex',width: 500,justifyContent:'space-around',border: '1px solid #333'}}>
               <li>Id</li>
               <li>Name</li>
           </ul>
           {this.state.responseDTO.data.map(user => {
            return (
                    <LoadItem reset={this.reset} user={user}  />                
            ) 
             })}
             <input type="button" onClick={this.loadMore} value="Load More"/>

            </React.Fragment>
        )
    }
}
class LoadItem extends React.Component{
    deleteCategory = async (id) => {
        let token = btoa("0123456789:123456");
        let DELETE_CATEGORY_URL = "http://103.237.144.156:8080/api/admin/category/delete?id=" + String(id);
        try {
            let response = await fetch(DELETE_CATEGORY_URL, {
                method : "DELETE",
                headers : {
                    "Authorization" : "Basic " + token, 
                }
            })
            if(response.ok){
                this.props.reset()
            }
        } catch (error) {
            console.log(error)
        }
    }
    render(){
        return(
            <div style={{display:'flex',width:900,justifyContent:'space-around'}}>
                <li>{this.props.user.id}</li>
                <li>{this.props.user.name}</li>
                <input type="button" onClick={ () => {
                    this.deleteCategory(this.props.user.id)
                } } value="Delete"/>
                <Link to={"/admin/category/updateCategory/" + this.props.user.id}>Update</Link>                
            </div>
        )
    }
}
export default withRouter(LoadCategory)