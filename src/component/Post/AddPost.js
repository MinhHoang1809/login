import React from 'react'
export default class AddPost extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            description: "",
            categoryId: 0,
            selectedFile: null,
            categories: []
        }
    }
    //
    componentDidMount() {
        this.loadCategory()
    }
    //
    loadCategory = async () => {
        const BASE_URL = "http://103.237.144.156:8080/api";
        const SEARCH_CATEGORY_URL = BASE_URL + "/category/search"
        let searchDTO = { length: 100, start: 0 }
        try {
            let resp = await fetch(SEARCH_CATEGORY_URL,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(searchDTO)
                }
            )

            if (resp.ok) {
                let responseDTO = await resp.json()
                this.setState({ categories: responseDTO.data })
            }
        } catch (err) {
            console.log(err)
        }
    }
    //
    submitData = async () => {
        console.log(this.state)
        const BASE_URL = "http://103.237.144.156:8080/api";
        const ADD_CATEGORY_URL = BASE_URL + "/member/post/add"

        var data = new FormData()

        data.append("title", this.state.title)
        data.append("categoryId", this.state.categoryId)
        data.append("imageFile", this.state.selectedFile, this.state.selectedFile.name)
        try {
            let token = localStorage.getItem("token")
            let resp = await fetch(ADD_CATEGORY_URL,
                {
                    method: "POST",
                    headers: {
                        "Authorization": "Basic " + token,
                    },
                    body: data
                }
            )
            console.log(resp)
            if (resp.ok) {
                let responseDTO = await resp.json()
                console.log(responseDTO)
                this.setState({ success: "SUCCESS" })
                this.props.reload()
            }
        } catch (err) {
            console.log(err)
        }
    }
    //
    handleChangeFile = (evt) => {
        this.setState({
            selectedFile: evt.target.files[0]
        })
    }
    //
    handleChangeTitle = (evt) => {
        this.setState({
            title: evt.target.value
        })
    }
    //
    handleChangeDescription = (evt) => {
        this.setState({
            description: evt.target.value
        })
    }
    //
    handleChangeCategoryId = (evt) => {
        this.setState({
            categoryId: evt.target.value
        })
    }
    // handleChangeImageFile = (evt) => {

    // }
    render() {

        return <div>
            <p>{this.state.success}</p>
            <div>
                <form id="form-post">
                    <label>title</label>
                    <input type="text" name="title" onChange={
                        this.handleChangeTitle
                    }></input>
                    <label>description</label>
                    <input type="text" name="description" onChange={
                        this.handleChangeDescription
                    }></input>
                        <label>Category:</label>
                <select onChange={(event) => this.setState({ categoryId: event.target.value })}>
                    {
                        this.state.categories.map(item =>
                            <option key={item.id} value={item.id}>{item.name}</option>
                        )
                    }
                </select>
                <label>File:</label>
                <input type="file" onChange={this.handleChangeFile} accept="image/*" />
                    <input type="button" value="them" onClick={this.submitData} ></input>
                </form>
            </div>
        </div>
    }

}
