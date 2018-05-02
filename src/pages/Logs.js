import React, {Component} from 'react';
import {Table, Icon, Divider} from 'antd';

class Logs extends Component {
    render() {
        const columns = [{
            title: '操作id',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '操作用户',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: '操作时间',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '操作内容',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '操作类型',
            dataIndex: 'address',
            key: 'address',
        }];
        const data = [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        }, {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        }];
        return (
            <Table bordered columns={columns} dataSource={data} size="middle"/>
        )
    }
}

export default Logs;