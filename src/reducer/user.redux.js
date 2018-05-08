import axios from 'axios';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const ERR_MSG = 'ERR';
const init = {
    name: '',
    msg: '',
    token: '',
    errMsg: '',
    redicertTo:''
};

export function user(state = init, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            let x = action.payload;
            localStorage.setItem('token', x.token);
            return {...state, isAuth: true, errMsg: '', redicertTo: '/', token: x.token, name: x.data.realname};
        case ERR_MSG:
            return {...state, errMsg: action.msg}
        default:
            return state;
    }
}

function loginSuccess(data) {
    return {type: LOGIN_SUCCESS, payload: data}
}

function errMsg(msg) {
    return {type: ERR_MSG, msg: msg}
}

export function Logins({name, pwd}) {
    return dispatch => {
        axios.post('/users/login', {name, pwd}).then(res => {
            console.log(res);
            if (res.status === 200 && res.data.code === 0) {
                dispatch(loginSuccess(res.data));
            } else {
                dispatch(errMsg(res.data.msg)); // 登录错误
            }
        });
    };
}

export function loadDate(data) {
    return {type: LOGIN_SUCCESS, payload: data}
}