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
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" style={{height: 60, color: 'white'}}/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"  onClick={(e) => this.jumpRorte(e.key)}>
                        <Menu.Item key="1">
                            <Icon type="home"/>
                            <span>首页</span>
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
                            <Menu.Item key="6">职务查询</Menu.Item>
                            <Menu.Item key="8">职位编辑</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub3"
                            title={<span><Icon type="team"/><span>薪资计算</span></span>}
                        >
                            <Menu.Item key="9">在职薪资查询</Menu.Item>
                            <Menu.Item key="10">离职薪资查询</Menu.Item>
                            <Menu.Item key="11">薪资设置管理</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="14">
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
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff',position:'relative'}}>
                        <div style={{display:'flex',alignItems:'center'}}>
                            <div>
                                <Icon
                                    className="trigger"
                                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                    onClick={this.toggle}
                                />
                            </div>
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
                    <Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
                        <Switch>
                            <Route path="/logs" component={Logs}/>
                            <Route path="/users" component={Users}/>
                            <Route path="/addtown" component={Town}/>
                            <Route path="/ecexl" component={ExeclImport} />
                            <Route path="/cadre" component={Cadre} />
                            <Route path="/addcadre" component={CadreAdd} />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default App;
