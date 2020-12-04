import React from 'react';
import { withRouter } from 'react-router-dom';

 class AddComment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: '',
            postId: 0,
        }
    }
    componentDidMount() {
         ///doc id
         const { match } = this.props;
         const postId = match.params.id
         this.setState({postId: postId})
    }

    


    handleChangeContent = (evt) => {
        this.setState({
            content: evt.target.value
        })
    }
    
    addComment = async () => {
        try {
            let token = localStorage.getItem("token")
           
            let response = await fetch('http://103.237.144.156:8080/api/member/comment/add', {
                method: "post",
                headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json;charset=utf-8",
                    "Authorization": "Basic " + token
                },
                body: JSON.stringify(this.state)
            })
            if (response.ok) {
                let responseDTO = await response.json();
                console.log(responseDTO);
                this.setState({ success: "SUCCESS" })
                alert("them bai viet thanh cong")
            }
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        //trong onclick phai truyen vao ham
        return (<div>
            <div>
                <label>Content:</label>
                <input type="text" onChange={this.handleChangeContent} />
            </div>
            
            <div>
                <button onClick={this.addComment}>ADD</button>
            </div>
        </div>
        );
    }
}
export default withRouter(AddComment)