import React, {Component} from 'react';
import test from './../test.css';
import {Select,Input,Button,Table,DatePicker,Upload,Icon} from 'antd';
const Option = Select.Option;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

export default class Data extends  Component{
    render(){
        const fileList = [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: '',
            thumbUrl: '',
            linkProps: '{"download": "file"}',
          }];
          
          const props = {
            action: '//jsonplaceholder.typicode.com/posts/',
            listType: 'picture',
            defaultFileList: [...fileList],
            accept:'file'
          };
          
          const props2 = {
            action: '//jsonplaceholder.typicode.com/posts/',
            listType: 'picture',
            defaultFileList: [...fileList],
            className: 'upload-list-inline',
          };
        return(<div>
                 <Upload {...props}>
                    <Button>
                    <Icon type="upload" /> 上传
                    </Button>
                 </Upload>
                   <br />
                   <br />
                 <Upload {...props2}>
                     <Button >
                    <Icon type="upload" /> upload
               </Button>
               </Upload>
         </div>)
    }
}