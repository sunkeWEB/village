import React, {Component} from 'react';
import {Select} from 'antd';
const Option = Select.Option;
class MySelect extends Component{
      render () {
          let Koa = <Select placeholder="用户角色" style={{flex: 1, width: 200}} notFoundContent={"没有可选项"}
                            defaultActiveFirstOption={true}
                            value={this.props.toid}
          >
              <Option value={1}>管理员</Option>
              <Option value={0}>超级管理员</Option>
          </Select>;
          const element = <h1>Hello, world</h1>;
          return (
              Koa
          )
      }
}

export default MySelect;