import React, {Component} from 'react';
import {Button, Input, Select} from 'antd';
import {addVillage, readvillage,addposts,readposts} from './../api/api';
import Cookies from 'js-cookie';

const Option = Select.Option;

class Addvillage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            townname: '',
            parentid: '',
            town: [],
            realname:''
        };
    }

    handlerInput(v) {
        this.setState({
            townname: v.target.value
        });
    }


    async componentDidMount() {
        let c =await readposts();
        console.log(c);
        let m = await readvillage();
        this.setState({
            town: m.data
        });
    }

    async submit() {
        let m = await addVillage({...this.state});
    }

    async addpost () {
        let m = await addposts({...this.state});
    }

    render() {
        return (
            <div>
                <div>
                    <div>添加乡镇</div>
                    <div style={{display: 'flex'}}>
                        <div style={{width: 120, marginRight: 10}}>
                            <Input placeholder={"输入添加的乡镇"} onChange={(v) => this.handlerInput(v)}/>
                        </div>
                        <Button onClick={() => this.submit()}>添加</Button>
                    </div>
                </div>
                <div>
                    <div>添加村</div>
                    <div style={{display: 'flex'}}>
                        <div style={{width: 120, marginRight: 10}}>
                            <Select placeholder="村(社区)" style={{width: 120}} onSelect={(v) => this.state.parentid = v}>
                                {this.state.town.map((v, index) =>
                                    <Option value={v.id} key={index}>{v.townname}</Option>
                                )}
                            </Select>
                            <Input placeholder={"输入添加的村"} onChange={(v) => this.handlerInput(v)}/>
                        </div>
                        <Button onClick={() => this.submit()}>添加</Button>
                    </div>
                </div>

                <div>
                    <div>添加职务</div>
                    <div style={{display: 'flex'}}>
                        <div style={{width: 120, marginRight: 10}}>
                            <Input placeholder={"输入添加的职位"} onChange={(v) => this.setState({realname:v.target.value})}/>
                        </div>
                        <Button onClick={() => this.addpost()}>添加</Button>
                    </div>
                </div>

            </div>
        )
    }
}

export default Addvillage;