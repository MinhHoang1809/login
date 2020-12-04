import React from 'react';
import { Link } from 'react-router-dom';

export default class LoadPost extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            responseDTO: {
                data: [],
            },
            searchDTO: { length: 10, start: 0, order: [{ column: 0, dir: "desc" }], columns: [{ data: "id" }] }
        }
    }

    componentDidMount() {
        this.loadPost();
    }

    reset = () => {
        let searchDTO = this.state.searchDTO;
        searchDTO.start = 0;
        this.setState({ searchDTO })
        this.setState({
            responseDTO: {
                data: []
            }
        })
        this.loadPost()
    }

    loadMore = () => {
        let searchDTO = this.state.searchDTO;
        searchDTO.start = searchDTO.start + searchDTO.length;
        this.setState({ searchDTO })
        this.loadPost()
    }

    loadPost = async () => {
        const BASE_URL = "http://103.237.144.156:8080/api";
        const SEARCH_POST_URL = BASE_URL + '/post/search'

        try {
            let resp = await fetch(SEARCH_POST_URL, {
                method: 'POST',
                headers: {
                    Accept: '*/*',
                    'content-type': "application/json;charset=utf-8"
                },
                body: JSON.stringify({})
            })
            if (resp.ok) {
                let responseDTO = await resp.json()

                let oldResponseDTO = this.state.responseDTO;
                oldResponseDTO.data = oldResponseDTO.data.concat(responseDTO.data)

                this.setState({ responseDTO: oldResponseDTO })
            }
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return <div>
         <Link to={'/admin/post/add'}>Them</Link>
            <table border="1">
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>CategoryID</th>
                    <th>Image</th>
                    <th>Action</th>
                </tr>
                { this.state.responseDTO.data.map(post => {
                    return <RowItem post={ post } reset={ this.reset } />
                }) }
            </table>
            <button onClick={ this.loadMore }>Load more</button>
        </div>
    }
}
class RowItem extends React.Component {
    deleteData = async (id) => {
        const BASE_URL = "http://103.237.144.156:8080/api"
        const DELETE_POST_URL = BASE_URL + "/admin/post/delete/"
        try {
            let token = localStorage.getItem("token")
            let resp = await fetch(DELETE_POST_URL + id, {
                method: 'DELETE',
                headers: {
                    Accept: '*/*',
                    'content-type': "application/json;charset=utf-8",
                    'Authorization': 'Basic ' + token
                },
            })
            if (resp.ok) {
                this.props.reset()
            }
        } catch (err) {
            console.log(err)
        }
    }
    render() {
        return (
            <tr>
                <td>{ this.props.post.id }</td>
                <td>{ this.props.post.title }</td>
                <td>{ this.props.post.decription }</td>
                <td>{ this.props.post.categoryId }</td>
                <td ><img style={{width: '100px', height: '100px'}}  src={ `http://103.237.144.156:8080/image/${this.props.post.images}` } ></img>
                <Link to={'/admin/comment/add/' +this.props.post.id }>AddComment</Link>
                </td>
                <td><button onClick={ () => this.deleteData(this.props.post.id) }>Delete</button>
                    <Link to={ '/admin/post/update/' + this.props.post.id }>Update      </Link>
                    <Link to={'/admin/comment/' + this.props.post.id}>ListComment</Link>

                </td>
            </tr>

        )
    }
}
