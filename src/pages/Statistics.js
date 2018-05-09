import React, {Component} from 'react';
import test from './../test.css';
import { VictoryChart,VictoryBar,VictoryLabel,VictoryPie} from 'victory';
import {Select,Input,Button,Table,DatePicker, Radio} from 'antd';
import {readsex,readwen,readxia} from './../api/api';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

export default class Statistics extends Component{
  constructor(props) {
    super(props);
    this.state = {
        te:[
            {
            0:'文化程度占比图',
            1:'年龄占比图',
            2:'在职/离任/空缺占比图',
            3:'是否下派比例图',
            4:'性别比例图'
          }],
          tes:[{
              name:'文化程度占比图',
              vdata:{
                x:['初中及以下','高中中专','大专','大专及以上'],
                y:[2,3,5,4]
               }
          },{
              name:'年龄占比图',
              vdata:{
                x:['30岁及以下','31岁至35岁','36岁至40岁','41岁至45岁','46岁至50岁','51岁至55岁','56岁至60岁','60岁以上'],
                y:[7,6,14,8,18,16,28,23]
               }
          },{
            name:'在职/离任/空缺占比图',
            vdata:{
              x:['在职','离任','空缺'],
              y:[8,10,20]
             }
        },{
            name:'是否下派比例图',
            vdata:{
              x:['是','否'],
              y:[5,5]
             }
        },{
            name:'性别比例图',
            vdata:{
                x:['男','女'],
                y:[13,8],
             }
        }],

        columns:[
          [{
              name:'文化程度占比图',
              title:'初中及以下',
              dataIndex: 'address',
          },{ 
              name:'文化程度占比图',
              title:'高中中专',
              dataIndex: 'address',
              key: 'address'
          },{ 
              name:'文化程度占比图',
              title:'大专',
              dataIndex: 'address',
              key: 'address'
          },{ 
              name:'文化程度占比图',
              title:'大专及以上',
              dataIndex: 'address',
              key: 'address'
          }],
          [{
              name:'年龄占比图',
              title:'30岁及以下',
              dataIndex: 'address',
          },{
              name:'年龄占比图',
              title:'31岁至35岁',
              dataIndex: 'address'
          },{
              name:'年龄占比图',
              title:'36岁至40岁',
              dataIndex: 'address'
          },{
              name:'年龄占比图',
              title:'41岁至45岁',
              dataIndex: 'address'
          },{
              name:'年龄占比图',
              title:'46岁至50岁',
              dataIndex: 'address'
          },{
            name:'年龄占比图',
            title:'51岁至55岁',
            dataIndex: 'address'
        },{
            name:'年龄占比图',
            title:'56岁至60岁',
            dataIndex: 'address'
        },{
            name:'年龄占比图',
            title:'60岁以上',
            dataIndex: 'address'
        }],
          [{
              name:'在职/离任/空缺占比图',
              title:'在职',
              dataIndex: 'address',
              key:'address'
          },{
              name:'在职/离任/空缺占比图',
              title:'离任',
              dataIndex: 'address',
              key:'address'
          },{
              name:'在职/离任/空缺占比图',
              title:'空缺',
              dataIndex: 'address',
              key:'address'
          }],
          [{
              name:'是否下派比例图',
              title:'是',
              dataIndex: 'address',
              key:'address'
          },{
              name:'是否下派比例图',
              title:'否' ,
              dataIndex: 'address',
              key:'address'
          }],
          [{
              name:'性别比例图',
              title:'男',
              dataIndex: 'address',
          },{
              name:'性别比例图',
              title:'女',
              dataIndex: 'address',
              key:'address'
          }]
        ],
        data : [{
            key: '1',
            address: '100人',
        }],
      index:0
    };
  }
  _choose(tu){
      this.setState({ 
          index:tu
       })
  }

  async componentDidMount () {
      let k = await readxia(); // 性别
      console.log(k);
  }

  read () {
    //   console.log("i",this.state.tes[this.state.index].vdata);
    let obj =[],arr=this.state.tes[this.state.index].vdata;
    // this.state.tes[0].vdata.x.length
    // let count =arr.x;
    for (let i=0;i<arr.x.length;i++) {
       obj.push({x:arr.x[i],y:arr.y[i]})
    } 
    return obj;
  } 
  readt () {
    console.log("iaa",this.state.columns[this.state.index]);
      let obj =[],arr=this.state.columns[this.state.index];
      for(let i=0;i<arr.length;i++){
      obj.push({title:arr[i].title})
      }
    //   console.log(arr);
  return obj;
  }
    render(){
        return(<div>
               <div className="Sta_head">
                        <div style={{width:600,height:100}}>
                            <Button 
                            onClick={()=>this._choose(0)} 
                            className="Sta_choose">文化程度占比</Button>
                            <Button 
                            onClick={()=>this._choose(1)} 
                            className="Sta_choose">年龄占比</Button>
                            <Button 
                            onClick={()=>this._choose(2)} 
                            className="Sta_choose">在职/离任/空缺占比</Button>
                            <Button 
                            onClick={()=>this._choose(3)} 
                            className="Sta_choose">是否下派比例</Button>
                            <Button 
                            onClick={()=>this._choose(4)} 
                            className="Sta_choose">性别比例</Button>
                        </div>
                        <div className="sta_date">
                            <DatePicker className="data_pic" placeholder="起始日期" />
                            <DatePicker placeholder="结束日期" />
                        </div>
                        <Button className='Sta_s' type="primary" icon="search">搜索</Button>
                        </div>
                        <div className="Sta_cont">
                       { 
                        this.state.index===0 || this.state.index===1 || this.state.index===2?
                        <div className="Sta_v">
                        <VictoryChart
                        width={800}
                        height={600}
                        domainPadding={{ x:50 ,y:100}}
                        animate={{duration: 500}}>
                        <VictoryLabel text={this.state.te[0][this.state.index]} x={430} y={40} textAnchor="middle" style={{fontSize:30}}/>
                          <VictoryBar
                          labels={(d) => `${d.y}`+'人'}
                          data ={this.read()}
                          style={{
                            data: { fill: "#045a73", width: 50}
                                }}
                           animate={{
                              onExit: {
                              duration: 500,
                              before: () => ({
                              _y: 0,
                              fill: "#045a73",
                              label: "BYE"
                            })
                           }
                           }}
                          />
                         </VictoryChart></div>:<div className="Sta_pie"><VictoryLabel text={this.state.te[0][this.state.index]} x={430} y={40} textAnchor="middle" style={{fontSize:30}}/><VictoryPie
                         width={800} 
                         height={600}
                         data={this.read()   
                        }
                        style={{ 
                            labels: { 
                                fill: "black",
                                fontSize: 15, 
                            } 
                        }}
                        colorScale={["tomato", "orange", "gold", "cyan",'green','yellow']}
                        // labels={(d) => `${d.y}`+'人'}
                        labelRadius={150}
                        animate={{
                            duration: 2000
                          }}
                         />
                        </div>}
                        <div className="Sta_tab">
                        <Table bordered columns={this.readt()} dataSource={this.state.data} size="large" pagination={false}/>
                        </div>
                        </div>
                  </div>)
              }
          }
