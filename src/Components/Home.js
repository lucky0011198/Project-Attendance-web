import { PageHeader, Card } from "antd";
import React from "react";
import * as ant from "antd";
import * as icon from "@ant-design/icons";
import * as react_redux from "react-redux";

import { Outlet, Link } from "react-router-dom";
import { addUser, deleteUser, setActive } from "./redux/users";
import Modal from "./Modal";

const { Meta } = Card;


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
            title={<div> <icon.BookOutlined style={{fontSize:'1.2rem'}} /> {" "} {i.Subject}</div>}

            extra={<ant.Tag color="purple">{i.Type}</ant.Tag>}
           

           
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
                <icon.DownloadOutlined  key="ellipsis" />
              </ant.Button>,
            ]}
          >
           
            

            <Meta
             
             
              description={ (
              <div><ant.Tag color="blue">{i.Subject}</ant.Tag>
              <ant.Tag color="geekblue">{i.Branch}</ant.Tag><ant.Tag color="geekblue">{i.Batch}</ant.Tag></div>)}

              
            />
          </ant.Card>
        ))}
      </div>
    </div>
  );
};

export default App;
