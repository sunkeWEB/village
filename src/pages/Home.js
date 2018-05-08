import React, {Component} from 'react';
import test from './../test.css'
import {Divider} from 'antd';
// import {Header, Sider, Content,Layout,Footer} from 'antd';
// const {Header, Sider, Content,Footer} = Layout;
export default class Home extends Component{
     render(){
         return(<div>
             <div className="home_tit">
              <a className="cha_a">首页编辑</a>
                  <span style={{fontSize:50,color:'#337ab7',textShadow:'2px 1px #fff'}}>金沙县村干部信息管理中心</span>
             </div>
             <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <div className="home_img">
                      <div className="class_cover"><span style={{color:'white',paddingLeft: 25,fontSize:23}}>五彩金沙，花海毕节--------------></span></div> 
                      <img src={require("./../public/yyyq.jpg")} width='100%' height="100%" />     
                </div>
                <div style={{width:650,height:480,marginLeft:50}}>
                     <div className="home_tit2">
                        <span style={{fontSize:50,color:'#337ab7',textShadow:'2px 1px #fff'}}>领导活动</span>
                     </div>
                     <div className="home_cont">
                     <div style={{margin:15}}>
                     <ul>
                         <li>
                             <a className="link" target="_blank" title="县领导到金沙县部分乡镇（街道）查看风雹灾情" href="http://www.gzjinsha.gov.cn/xwzx/bmdt/201805/t20180502_2388383.html">
                               <i>
                                </i>县领导到金沙县部分乡镇（街道）查看风雹灾情</a><span className="span">2018-05-02</span>
                         </li>
                         <li>
                          <a  className="link" target="_blank" title="李涛率队到金沙县白酒基地调研" href="http://www.gzjinsha.gov.cn/xwzx/bmdt/201805/t20180502_2388338.html">
                          <i>
                              </i>李涛率队到金沙县白酒基地调研</a><span className="span">2018-05-01</span>
                          </li>
                           <li>
                           <a className="link" target="_blank" title="谢培午率队到禹谟、安底、茶园督查产业基地建设工作" href="http://www.gzjinsha.gov.cn/xwzx/bmdt/201804/t20180427_2382403.html">
                           <i>
                            </i>谢培午率队到禹谟、安底、茶园督查产业基地建...</a><span className="span">2018-04-27</span>
                         </li>
                         <li>
                            <a className="link" target="_blank" title="蒙敏、李涛率队调研易地扶贫搬迁项目" href="http://www.gzjinsha.gov.cn/xwzx/bmdt/201804/t20180427_2382387.html">
                              <i></i>蒙敏、李涛率队调研易地扶贫搬迁项目</a><span className="span">2018-04-27</span>
                            </li>
                             <li>
                             <a className="link" target="_blank" title="金沙县2017年公立医院综合改革效果评价接受国家复核" href="http://www.gzjinsha.gov.cn/xwzx/bmdt/201804/t20180426_2379469.html">
                              <i></i>金沙县2017年公立医院综合改革效果评价接受国...</a><span className="span">2018-04-26</span>
                                </li>
                                <li>
                                <a className="link" target="_blank" title="浙江省供销社考察组到金沙县考察" href="http://www.gzjinsha.gov.cn/xwzx/bmdt/201804/t20180425_2378342.html">
                                <i></i>浙江省供销社考察组到金沙县考察</a><span className="span">2018-04-25</span>
                                </li>
                                 <li>
                                 <a className="link" target="_blank" title="丁雄军率队到金沙县调研" href="http://www.gzjinsha.gov.cn/xwzx/bmdt/201804/t20180418_2365645.html">
                                 <i></i>丁雄军率队到金沙县调研</a><span className="span">2018-04-18</span>
                                 </li>
                                 <li>
                                  <a className="link" target="_blank" title="王正福率队到金沙县调研指导关心下一代工作" href="http://www.gzjinsha.gov.cn/xwzx/bmdt/201804/t20180417_2363541.html">
                                  <i></i>王正福率队到金沙县调研指导关心下一代工作</a><span className="span">2018-04-17</span>
                                   </li>
                                   <li>
                                   <a className="link" target="_blank" title="谢培午率队到西洛街道平坝镇调研" href="http://www.gzjinsha.gov.cn/xwzx/bmdt/201804/t20180413_2359896.html">
                                   <i></i>谢培午率队到西洛街道平坝镇调研</a><span className="span">2018-04-13</span>
                                   </li>
                                    <li>
                                  <a className="link" target="_blank" title="金沙县组织收看“新时代学习大讲堂”第三十六期业务知识培训会" href="http://www.gzjinsha.gov.cn/xwzx/bmdt/201804/t20180413_2359009.html">
                                   <i></i>金沙县组织收看“新时代学习大讲堂”第三十六...</a><span className="span">2018-04-13</span>
                                    </li>
                                    <li>
                                    <a className="link" target="_blank" title="谢培午率队到马路乡进行脱贫攻坚走访督查" href="http://www.gzjinsha.gov.cn/xwzx/bmdt/201804/t20180412_2357803.html">
                                    <i></i>谢培午率队到马路乡进行脱贫攻坚走访督查</a><span className="span">2018-04-12</span>
                                    </li>
                                    <li>
                                    <a className="link" target="_blank" title="谢培午率队到马路乡进行脱贫攻坚走访督查" href="http://www.gzjinsha.gov.cn/xwzx/bmdt/201804/t20180412_2357803.html">
                                    <i></i>谢培午率队到马路乡进行脱贫攻坚走访督查</a><span className="span">2018-04-12</span>
                                    </li>
                                    <li>
                                    <a className="link" target="_blank" title="谢培午率队到马路乡进行脱贫攻坚走访督查" href="http://www.gzjinsha.gov.cn/xwzx/bmdt/201804/t20180412_2357803.html">
                                    <i></i>谢培午率队到马路乡进行脱贫攻坚走访督查</a><span className="span">2018-04-12</span>
                                    </li>
                                    <li>
                                    <a className="link" target="_blank" title="谢培午率队到马路乡进行脱贫攻坚走访督查" href="http://www.gzjinsha.gov.cn/xwzx/bmdt/201804/t20180412_2357803.html">
                                    <i></i>谢培午率队到马路乡进行脱贫攻坚走访督查</a><span className="span">2018-04-12</span>
                                    </li>
                                    <li>
                                    <a className="link" target="_blank" title="谢培午率队到马路乡进行脱贫攻坚走访督查" href="http://www.gzjinsha.gov.cn/xwzx/bmdt/201804/t20180412_2357803.html">
                                    <i></i>谢培午率队到马路乡进行脱贫攻坚走访督查</a><span className="span">2018-04-12</span>
                                    </li>
                                    <li>
                                    <a className="link" target="_blank" title="谢培午率队到马路乡进行脱贫攻坚走访督查" href="http://www.gzjinsha.gov.cn/xwzx/bmdt/201804/t20180412_2357803.html">
                                    <i></i>谢培午率队到马路乡进行脱贫攻坚走访督查</a><span className="span">2018-04-12</span>
                                    </li>
                                
                                   </ul>
                          </div>
                     </div>
                </div>
              </div>
         </div>)
        
     }
}