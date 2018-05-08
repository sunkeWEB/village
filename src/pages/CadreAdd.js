import React, {Component} from 'react';
import {Button, Input, Table, Popconfirm, Icon, InputNumber, Select, DatePicker} from 'antd';
import MyTownSelect from './../components/MyTownSelect'; // 乡镇选择
import Posts from './../components/Posts'; // 职务选择
import {readposts, addCadrs} from './../api/api';

const {TextArea} = Input;
const Option = Select.Option;

class Cadre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            listNum: 1, // 履历
            jcnum: 1, // 奖惩情况
            pxnum: 1,// 培训情况
            resul: []
        };
    }

    async componentDidMount() {
        let posts = await readposts();
        this.setState(posts);
    }

    handleInput(k, v) {
        this.setState({
            [k]: v
        });
    }

    async submitSave() {
        let k = this.getarr('jcqks');
        let s = this.getarr('pxqk');
        let c = this.getarr('lvqk');
        console.log({...this.state});
        let m = await addCadrs({...this.state});
        console.log(m);
    }

    getarr(dom) {
        let arr = [];
        let m = 0;
        for (let i of document.querySelectorAll(`.${dom}`)) {
            let dic = {};
            for (let a of i.getElementsByTagName("input")) {
                let val = a.value;
                let cs = a.className.split(" ");
                let keyName = "";
                if (cs[0] === "ant-calendar-picker-input") {
                    cs = a.parentNode.parentNode.className.split(" ");
                    keyName = cs[0];
                } else {
                    keyName = cs[cs.length - 1];
                }
                dic[keyName] = val;
                // console.log(dic);

            }
            arr.push(dic);
            for (let b of i.getElementsByClassName(`ant-select-selection-selected-value`)) {
                let k = b.parentNode.parentNode.parentNode.className.split(" ")[0];
                let v = b.title;
                arr[m][k] = v;
            }
            m++;
        }
        return arr;
    }

    render() {
        return (
            <div>
                <div style={{border: '1px solid rgb(224,243,241)'}}>
                    <div style={{
                        height: 35,
                        width: '100%',
                        backgroundColor: 'rgb(243,241,244)',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: 10
                    }} className={"bars"}><span style={{margin: '0 15px'}}>基本信息</span><span
                        style={{color: 'red'}}>(必填)</span></div>
                    <div style={{display: 'flex', padding: 10}}>
                        <div style={{display: 'flex'}}>
                            <div
                                style={{width: 100, display: 'flex', alignItems: "center", justifyContent: "center"}}>姓名
                            </div>
                            <Input style={{width: 120}} onChange={(v) => this.handleInput('realname', v.target.value)}
                                   placeholder={"姓名"}/>
                        </div>
                        <div style={{display: 'flex'}}>
                            <div
                                style={{width: 100, display: 'flex', alignItems: "center", justifyContent: "center"}}>性别
                            </div>
                            <Select style={{width: 120}} placeholder={"选择性别"}
                                    onChange={(v) => this.handleInput('sex', v)}>
                                <Option value={1}>男</Option>
                                <Option value={0}>女</Option>
                            </Select>
                        </div>
                        <div style={{display: 'flex'}}>
                            <div style={{
                                width: 150,
                                display: 'flex',
                                alignItems: "center",
                                justifyContent: "center"
                            }}>联系电话
                            </div>
                            <Input onChange={(v) => this.handleInput('phone', v.target.value)} placeholder={"联系电话"}/>
                        </div>
                    </div>
                    <div style={{display: 'flex', paddingLeft: 10, paddingRight: 10, paddingBottom: 10}}>
                        <div style={{display: 'flex'}}>

                            <div style={{display: 'flex'}}>
                                <div style={{
                                    width: 100,
                                    display: 'flex',
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>学历
                                </div>
                                <Select style={{width: 120}} placeholder={"学历状况"}
                                        onChange={(v) => this.handleInput('edu', v)}>
                                    <Option value={"本科"}>本科</Option>
                                    <Option value={"博士"}>博士</Option>
                                </Select>
                            </div>
                        </div>
                        <div style={{display: 'flex'}}>
                            <div
                                style={{width: 100, display: 'flex', alignItems: "center", justifyContent: "center"}}>民族
                            </div>
                            <Select style={{width: 120}} placeholder={"选择民族"}
                                    onChange={(v) => this.handleInput('mingzu', v)}>
                                <Option value="汉族">汉族</Option>
                                <Option value="蒙古族">蒙古族</Option>
                            </Select>
                        </div>
                        <div style={{display: 'flex'}}>
                            <div style={{
                                width: 150,
                                display: 'flex',
                                alignItems: "center",
                                justifyContent: "center"
                            }}>身份证号
                            </div>
                            <Input onChange={(v) => this.handleInput('card', v.target.value)} placeholder={"身份证号"}/>
                        </div>
                    </div>
                </div>

                <div style={{border: '1px solid rgb(224,243,241)', marginTop: 25}}>
                    <div style={{
                        height: 35,
                        width: '100%',
                        backgroundColor: 'rgb(243,241,244)',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: 10,
                    }} className={"bars"}><span style={{margin: '0 15px'}}>其他信息</span><span
                        style={{color: "red"}}>(必填)</span></div>
                    <div style={{display: 'flex', padding: 10}}>
                        <div style={{display: 'flex'}}>
                            <div style={{
                                width: 100,
                                display: 'flex',
                                alignItems: "center",
                                justifyContent: "center"
                            }}>入党时间
                            </div>
                            <DatePicker placeholder={"入党时间"}
                                        onChange={(k, v) => this.handleInput('jointime', new Date(v).getTime())}/>
                        </div>
                        <div style={{display: 'flex'}}>
                            <div style={{
                                width: 100,
                                display: 'flex',
                                alignItems: "center",
                                justifyContent: "center"
                            }}>城市社区
                            </div>
                            <Select style={{width: 120}} placeholder={"是否城市社区"}
                                    onChange={(v) => this.handleInput('iscity', v)}>
                                <Option value="是">是</Option>
                                <Option value="否">否</Option>
                            </Select>
                        </div>
                        <div style={{display: 'flex'}}>
                            <div style={{
                                width: 100,
                                display: 'flex',
                                alignItems: "center",
                                justifyContent: "center"
                            }}>是否下派
                            </div>
                            <Select style={{width: 120}} placeholder={"是否下派"}
                                    onChange={(v) => this.handleInput('isxiapai', v)}>
                                <Option value={1}>否</Option>
                                <Option value={0}>是</Option>
                            </Select>
                        </div>
                        <div style={{display: 'flex'}}>
                            <div
                                style={{width: 100, display: 'flex', alignItems: "center", justifyContent: "center"}}>地址
                            </div>
                            <Input onChange={(v) => this.handleInput('adders', v.target.value)} placeholder={"家庭地址"}/>
                        </div>
                    </div>
                    <div style={{display: 'flex', paddingLeft: 10, paddingRight: 10, paddingBottom: 10}}>
                        <div style={{display: 'flex'}}>
                            <div style={{
                                width: 100,
                                display: 'flex',
                                alignItems: "center",
                                justifyContent: "center"
                            }}>初任时间
                            </div>
                            <DatePicker onChange={(k, v) => this.handleInput('oldtime', new Date(v).getTime())}
                                        placeholder={"初任时间"}/>
                        </div>

                        <div style={{display: 'flex'}}>
                            <div style={{
                                width: 100,
                                display: 'flex',
                                alignItems: "center",
                                justifyContent: "center"
                            }}>初任职务
                            </div>
                            <Posts selectPost={(v)=>this.state.oldpost=v} />
                        </div>

                        <div style={{display: 'flex'}}>
                            <div style={{
                                width: 100,
                                display: 'flex',
                                alignItems: "center",
                                justifyContent: "center"
                            }}>生存情况
                            </div>
                            <Select style={{width: 120}} placeholder={"生存情况"}
                                    onChange={(v) => this.handleInput('scqk', v)}>
                                <Option value={0}>健在</Option>
                                <Option value={1}>辞世</Option>
                            </Select>
                        </div>
                        <div style={{display: 'flex'}}>
                            <div
                                style={{width: 70, display: 'flex', alignItems: "center", justifyContent: "center"}}>乡镇
                            </div>
                            <MyTownSelect selectVillage={(e) => {
                                let state = this.state;
                                state.townid = e.townid;
                                state.village = e.villagesid;
                            }}/>
                        </div>
                    </div>
                </div>

                <div style={{border: '1px solid rgb(224,243,241)', marginTop: 25}} ref={"ListDom"}>
                    <div style={{
                        height: 35,
                        width: '100%',
                        backgroundColor: 'rgb(243,241,244)',
                        display: 'flex',
                        alignItems: 'center'
                    }} className={"bars"}><span style={{marginLeft: 15, fontSize: 10}}>培训情况</span>
                        <Icon title={"继续添加培训情况"} type="plus" style={{marginLeft: 10, cursor: "pointer"}}
                              onClick={() => {
                                  this.setState({pxnum: ++this.state.pxnum})
                              }}/>
                    </div>
                    {
                        new Array(this.state.pxnum).fill(7).map(() => <Cells/>)
                    }
                </div>

                <div style={{border: '1px solid rgb(224,243,241)', marginTop: 25}} ref={"ListDom"}>
                    <div style={{
                        height: 35,
                        width: '100%',
                        backgroundColor: 'rgb(243,241,244)',
                        display: 'flex',
                        alignItems: 'center'
                    }} className={"bars"}><span style={{marginLeft: 15, fontSize: 10}}>奖惩情况</span>
                        <Icon title={"继续添加奖惩情况"} type="plus" style={{marginLeft: 10, cursor: "pointer"}}
                              onClick={() => {
                                  this.setState({jcnum: ++this.state.jcnum})
                              }}/>
                    </div>
                    {
                        new Array(this.state.jcnum).fill(7).map(() => <Cellss/>)
                    }
                </div>

                <div style={{border: '1px solid rgb(224,243,241)', marginTop: 25}} ref={"ListDom"}>
                    <div style={{
                        height: 35,
                        width: '100%',
                        backgroundColor: 'rgb(243,241,244)',
                        display: 'flex',
                        alignItems: 'center'
                    }} className={"bars"}><span style={{marginLeft: 15, fontSize: 10}}>履历信息</span>
                        <Icon title={"继续添加履历"} type="plus" style={{marginLeft: 10, cursor: "pointer"}} onClick={() => {
                            this.setState({listNum: ++this.state.listNum})
                        }}/>
                    </div>
                    {
                        new Array(this.state.listNum).fill(7).map(() => <Cell/>)
                    }
                </div>

                <div style={{border: '1px solid rgb(224,243,241)', marginTop: 25}}>
                    <div style={{
                        height: 35,
                        width: '100%',
                        backgroundColor: 'rgb(243,241,244)',
                        display: 'flex',
                        alignItems: 'center'
                    }} className={"bars"}><span style={{marginLeft: 15, fontSize: 10}}>备注信息</span></div>
                    <div style={{padding: 10}}>
                        <TextArea onChange={(v) => this.handleInput("beizhu", v.target.value)} placeholder="备注信息"
                                  autosize={{minRows: 2, maxRows: 6}}/>
                    </div>
                </div>

                <div style={{display: 'flex', marginTop: 20, justifyContent: 'center'}}>
                    <Button type={"primary"} onClick={() => this.submitSave()}>保存信息</Button>
                </div>

            </div>
        )
    }
}

// 履历情况
let Cell = () => (
    <div style={{display: 'flex', padding: 10}} className="lvqk">
        <div style={{display: 'flex'}}>
            <div
                style={{
                    width: 100,
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: "center"
                }}>离职职务
            </div>
            <Posts/>
        </div>
        <div style={{display: 'flex'}}>
            <div style={{
                width: 100,
                display: 'flex',
                alignItems: "center",
                justifyContent: "center"
            }}>离职时间
            </div>
            <DatePicker className={"time"} placeholder={"离职时间"}/>
        </div>
        <div style={{display: 'flex'}}>
            <div
                style={{
                    width: 100,
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: "center"
                }}>正常离职
            </div>
            <Select style={{width: 120}} placeholder={"选择正常离职"} className={"zclz"}>
                <Option key={0}>正常</Option>
                <Option key={1}>非正常</Option>
            </Select>
        </div>
        <div style={{
            display: 'flex', alignItems: "center",
            justifyContent: "center"
        }}>
            <div style={{
                width: 100,
                display: 'flex',
                alignItems: "center",
                justifyContent: "center"
            }}>原因
            </div>
            <Input className={"lzyy"} placeholder={"离职原因"}/>
        </div>
    </div>
)
// 培训情况
let Cells = () => (
    <div style={{display: 'flex', padding: 10}} className="pxqk">
        <div style={{display: 'flex'}}>
            <div style={{
                width: 100,
                display: 'flex',
                alignItems: "center",
                justifyContent: "center"
            }}>培训时间
            </div>
            <DatePicker className={"time"} placeholder={"培训时间"}/>
        </div>
        <div style={{
            display: 'flex', alignItems: "center",
            justifyContent: "center"
        }}>
            <div style={{
                width: 150,
                display: 'flex',
                alignItems: "center",
                justifyContent: "center"
            }}>培训内容
            </div>
            <Input className={"value"} placeholder={"培训内容"}/>
        </div>
    </div>
)

// 奖惩情况
let Cellss = () => (
    <div style={{display: 'flex', padding: 10}} className="jcqks">
        <div style={{display: 'flex'}}>
            <div style={{
                width: 100,
                display: 'flex',
                alignItems: "center",
                justifyContent: "center"
            }}>奖惩时间
            </div>
            <DatePicker className={"time jqtime"} placeholder={"奖惩时间"}/>
        </div>
        <div style={{
            display: 'flex', alignItems: "center",
            justifyContent: "center"
        }}>
            <div style={{
                width: 150,
                display: 'flex',
                alignItems: "center",
                justifyContent: "center"
            }}>奖惩内容
            </div>
            <Input placeholder={"奖惩内容"} className="jqlr jcvalue"/>
        </div>
    </div>
)


export default Cadre;