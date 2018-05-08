import React, {Component} from 'react';
import {readvillage} from './../api/api';
import {Select} from 'antd';

const Option = Select.Option;

class MyTownSelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            town: [],
            townids: '',
            villages: [],
            villagesid:''
        };
    }

    async componentDidMount() {
        let town = await readvillage(); // 获取镇
        this.setState({town: town.data});
    }

    async handleChange(key, value) {
        let village = await readvillage({parentid: value}); // 获取村
        if (this.props.isprops) {  // 如果props为true 的时候 可以不用选择村这些就可以查询
            this.props.selectTown(value)
        }
        this.setState({
            villages: village.data,
            townids: value
        });
    }

   submitVillage (v) {
       this.state.villagesid = v;
       this.props.selectVillage({townid:this.state.townids,villagesid:this.state.villagesid});
   }

    render() {
        return (
            <div style={{display:'flex'}}>
                <div style={{}}>
                    <Select placeholder="乡(镇 街道)" style={{flex: 1, width: 120}}
                            onChange={(v) => this.handleChange('townids', v)}
                            notFoundContent={"没有可选项"}
                    >
                        {this.state.town.map((v, index) =>
                            <Option value={v.id} key={index}>{v.townname}</Option>
                        )}
                    </Select>
                </div>
                <div style={{marginLeft:20}}>
                    <Select placeholder="村(社区)" style={{flex: 1, width: 120}}
                            notFoundContent={"没有可选项"}
                            onChange = {(v)=>this.submitVillage(v)}
                    >
                        {this.state.villages.map((v, index) =>
                            <Option value={v.id} key={index}>{v.townname}</Option>
                        )}
                    </Select>
                </div>
            </div>
        )
    }
}

export default MyTownSelect;