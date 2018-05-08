import React, {Component} from 'react';
import test from './../test.css';
import {Select,Input,Button,Table,DatePicker,Icon} from 'antd';
const Option = Select.Option;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

export default class Wages extends  Component{
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
          }, {
            title: '姓名',
            dataIndex: 'address',
            width:120
          }, {
            title: '身份证号',
            dataIndex: 'address',
            width:120
          }, {
            title: '职务（在职）',
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
            title: '年限补贴',
            dataIndex: 'address',
            width:120
          }, {
            title: '五险一金',
            dataIndex: 'address',
            width:120
          }, {
            title: '其他',
            dataIndex: 'address',
            width:120
          }, {
            title: '总工资',
            dataIndex: 'address',
            width:120
          }, {
            title: '月份',
            dataIndex: 'address',
            width:120
          }, {
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
                        <span>姓名：</span>
                            <Input style={{width:120}}/>   
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
                        <div className="wages_choose">
                       <span>职务：</span>
                          <Select defaultValue="" style={{width:170}}>
                             <Option value="党支书">党支书</Option>
                             <Option value="群众">群众</Option>
                             <Option value="所长">所长</Option>
                             <Option value="村长">村长</Option>
                          </Select>    
                    </div>
                    <div className="wages_date">
                            <DatePicker className="wages_data_pic" placeholder="起始日期"  icon='caret-down'/>
                            <DatePicker placeholder="结束日期" />
                        </div>
                    <Button className='dim_s' type="primary" icon="search">搜索</Button>
                 </div>
                 <div className="wages_table">
                 <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 350 }} bordered/>
                 </div>
                 <div>
                   <Button>导出</Button>
                 </div>
         </div>)
    }
}