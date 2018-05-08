import React,{Component} from 'react';
import {Button, Input,Table,Select,Popconfirm,Icon} from 'antd';
import {readcadre,delcadre} from './../api/api';
import MyTownSelect from './../components/MyTownSelect'; // 乡镇选择
class Cadre extends Component{
    constructor (props) {
        super(props);
        this.state = {
            data:[]
        };
    }

   async componentWillMount () {
       let m = await readcadre();
       this.setState({
           data:m.data
       });
    }

   async serch () {
        let {data, ...b} = {...this.state}; // 过滤data
        let m = await readcadre({...b});
       this.setState({
           data:m.data
       });
    }

   async delcadres (id) {
       let k = await delcadre({id});
       console.log(k);
    }

    getBirthdayFromIdCard (idCard) {
        var birthday = "";
        if(idCard != null && idCard != ""){
            if(idCard.length == 15){
                birthday = "19"+idCard.substr(6,6);
            } else if(idCard.length == 18){
                birthday = idCard.substr(6,8);
            }
            birthday = birthday.replace(/(.{4})(.{2})/,"$1-$2-");
        }

        return birthday;
    }


    columns = [
        {
            title: '姓名',
            dataIndex: 'realname',
        }, {
            title: '性别',
            dataIndex: 'sex',
            render: (value)=>{
                return value === 1 ? "男" : "女";
            }
        },{
            title: '乡(镇 街道)',
            dataIndex: 'townid',
        },{
            title: '村(社区)',
            dataIndex: 'village',
        },{
            title: '城市社区',
            dataIndex: 'iscity',
        },{
            title: '身份证',
            dataIndex: 'card',
        },{
            title: '出生年月',
            render: (value,record) =>{
                return this.getBirthdayFromIdCard(record.card)
            }
        },{
            title: '民族',
            dataIndex: 'mingzu',
        },{
            title: '学历',
            dataIndex: 'edu',
        },{
            title: '入党时间',
            dataIndex: 'jointime',
        },{
            title: '是否下派',
            dataIndex: 'isxiapai',
            render: (value, record) => {
               return value===1 ? "是":"否"
            }
        },{
            title: '联系电话',
            dataIndex: 'phone',
        },{
            title: '生存情况',
            dataIndex: 'scqk',
            render: (value,record)=>{
                return value===0 ? "健在": "辞世"
            }
        },
        // {
        //     title: '备注',
        //     dataIndex: 'beizhu',
        // },
        {
            title: '操作',
            render: (value, record) => {
                // let {realname, userpwd, username, role, townid, roles, id} = {...value};
                // let townids = townid;
                return (<div>
                    <Popconfirm placement="topLeft" title="你确定删除嘛?"
                                okText="果断删除"
                                cancelText="取消"
                                onConfirm={() => this.delcadres(record.id)}
                    >
                        <Icon title={"谨慎删除操作"} type="delete"
                              style={{marginRight: 15, fontSize: 18, cursor: "pointer"}}/>
                    </Popconfirm>
                    <Icon type="edit" title={"编辑信息"}
                          style={{marginRight: 15, fontSize: 18, cursor: "pointer"}}/>
                </div>)
            }
        }
    ];

    render () {
        return (
            <div>
                <div style={{display: 'flex'}}>
                    <div style={{display: 'flex', marginBottom: 15, flex: 1, justifyContent: 'flex-end'}}>
                        <div>
                            <MyTownSelect isprops={true} selectTown={(e)=>this.state.townid=e} selectVillage={(e)=>this.state.villagesid=e.villagesid} />
                        </div>
                        <div style={{marginLeft: 15}}>
                            <Input placeholder="姓名" onChange={(e)=>this.state.name=e.target.value}/>
                        </div>
                        <div style={{marginLeft: 15}}>
                            <Button type="primary" onClick={()=>this.serch()}>查询</Button>
                        </div>
                    </div>
                </div>
                <Table bordered dataSource={this.state.data} columns={this.columns}/>
            </div>
        )
    }
}
export default Cadre;