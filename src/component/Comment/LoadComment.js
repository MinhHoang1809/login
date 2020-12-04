import React, { Component } from 'react'

import { Link } from 'react-router-dom'


export default class LoadComment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            responseDTO: {
                data: []
            },          
            searchDTO: { length: 10, start: 0, order: [{ column: 0, dir: "desc" }], columns: [{ data: "id" }] ,postId:0}
        }
    }
 
    componentDidMount() {
        const { match } = this.props;
        const postId = match.params.id
        console.log('1')
        let searchDTO = this.state.searchDTO;
        searchDTO.postId = postId;
        this.setState({ searchDTO })
        this.setState({ postId: postId })
        this.loadData2()
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

        this.loadData2()
    }

    loadMore = () => {
        let searchDTO = this.state.searchDTO;
        searchDTO.start = searchDTO.start + searchDTO.length;
        this.setState({ searchDTO })

        this.loadData2()
    }
    loadData2 = async () => {
        const ADD_USER_URL ="http://103.237.144.156:8080/api/comment/search" 
        console.log('2')
        try {
            let response = await fetch(ADD_USER_URL, {
                method: 'POST',
                headers: {
                    Accept: '*/*',
                    'content-type': "application/json;charset=utf-8"
                },
                body: JSON.stringify(this.state.searchDTO)
              
            })
            if (response.ok) {
                let resp = await response.json();
                console.log(resp)
                let oldResponseDTO = this.state.responseDTO;
                oldResponseDTO.data = oldResponseDTO.data.concat(resp.data)

                this.setState({ responseDTO: oldResponseDTO })
            }
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <div>
                <table style={{ border: '1px solid red' }}>
                    <tr >
                        <th style={{ border: '1px solid red' }}>name</th>
                        <th style={{ border: '1px solid red' }}>date</th>

                    </tr>
                    {this.state.responseDTO.data.map(com => {
                        return <tr>
                            <td style={{ border: '1px solid red' }}>{com.content}</td>
                            <td style={{ border: '1px solid red' }}>{com.createdDate}</td>

                        </tr>
                     
                    })}
                </table>

            </div>
        )


    }

}