import React, {Component} from 'react';
import {Select} from 'antd';
import {readposts} from './../api/api';

const Option = Select.Option;

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    async componentDidMount() {
        let posts = await readposts();
        console.log(posts);
        this.setState({
            posts:posts.data
        });
    }

    render() {
        return (
            <div>
                <Select style={{width: 120}} placeholder={"选择职务"} className={"zw"} onChange={(v)=>this.props.selectPost(v)}>
                    {this.state.posts.map((v, index) => {
                        return <Option value={v.id}>{v.realname}</Option>
                    })}
                </Select>
            </div>
        )
    }
}

export default Posts;