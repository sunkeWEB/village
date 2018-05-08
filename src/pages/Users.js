import React, {Component} from 'react';
import {Table, Select, Input, Button, Checkbox, Popconfirm, Icon, Pagination, Modal} from 'antd';
import {readvillage, addusers, readusers, delusers, updateusers} from './../api/api';
import Modals from './../components/modals';
import MySelect from './../components/MySelect';

const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            town: [],
            village: [],
            addusermodal: false,
            userpwd: '',
            username: '',
            realname: '',
            townids: '',
            role: "",
            roles: '{}',
            data: [],
            townid: '', // 查询乡镇
            villageid: '', // 查询乡村
            name: '',// 名字查询
            page: {
                pageSize: 10,
                total: 0,
                current: 1,
                size: 10
            }
        };
    }

    state = {
        selectedRowKeys: [], // Check here to configure the default column
    };
    columns = [
        {
            title: '姓名',
            dataIndex: 'realname',
        }, {
            title: '乡(镇 街道)',
            dataIndex: 'townname',
        }
// , {
//     title: '创建时间',
//     dataIndex: 'address',
// }
        ,
        {
            title: '角色',
            dataIndex: 'role',
            render: (value) => {
                return value === 0 ? '超级管理员' : '管理员';
            }
        },
//  {
//     title: '权限',
//     dataIndex: 'address',
// }
        {
            title: '操作',
            width: '20%',
            render: (value, record) => {
                let {realname, userpwd, username, role, townid, roles, id} = {...value};
                let townids = townid;
                return (<div>
                    <Popconfirm placement="topLeft" title="你确定删除嘛?"
                                okText="果断删除"
                                cancelText="取消"
                                onConfirm={() => this.deluser(value.id)}
                    >
                        <Icon title={"谨慎删除操作"} type="delete"
                              style={{marginRight: 15, fontSize: 18, cursor: "pointer"}}/>
                    </Popconfirm>
                    <Icon type="edit" title={"编辑信息"} onClick={() => this.setState({
                        addusermodal: true,
                        realname,
                        username,
                        userpwd,
                        role,
                        townids,
                        roles,
                        editid: id
                    })}
                          style={{marginRight: 15, fontSize: 18, cursor: "pointer"}}/>
                </div>)
            }
        }
    ];
    autharr = [
        {
            name: 'xxlr',
            renmame: '人员信息录入'
        },
        {
            name: 'gwlr',
            renmame: '岗位信息录入'
        },
        {
            name: 'xzlr',
            renmame: '薪资信息录入'
        },
        {
            name: 'yhlr',
            renmame: '薪资信息录入'
        },
        {
            name: 'townlr',
            renmame: '乡镇信息录入'
        },
        {
            name: 'xxsc',
            renmame: '人员信息删除'
        }
    ];

    async deluser(id) {
        let k = await delusers({id});
        let page = this.state.page;
        let data = await readusers({pagesize: page.pageSize, current: page.current}); // 获取用户
        let pages = {...this.state.page, total: data.count}
        this.setState({data: data.data, page: pages});
    }

    async componentDidMount() {
        let town = await readvillage(); // 获取镇
        this.setState({town: town.data});
        let page = this.state.page;
        let data = await readusers({pagesize: page.pageSize, current: page.current}) || []; // 获取用户
        console.log(data);
        let pages = {...this.state.page, total: data.count}
        this.setState({town: town.data, data: data.data, page: pages});
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    }

    onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }

    async handleChange(value) {
        let village = await readvillage({parentid: value}); // 获取村
        this.setState({
            village: village.data,
            townid: value
        });
    }

    async addUsers() {
        let {userpwd, username, realname, role, roles, townids,} = {...this.state};
        let m = await addusers({userpwd, username, realname, role, townid: townids, roles: roles});
        this.search();
    }

    handleInput(k, v) {
        this.setState({
            [k]: v
        });
    }

    handlechebox(key, value) {
        let m = JSON.parse(this.state.roles);
        let roles = {...m, [key]: value};
        this.setState({
            roles: JSON.stringify(roles)
        });
    }

    async page(e) {
        this.state.page.current = e.current;
        let page = this.state.page;
        let data = await readusers({pagesize: page.pageSize, current: page.current}); // 获取用户
        let pages = {...this.state.page, total: data.count}
        this.setState({data: data.data, page: pages});
    }

    async search() {
        let {townid, villageid, name} = {...this.state};
        let page = this.state.page;
        let data = await readusers({pagesize: page.pageSize, current: 1, townid, villageid, name}); // 获取用户
        let pages = {...this.state.page, total: data.count}
        this.setState({data: data.data, page: pages});
    }

    resulttown(v) {
        this.state.town.map(v => {
            console.log(v.id === v);
            if (v.id === v) {
                return v.townname;
            }
        })
    }

    clamodel() {
        this.setState({
            addusermodal: false,
            editid: '',
            roles: '{}',
            role: '',
            username: '',
            userpwd: '',
            realname: '',
            townids: ""
        })
    }

    async update() {
        let {userpwd, username, realname, role, roles, townids, editid} = {...this.state};
        let m = await updateusers({
            id: editid,
            userpwd,
            username,
            realname,
            role,
            townid: townids,
            roles: roles,
            townid: townids
        });
        this.search();
    }

    render() {
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            selections: [{
                key: 'all-data',
                text: 'Select All Data',
                onSelect: () => {
                    this.setState({
                        selectedRowKeys: [...Array(46).keys()], // 0...45
                    });
                },
            }, {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    this.setState({selectedRowKeys: newSelectedRowKeys});
                },
            }, {
                key: 'even',
                text: 'Select Even Row',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    this.setState({selectedRowKeys: newSelectedRowKeys});
                },
            }],
            onSelection: this.onSelection,
        };
        let state = this.state;
        let page = this.state.page;
        console.log("edit", state.editid);
        return (
            <div>
                <Modal
                    title={"添加用户"}
                    visible={this.state.addusermodal}
                    onOk={() => state.editid ? this.update() : this.addUsers()}
                    onCancel={() => this.clamodel()}
                    cancelText={"取消"}
                    okText={state.editid ? "修改" : "确定"}
                >
                    <div style={{display: 'flex', alignItems: 'baseline', marginBottom: 10}}>
                        <div style={{width: 120, textAlign: 'center'}}>乡(镇 街道)</div>
                        <Select placeholder="乡(镇 街道)" style={{flex: 1}} onChange={(v) => this.handleInput('townids', v)}
                                notFoundContent={"没有可选项"}
                                value={state.townids}
                        >
                            {this.state.town.map((v, index) =>
                                <Option value={v.id} key={index}>{v.townname}</Option>
                            )}
                        </Select>
                    </div>

                    <div style={{display: 'flex', alignItems: 'baseline', marginBottom: 10}}>
                        <div style={{width: 120, textAlign: 'center'}}>真实姓名</div>
                        <div style={{flex: 1}}>
                            <Input value={state.realname} placeholder={"真实姓名"}
                                   onChange={(v) => this.handleInput('realname', v.target.value)}/>
                        </div>
                    </div>

                    <div style={{display: 'flex', alignItems: 'baseline', marginBottom: 10}}>
                        <div style={{width: 120, textAlign: 'center'}}>登录名</div>
                        <div style={{flex: 1}}>
                            <Input value={state.username} placeholder={"登录账号"}
                                   onChange={(v) => this.handleInput('username', v.target.value)}/>
                        </div>
                    </div>

                    <div style={{display: 'flex', alignItems: 'baseline', marginBottom: 10}}>
                        <div style={{width: 120, textAlign: 'center'}}>密码</div>
                        <div style={{flex: 1}}>
                            <Input value={state.userpwd} placeholder={"登录密码"}
                                   onChange={(v) => this.handleInput('userpwd', v.target.value)}/>
                        </div>
                    </div>

                    <div style={{display: 'flex', alignItems: 'baseline', marginBottom: 10}}>
                        <div style={{width: 120, textAlign: 'center'}}>角色</div>
                        <Select placeholder="用户角色" style={{flex: 1}} notFoundContent={"没有可选项"}
                                onChange={(v) => this.handleInput('role', v)}
                                value={state.role}
                        >
                            <Option value={1}>管理员</Option>
                            <Option value={0}>超级管理员</Option>
                        </Select>
                    </div>

                    <div style={{display: 'flex', alignItems: 'baseline', marginBottom: 10}}>
                        <div style={{width: 120, textAlign: 'center'}}>权限</div>
                        <div style={{flex: 1}}>
                            {this.autharr.map((g, index) => {
                                let status = JSON.parse(state.roles)[g.name] || false
                                return <Checkbox key={index} checked={status}
                                                 onChange={(v) => this.handlechebox(`${g.name}`, v.target.checked)}>{g.renmame}</Checkbox>
                            })}
                        </div>
                    </div>
                </Modal>


                <div style={{display: 'flex'}}>
                    <div>
                        <Button type="primary" onClick={() => this.setState({addusermodal: true})}>添加用户</Button>

                        {/*<Button type="primary" onClick={() => this.setState({addusermodal: true})}>导入</Button>*/}

                    </div>
                    <div style={{display: 'flex', marginBottom: 15, flex: 1, justifyContent: 'flex-end'}}>
                        <div>
                            <Select placeholder="乡(镇 街道)" style={{width: 120}} onChange={(v) => this.handleChange(v)}
                                    notFoundContent={"没有可选项"}>
                                {this.state.town.map((v, index) =>
                                    <Option value={v.id} key={index}>{v.townname}</Option>
                                )}
                            </Select>
                        </div>
                        <div style={{marginLeft: 15}}>
                            <Input placeholder="姓名" onChange={(v) => this.state.name = v.target.value}/>
                        </div>
                        <div style={{marginLeft: 15}}>
                            <Button type="primary" onClick={() => this.search()}>查询</Button>
                        </div>
                    </div>
                </div>
                <Table pagination={{pageSize: page.size, total: page.total}} onChange={(e) => this.page(e)}
                       columns={this.columns} dataSource={this.state.data} bordered/>
            </div>
        )
    }
}

export default Users;