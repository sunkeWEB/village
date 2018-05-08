import React, {Component} from 'react';
import test from './../test.css';
import {Select,Input,Button,Table,DatePicker} from 'antd';
const Option = Select.Option;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

export default class Editwages extends  Component{
    render(){
        const columns = [{
            title: '序号',
            dataIndex: 'name',
            width:120
          }, {
            title: '乡 （镇、街道）',
            dataIndex: 'age',
            width:120
          }, {
            title: '村 （社区）',
            dataIndex: 'address',
            width:120
          },{
            title: '职务',
            dataIndex: 'address',
            width:120
          }, {
            title: '待遇级别',
            dataIndex: 'address',
            width:120
          }, {
            title: '每月报酬',
            dataIndex: 'address',
            width:120
          }, {
            title: '五险一金',
            dataIndex: 'address',
            width:120
          }, {
            title: '补贴定期增长计算年限',
            dataIndex: 'address',
            width:120
          },{
            title: '备注',
            dataIndex: 'address',
            width:120
          }];
          const data = [];
          for (let i = 0; i < 100; i++) {
            data.push({
              key: i,
              name: `Edward King ${i}`,
              age: 32,
              address: `London, Park Lane no. ${i}`,
            });
          }
        return(<div>
                 <div className="wages_head">
                    <div className="wages_choose">
                       <span>乡 （镇、街道）：</span>
                          <Select defaultValue="" style={{width:150}}>
                             <Option value="禹谟镇">禹谟镇</Option>
                             <Option value="沙土镇">沙土镇</Option>
                             <Option value="平坝镇">平坝镇</Option>
                             <Option value="西洛乡">西洛乡</Option>
                          </Select>
                    </div>
                    <div className="wages_choose">
                       <span>村 （社区）：</span>
                          <Select defaultValue="" style={{width:150}}>
                             <Option value="禹谟镇">禹谟镇</Option>
                             <Option value="沙土镇">沙土镇</Option>
                             <Option value="平坝镇">平坝镇</Option>
                             <Option value="西洛乡">西洛乡</Option>
                          </Select>
                    </div>
                        <div className="wages_choose">
                          <span>城市社区：</span>
                          <Select defaultValue="" style={{width:150}}>
                             <Option value="是">是</Option>
                             <Option value="否">否</Option>
                          </Select>
                        </div>
                        <div className="wages_choose">
                            <span>身份证号：</span>
                            <Input style={{width:150}}/>
                        </div>
                        <div className="wages_choose">
                       <span>状态查询：</span>
                          <Select defaultValue="" style={{width:170}}>
                             <Option value="在职">在职</Option>
                             <Option value="离任">离任</Option>
                          </Select>    
                    </div>
                    <Button className='edi_s' type="primary" icon="search">搜索</Button>
                 </div>
                 <div className="wages_table">
                 <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 350 }} bordered/>
                 </div>
                 <div style={{marginTop:30}}>
                 <Button style={{marginRight:20}}>编辑</Button>
            </div>
         </div>)
    }
}