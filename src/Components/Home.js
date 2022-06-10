import { PageHeader, Card } from "antd";
import React from "react";
import * as ant from "antd";
import * as icon from "@ant-design/icons";
import * as react_redux from "react-redux";
const { Meta } = Card;
import { Outlet, Link } from "react-router-dom";
import Modal from "./Modal";
import { addUser, deleteUser, setActive } from "./redux/users";

const Dashboard = (props) => (
  <>
    <ant.Card
      style={{
        width: 300,
      }}
      // cover={
      //   <img
      //     alt="example"
      //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      //   />
      // }
      actions={[
        <ant.Button type="text" danger>
          <icon.DeleteOutlined key="setting" />
        </ant.Button>,
        <ant.Button type="text">
          <icon.EditOutlined key="edit" />
        </ant.Button>,
        <ant.Button type="text">
          <icon.FileAddFilled key="ellipsis" />
        </ant.Button>,
      ]}
    >
      <Meta
        avatar={<ant.Avatar src="https://joeschmoe.io/api/v1/random" />}
        title="Card title"
        description="This is the description"
      />
    </ant.Card>
  </>
);

const App = () => {
  const dispatch = react_redux.useDispatch();
  const list = react_redux.useSelector((state) => state.users.value);
  const inputs = react_redux.useSelector((state) => state.users.active);
  return (
    <div className="container">
      <p>Creat schema</p>

      <Modal />

      <ant.Divider orientation="left" orientationMargin="0.4">
        Attendance data
      </ant.Divider>

      <div className="item-container">
        {list.map((i) => (
          <ant.Card
            style={{
              width: 300,
            }}
            // cover={
            //   <img
            //     alt="example"
            //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            //   />
            // }
            actions={[
              <ant.Button
                type="text"
                onClick={() => {
                  dispatch(deleteUser({ id: i.id }));
                }}
                danger
              >
                <icon.DeleteOutlined key="setting" />
              </ant.Button>,
              <ant.Button type="text">
                <Link to={`/Addattendance/${i.id}`}>
                  {" "}
                  <icon.EditOutlined key="edit" />
                </Link>
              </ant.Button>,
              <ant.Button type="text">
                <icon.FileAddFilled key="ellipsis" />
              </ant.Button>,
            ]}
          >
            <Meta
              avatar={<ant.Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={i.Subject}
              description="This is the description"
            />
          </ant.Card>
        ))}
      </div>
    </div>
  );
};

export default App;
