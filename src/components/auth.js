import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

@withRouter
@connect(null, {})
class AuthRoute extends React.Component {
    componentDidMount() {
        console.log(this.props);
        let x = '';
        console.log(x === '123');
        // if (x === '') {
        //     return false;
        // } else {
        //     this.props.history.push('/logins');
        // }
    }

    render() {
        return null;
    }
}

export default AuthRoute;