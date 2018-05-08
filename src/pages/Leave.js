import React, {Component} from 'react';
import test from './../test.css';
import {Select,Input,Button,Table,DatePicker} from 'antd';
const Option = Select.Option;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

export default class Dimission extends Component{
    state={
        rowSelection:{
            selections:true,
            hideDefaultSelections:true,
        }
    }

        render(){
            const columns = [{
                title: '乡（镇、街道）',
                dataIndex: 'name',
                key: 'name',
                width: 150,
              }, {
                title: '村（社区）',
                dataIndex: 'age',
                key: 'age',
                width: 150,
              }, {
                title: '城市社区',
                dataIndex: 'address',
                key: 'address',
                width:150
              }, {
                title: '性别',
                key: 'action',
                width: 150,
              }, {
                  title: '年龄',
                  key: 'action',
                  width: 150,
                }, {
                  title: '离任补贴标准',
                  key: 'action',
                  width: 150,
                }, {
                  title: '累计年限',
                  key: 'action',
                  width: 150,
                }, {
                  title: '连续年限',
                  key: 'action',
                  width: 150,
                }];
              const data = [];
              for (let i = 1; i <= 1000; i++) {
                data.push({
                  key: i,
                  name: 'John Brown',
                  age: `${i}2`,
                  address: `New York No. ${i} Lake Park`,
                });
              }
            return(<div>
                <div className="wages_head">
                   <div className="wages_choose">
                      <span>乡 （镇、街道）：</span>
                         <Select defaultValue="" style={{width:120}}>
                            <Option value="禹谟镇">禹谟镇</Option>
                            <Option value="沙土镇">沙土镇</Option>
                            <Option value="平坝镇">平坝镇</Option>
                            <Option value="西洛乡">西洛乡</Option>
                         </Select>
                   </div>
                   <div className="wages_choose">
                      <span>村 （社区）：</span>
                         <Select defaultValue="" style={{width:120}}>
                            <Option value="禹谟镇">禹谟镇</Option>
                            <Option value="沙土镇">沙土镇</Option>
                            <Option value="平坝镇">平坝镇</Option>
                            <Option value="西洛乡">西洛乡</Option>
                         </Select>
                   </div>
                       <div className="wages_choose">
                         <span>城市社区：</span>
                         <Select defaultValue="" style={{width:120}}>
                            <Option value="是">是</Option>
                            <Option value="否">否</Option>
                         </Select>
                       </div>
                       <div className="wages_choose">
                           <span>身份证号：</span>
                           <Input style={{width:160}}/>
                       </div>
                   <Button className="lea_s" type="primary" icon="search">搜索</Button>
                </div>
                <div className="wages_table">
                <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 350 }} bordered {...this.state}/>
                </div>
             <div style={{marginTop:30}}>
                 <Button style={{marginRight:20}}>修改</Button>
                 <Button>增加</Button>
            </div>
        </div>)
   }
}