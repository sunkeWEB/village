import React, { Component } from 'react';
import { Input,Button } from 'antd';
import test from './../test.css';

export default class App extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (<div className="bg_login">
                <div className="bg_tit">
                    <span style={{fontFamily:'华文琥珀',letterSpacing:8,fontSize:45,textShadow:'2px 1px #fff',color:'#d71518'}}>金沙县村干部管理系统</span>
                </div>
                <div className="bg_mesa">
                </div>
                <div className="bg_toum">
                    <Input style={{width:290,height:45,marginTop:70,marginLeft:90,opacity:'initial'}} placeholder='请输入账号'/>
                    <Input style={{width:290,height:45,marginTop:25,marginLeft:90}} placeholder='请输入密码'/>
                    <Button style={{width:290,height:45,marginTop:60,background:'#dd2f2e',marginLeft:90,border:'none'}} type="primary">登陆</Button>
                </div>
                <div className="bg_res">
                    <span style={{fontFamily:'宋体',fontSize:20,color:'black'}}>@2018贵州可靠智慧能源技术有限公司 All Rights Reserverd</span>
                </div>
            </div>
        );
    }
}
