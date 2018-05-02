import React, {Component} from "react";
import {Input,Button} from 'antd';
import {connect} from 'react-redux';
import {Logins} from './../reducer/user.redux';
import axios from 'axios';
@connect(state=>state,{
    Logins
})
class Login extends Component {
    componentWillMount () {
        console.log(this.props)
    }
    _submitLogin () {
        this.props.Logins();
        console.log("_submitLogin");
       // Logins({name:'root',pwd:'sunke'})();
        // axios.post('users/login', {name:'root',pwd:'sunke1'}).then(res => {
        //     console.log(res);
        // });
    }
    render() {
        return (
            <div>
                <Button onClick={this._submitLogin}>登录</Button>
            </div>
        )
    }
}

export default Login;