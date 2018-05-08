import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {loadDate} from './../reducer/user.redux';
@withRouter
@connect(state=>state, {loadDate})
class AuthRoute extends React.Component {
    constructor (props) {
        super(props);
        this._init();
    }
  async  _init() {
        const publicList = ['/login'];
        const pathname = this.props.location.pathname;
        if (publicList.indexOf(pathname) > -1) {
            return false;
        }
        axios.get('/users/info').then((res) => {
            console.log(res);
            if (res.status === 200) {
                if (res.data.code === 0) {
                    // 有登录信息
                    console.log("有登录信息");
                    this.props.loadDate(res.data);
                } else {
                    // 没有登录信息
                    this.props.history.push('/login');
                }
            }
        })
    }
    render() {
        return null;
    }
}

export default AuthRoute;