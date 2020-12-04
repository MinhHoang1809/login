import React, { Component } from 'react';
import {  Link, Route, Switch } from 'react-router-dom';
import LoadUser from "../component/User/LoadUser"
import AddCategory from "../component/Category/AddCategory"
import UpdateCategory from "../component/Category/UpdateCategory"
import LoadCategory from "../component/Category/LoadCategory"

import AddUser from '../component/User/AddUser';
import UpdateUser from "../component/User/UpdateUser"
import LoadPost from '../component/Post/LoadPost';
import AddPost from '../component/Post/AddPost';
import AddComment from '../component/Comment/AddComment';
import LoadComment from '../component/Comment/LoadComment';


class Admin extends React.Component{
  render(){
    return(
      <div>
        <h1>Welcome</h1>
        <AdminMenu /> 
        <AdminRoute />
      </div>
    )
  }
}
function AdminMenu(){
  return(
            <ul>
                <li><Link to="/admin/user">User</Link></li>
                <li><Link to="/admin/category">Category</Link></li>
                <li><Link to="/admin/post">Post</Link></li>
                <li><Link to="/admin/comment">Comment</Link></li>
            </ul>
  )
}
function AdminRoute(){
          return(
        <Switch>
          <Route path="/admin/user">
               <LoadUser />
          </Route>
          <Route path="/admin/category" exact>
                <LoadCategory />
          </Route>
          <Route path="/admin/category/add">
                <AddCategory />
          </Route>
        
          
          <Route path="/admin/addUser">
            <AddUser />
          </Route>
          <Route path="/admin/updateUser/:id">
            <UpdateUser />
          </Route>
          <Route path="/admin/category/updateCategory/:id">
            <UpdateCategory />
          </Route>
       
       
          <Route path="/admin/post/add" exact>
            
            <AddPost />
            
        </Route>
        <Route path="/admin/post" exact>
          <LoadPost />
        </Route>
        <Route path="/admin/comment/add/:id"  >
            
            <AddComment />
            
        </Route>
        <Route path="/admin/comment/:id" component={LoadComment}exact>
        </Route>
      
        </Switch>
)
}
export default Admin;



    



