import React, {Component} from 'react';
import test from './../test.css';
import {Select,Input,Button,Table,DatePicker} from 'antd';
const Option = Select.Option;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

export default class Station extends  Component{
    render(){
        const columns = [{
            title: '序号',
            dataIndex: 'name',
            width:150
          }, {
            title: '乡 （镇、街道）',
            dataIndex: 'age',
            width:150
          }, {
            title: '村 （社区）',
            dataIndex: 'address',
            width:150
          }, {
            title: '职务名称',
            dataIndex: 'address',
            width:150
          }, {
            title: '享受待遇级别',
            dataIndex: 'address',
            width:150
          }, {
            title: '职务在职人数',
            dataIndex: 'address',
            width:150
          }, {
            title: '在职人姓名',
            dataIndex: 'address',
            width:150
          }, {
            title: '在职人身份证号',
            dataIndex: 'address',
            width:150
          }, {
            title: '在职人联系方式',
            dataIndex: 'address',
            width:150
          }, {
            title: '职务空缺数',
            dataIndex: 'address',
            width:150
          }, {
            title: '备注',
            dataIndex: 'address',
            width:150
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
                       <span>职务名称：</span>
                          <Select defaultValue="" style={{width:170}}>
                             <Option value="党支书">党支书</Option>
                             <Option value="群众">群众</Option>
                             <Option value="所长">所长</Option>
                             <Option value="村长">村长</Option>
                          </Select>    
                    </div>
                    <Button className='dim_s' type="primary" icon="search">搜索</Button>
                 </div>
                 <div className="wages_table">
                 <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 350 }} bordered/>
                 </div>
         </div>)
    }
}