import axios from 'axios';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const ERR_MSG = 'ERR';

const init = {
    name: '',
    msg: '',
    age: 12
};

export function user(state = init, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {...state, isAuth: true, msg: '', redicertTo: ''};
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
    console.log("Logins", {name, pwd});
    return dispatch => {
        console.log("dispatch");
        axios.post('/users/login', {name, pwd}).then(res => {
            console.log(res);
            if (res.status === 200 && res.data.code === 0) {
                dispatch(loginSuccess(res.data.data));
            } else {
                dispatch(errMsg(res.data.msg));
            }
        });
    };
}
