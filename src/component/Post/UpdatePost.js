import React from 'react';
import {withRouter} from 'react-router-dom';
class UpdatePost extends React.Component{
     state = {
        title: '',
        decription: '',
        categoryId: 0,
        selectedFile: null
     }
     componentDidMount(){
         this.getPost();
     }
     getPost = async () => {
         const {match} = this.props;
         const id = match.params.id;
         const  BASE_URL = "http://103.237.144.156:8080/api";
         const GET_POST_URL = BASE_URL + "/post/" + id;
         try {
             let response = await fetch(GET_POST_URL, {
                 method : "GET",
                 headers : {
                     "Content-Type" : "application/json"
                 }
             })
             if(response.ok) {
                 let resp = await response.json();
                 this.setState(resp)
             }
         } catch (error) {
             console.log(error)
         }
     }
     updatePost = async () => {
            const BASE_URL = "http://103.237.144.156:8080/api";
            const UPDATE_POST_URL = BASE_URL + "/admin/post/update";
            try {
                let token = localStorage.getItem("token");
                let response = await fetch(UPDATE_POST_URL, {
                    method : "PUT",
                    headers : {
                        "Authorization" : "Basic " + token,
                        "Content-Type" : "application/json"
                    },
                    body : JSON.stringify(this.state)
                })
                if(response.ok){
                    let resp = await response.json();
                    this.setState({success : "Success"});
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
                 <p>{this.state.success}</p>
                 <div>
                     <label>Title :</label>
                     <input type="text" name="title" value={this.state.title} onChange={e=>{
                         this.setState({
                             title : e.target.value
                         })
                     }}/>
                     <label>Description: </label>
                     <input type="text" name="description" value={this.state.decription} onChange={e=>{
                         this.setState({
                             decription : e.target.value
                         })
                     }} id=""/>
                     <label>Category : </label>
                     <input type="text" name="categoryId" value={this.state.categoryId} onChange={e=>{
                         this.setState({
                             categoryId : e.target.value
                         })
                     }} />
                     <label>File :</label>
                     <input type="file" value={this.state.selectedFile} onChange={e=>{
                         this.setState({
                             selectedFile : e.target.files[0]
                         })
                     }} id=""/>
                 </div>
                 <input type="button" onClick={this.updatePost} value="Update"/>
             </React.Fragment>
         )
     }
}
export default withRouter(UpdatePost)