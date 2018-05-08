import React, {Component} from 'react';
import {Layout, Menu, Icon,Popconfirm,Dropdown} from 'antd';
import {withRouter, Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Logs from './pages/Logs';
import Users from './pages/Users';
import Town from './pages/Addvillage';
import ExeclImport from './components/Execl';
import Cadre from './pages/Cadre';
import CadreAdd from './pages/CadreAdd';
import Home from './pages/Home';
import Wages from './pages/Wages';
import Editwages from './pages/Editwages';
import Leave from './pages/Leave';
import Station from './pages/Station';
import Stationset from './pages/Stationset';
import test from './test.css';
import Dimission from './pages/Dimission';
import Statistics from './pages/Statistics';
import Data from './pages/Data';
const {Header, Sider, Content} = Layout;
const SubMenu = Menu.SubMenu;
@withRouter
@connect(state=>state,{})
class App extends Component {
    state = {
        collapsed: false,
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    jumpRorte (path) {
        this.props.history.push(path);
    }

    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/"><Icon type={"unlock"} /> 修改密码</a>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/"><Icon type={'logout'} /> 退出登录</a>
                </Menu.Item>
            </Menu>
        );
        return (
            <Layout>
                <Sider
                    style={{background:'#1c4987'}}
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" style={{height: 60, color: 'white'}}/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"  onClick={(e) => this.jumpRorte(e.key)} style={{background:'#1c4987'}}>
                        <Menu.Item key="/Home">
                            <Icon type="home"/>
                            <span>首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</span>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="user"/><span>干部信息管理</span></span>}
                        >
                            <Menu.Item key="/cadre">干部信息查询</Menu.Item>
                            <Menu.Item key="/addcadre">干部信息录入</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={<span><Icon type="solution"/><span>机构管理</span></span>}
                        >
                            <Menu.Item key="/Station">职务查询</Menu.Item>
                            <Menu.Item key="/Stationset">职务设置</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub3"
                            title={<span><Icon type="team"/><span>薪资计算</span></span>}
                        >
                            <Menu.Item key="/wages">在职薪资查询</Menu.Item>
                            <Menu.Item key="/Editwages">在职薪资管理</Menu.Item>
                            <Menu.Item key="/Dimission">离职补贴查询</Menu.Item>
                            <Menu.Item key="/Leave">离职补贴管理</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="/Statistics">
                            <Icon type="pie-chart"/>
                            <span>统计报表</span>
                        </Menu.Item>
                        <SubMenu
                            key="sub4"
                            title={<span><Icon type="setting"/><span>系统管理</span></span>}
                        >
                            <Menu.Item key="/addtown">乡镇添加</Menu.Item>
                            {/*<Menu.Item key="/logs">社区村添加</Menu.Item>*/}
                            <Menu.Item key="/users">用户管理</Menu.Item>
                            <Menu.Item key="/logs">日志记录</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="/Data">
                            <Icon type="file"/>
                            <span>资料管理</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{position:'relative'}} className="DDD">
                        <div style={{display:'flex',alignItems:'center'}}>
                            <div>
                                <Icon
                                    className="trigger"
                                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                    onClick={this.toggle}
                                />
                            </div>
                            <span style={{color:'white',marginLeft:30}}>金沙县村干部信息管理系统</span>
                            <div style={{flex:1,justifyContent:'flex-end',display:'flex',marginRight:60}}>
                                <div style={{fontSize:16,marginRight:10,fontWeight:700}}>中午好,{this.props.user.name}</div>
                                <Dropdown overlay={menu}>
                                    <a className="ant-dropdown-link" href="#">
                                        <div style={{width:45,height:'100%'}}>
                                            <img className="avatar" src={require("./public/avatar.jpg")} alt="头像" style={{width:45,height:45}} />
                                        </div>
                                    </a>
                                </Dropdown>
                            </div>
                        </div>
                    </Header>
                    <Content style={{minHeight:280,background:'#fff',margin:'10px 16px 0px 16px',padding:10}}>
                        <Switch>
                            <Route path="/logs" component={Logs}/>
                            <Route path="/users" component={Users}/>
                            <Route path="/addtown" component={Town}/>
                            <Route path="/ecexl" component={ExeclImport} />
                            <Route path="/cadre" component={Cadre} />
                            <Route path="/addcadre" component={CadreAdd} />
                            <Route path="/Home" component={Home}/>
                            <Route path="/Station" component={Station}/>
                            <Route path="/Stationset" component={Stationset}/>
                            <Route path="/wages" component={Wages}/>
                            <Route path="/Leave" component={Leave}/>
                            <Route path="/Editwages" component={Editwages}/>
                            <Route path="/Dimission" component={Dimission}/>
                            <Route path="/Statistics" component={Statistics}/>
                            <Route path="/Data" component={Data}/>
                        </Switch>
                    </Content>
                    <div className="foot_tit">
                        <span>@2018贵州可靠智慧能源技术有限公司 All Right Reserved.</span>
                    </div>
                </Layout>
            </Layout>
        );
    }
}

export default App;
