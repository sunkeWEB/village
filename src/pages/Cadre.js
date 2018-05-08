import React,{Component} from 'react';
import {Button, Input,Table,Select} from 'antd';
import {readcadre} from './../api/api';
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
                return "用户操作";
            }
        }
    ];

    render () {
        return (
            <div>
                <div style={{display: 'flex'}}>
                    <div style={{display: 'flex', marginBottom: 15, flex: 1, justifyContent: 'flex-end'}}>
                        <div>
                            <Select placeholder="乡(镇 街道)" style={{width: 120}}
                                    notFoundContent={"没有可选项"}>

                            </Select>
                        </div>
                        <div style={{marginLeft: 15}}>
                            <Input placeholder="姓名"/>
                        </div>
                        <div style={{marginLeft: 15}}>
                            <Button type="primary">查询</Button>
                        </div>
                    </div>
                </div>
                <Table bordered dataSource={this.state.data} columns={this.columns}/>
            </div>
        )
    }
}
export default Cadre;