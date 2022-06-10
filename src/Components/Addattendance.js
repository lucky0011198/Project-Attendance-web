import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic, Button, Progress, Tag, Space } from "antd";
import React, { useState, useEffect } from "react";
import * as react_redux from "react-redux";
import { useParams } from "react-router-dom";

const App = () => {
  const list = react_redux.useSelector((state) => state.users.value);
  const { id } = useParams();
  let inputs = list.filter((i) => i.id === id);
  const [std, setstd] = useState([]);

  console.log(inputs[0]);

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
    students.push({ id: i, name: "" });
  }

  useEffect(() => {
    setstd(students);
  }, []);

  const User = () => (
    <Row gutter={16}>
      <Col span={12}>
        <Statistic title="Active Users" value={112893} />
      </Col>
      <Col span={12}>
        <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
        <Button
          style={{
            marginTop: 16,
          }}
          type="primary"
        >
          Recharge
        </Button>
      </Col>
      <Col span={12}>
        <Statistic title="Active Users" value={112893} loading />
      </Col>
    </Row>
  );
  return (
    <>
      <div className="site-statistic-demo-card">
        <Row justify="start">
          <Col span={8}>
            <Card>
              <Statistic
                title="Active"
                value={std.length}
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
                title="Idle"
                value={std.filter((i) => i.state).length}
                valueStyle={{
                  color: "#cf1322",
                }}
                prefix={<ArrowDownOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Idle"
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
              <h4> Class Attendance</h4>
              <Progress type="circle" percent={75} />
            </Col>

            <Col span={12}>
              <h4>class info</h4>
              <Card style={{ width: 200 }}>
                <div className="Item">
                  <b>Branch : </b>
                  <h4>{inputs[0].Branch}</h4>
                </div>
                <div className="Item">
                  <b>Batch : </b>
                  <h4>{inputs[0].Batch}</h4>
                </div>
                <div className="Item">
                  <b>Subject : </b>
                  <h4>{inputs[0].Subject}</h4>
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Statistic
                title="Account Balance (CNY)"
                value={112893}
                precision={2}
              />
              <Button
                style={{
                  marginTop: 16,
                }}
                type="primary"
              >
                Recharge
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default App;
