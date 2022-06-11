import { ArrowDownOutlined, ArrowUpOutlined, UsergroupAddOutlined, DownloadOutlined, DeliveredProcedureOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic, Button, Progress, Tag, Tabs, Switch } from "antd";
import React, { useState, useEffect } from "react";
import * as react_redux from "react-redux";
import { useParams } from "react-router-dom";

import { updateData } from "../redux/users";
import View from "./View"
import ClassAttendance from "./ClassAttendance"
import CsvDownload from 'react-json-to-csv'
const { TabPane } = Tabs;

const App = () => {
  const dispatch = react_redux.useDispatch();
  const list = react_redux.useSelector((state) => state.users.value);
  const { id } = useParams();
  let inputs = list.filter((i) => i.id === id);
  const [std, setstd] = useState(inputs[0].Attendance || []);
  const [pos, setpos] = useState(1)


  let students = [];
  let from =
    list.filter(
      (i) =>
        i.id ==
        inputs[0].Subject + inputs[0].Batch + inputs[0].Branch + inputs[0].Type
    )[0].Range[0] || 0;
  let to =
    list.filter(
      (i) =>
        i.id ==
        inputs[0].Subject + inputs[0].Batch + inputs[0].Branch + inputs[0].Type
    )[0].Range[1] || 0;


  for (let i = from; i <= to; i++) {
    students.push({ id: i, name: "", present: 0, absent: 0 });
  }



  useEffect(() => {
    if (std.length === 0) {
      setstd(students);
    }

  }, []);


  const submit = () => {
    let Present = std.filter((i) => i.state);
    let Absent = std.filter((i) => !i.state);
    let att = ((std.filter((i) => i.state).length / std.length) * 100).toFixed(2)
    let classAttendance = {
      Present,
      Absent,
      att,
      date: new Date()
    }
    std.map((i) => {
      if (i.state) {
        i['present'] += 1
      } else {
        i['absent'] += 1
      }
    })







    dispatch(updateData({ id, data: std, classAttendance }))

  }


  return (
    <div className="container">

      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <UsergroupAddOutlined />
              Add Attendance
            </span>
          }
          key="1"
        >
          <div className="site-statistic-demo-card">
            <Row justify="start">
              <Col span={8}>
                <Card>
                  <Statistic
                    title="Total students"
                    value={std.length}
                    valueStyle={{
                      color: "#191919",
                    }}
                    prefix={<UsergroupAddOutlined />}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="Present students"
                    value={std.filter((i) => i.state).length}
                    valueStyle={{
                      color: "#3f8600",
                    }}
                    prefix={<ArrowUpOutlined />}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="Absent students"
                    value={std.filter((i) => !i.state).length}
                    valueStyle={{
                      color: "#cf1322",
                    }}
                    prefix={<ArrowDownOutlined />}
                  />
                </Card>
              </Col>
            </Row>
            <br />

            <div className="Partition">
              <div className="item">
                {std.map((i) => (
                  <Button
                    type={i.state ? "primary" : "default"}
                    className="item-b"
                    onClick={() => {
                      const newlist = std.map((newitem) => {
                        if (newitem.id == i.id) {
                          return {
                            ...newitem,
                            state: !newitem.state,
                          };
                        }

                        return {
                          ...newitem,
                          state: newitem.state,
                        };
                      });

                      setstd(newlist);
                    }}
                  >
                    {i.id}
                  </Button>
                ))}
              </div>


              <Row gutter={16}>
                <br />
                <Col span={12}>

                  <div className="container-sm" >
                    <h4> Class Attendance</h4>

                    <Progress type="circle" width={100} strokeWidth={10} percent={((std.filter((i) => i.state).length / std.length) * 100).toFixed(2)} />
                  </div>

                </Col>

                <Col span={12}>
                  <h4>class info</h4>
                  <div  >


                    <div className="Item">
                      <b>Branch : {" "}</b>
                      <Tag className="tags" color="cyan"> {" "}{inputs[0].Branch}</Tag>
                    </div>
                    <div className="Item">
                      <b>Batch : </b>
                      <Tag className="tags" color="blue">{inputs[0].Batch}</Tag>
                    </div>
                    <div className="Item">
                      <b>Subject : </b>
                      <Tag className="tags" color="geekblue">{inputs[0].Subject}</Tag>
                    </div>
                  </div>

                </Col>
                <Col span={12} >
                  <div className="container-sm">
                    <h4>Change state </h4>

                    <Switch onChange={(v) => {
                      students.map((i) => {
                        i.state = v
                      })
                      setstd(students)

                    }} />
                  </div>


                </Col>
                <Col span={12}>
                  <div>
                    <Button type="primary"

                      style={{

                        height:'3rem',
                        cursor: "pointer", "color": "#ffffff",
                        borderRadius: "6px",
                        
                       
                        
                      }}

                      onClick={submit}

                      icon={<DeliveredProcedureOutlined />}
                      block>Submit Data</Button>

                  </div>
                  <br />
                  <div>
                    {/* <Button type="primary"


                      icon={<DownloadOutlined />}
                      onClick={() => {
                        let classdata = []
                        inputs[0].classAttendance.map((i) => {
                          classdata.push({
                            Present: i.Present.length,
                            Absent: i.Absent.length,
                            attendance: i.att,
                            date: i.date,
                            Batch:inputs[0].Batch,
                            Branch:inputs[0].Branch,
                            Type:inputs[0].Type,
                            Subject:inputs[0].Subject
                          })
                        })

                        console.log(classdata)

                      }}
                      block>Download Data</Button> */}
                    <CsvDownload
                      filename={inputs[0].Subject}
                      data={inputs[0].Attendance}
                      style={{

                        backgroundColor: "#ddd",
                        borderRadius: "6px",
                        border: 'none',
                        display: "inline-block",
                        cursor: "pointer", "color": "#ffffff",
                        
                        height:'3rem',
                        textDecoration: "none",
                        padding:'0px 40px'
                      

                      }}

                    >
                      <DownloadOutlined /> Download Data
                    </CsvDownload>

                  </div>

                </Col>
              </Row>
            </div>
          </div>
        </TabPane>
        <TabPane
          tab={
            <span>
              <UsergroupAddOutlined />
              Student Attendance
            </span>
          }
          key="2"
        >

          <View data={list[0].Attendance} />




        </TabPane>
        <TabPane
          tab={
            <span>
              <UsergroupAddOutlined />
              Class Attendance
            </span>
          }
          key="3"
        >
          <ClassAttendance />
        </TabPane>

      </Tabs>




    </div>
  );

};


export default App;
