import React, {Component} from 'react';
import {Button, Input} from 'antd';
import XLSX from 'xlsx';

class ExeclImport extends Component {
    dao() {

        var wb;//读取完成的数据
        var rABS = false; //是否将文件读取为二进制字符串

        console.log("开始");
        let obj = this.refs.file;
        const IMPORTFILE_MAXSIZE = 1*1024;//这里可以自定义控制导入文件大小
        let suffix = obj.files[0].name.split(".")[1]
        if(suffix != 'xls' && suffix !='xlsx'){
            alert('导入的文件格式不正确!')
            return
        }
        if(obj.files[0].size/1024 > IMPORTFILE_MAXSIZE){
            alert('导入的表格文件不能大于1M')
            return
        }

        let f = obj.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            var data = e.target.result;
            if(rABS) {
                wb = XLSX.read(btoa(this.fixdata(data)), {//手动转化
                    type: 'base64'
                });
            } else {
                wb = XLSX.read(data, {
                    type: 'binary'
                });
            }
            //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
            //wb.Sheets[Sheet名]获取第一个Sheet的数据
            // document.getElementById("demo").innerHTML= JSON.stringify( XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) );
            console.log(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
        };
        if(rABS) {
            reader.readAsArrayBuffer(f);
        } else {
            reader.readAsBinaryString(f);
        }


    }

     fixdata(data) { //文件流转BinaryString
        var o = "",
            l = 0,
            w = 10240;
        for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
        return o;
    }

    render() {
        return (
            <div>
                <input type="file" ref="file" onChange={(obj) => this.dao(obj)}/>
            </div>
        );
    }
}

export default ExeclImport;
