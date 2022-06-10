import { Button, Descriptions, PageHeader } from "antd";
import React from "react";
import { Outlet, Link } from "react-router-dom";

export default () => (
  <div className="site-page-header-ghost-wrapper">
    <PageHeader
      ghost={false}
      title="Attendance"
      subTitle="This is a subtitle"
      extra={[
        <Button key="3">
          <Link to="/"> Home</Link>
        </Button>,
        <Button key="2">
          <Link to="/Addattendance/:id">Profile</Link>
        </Button>,
        <Button key="1" type="primary">
          Creat template
        </Button>,
      ]}
    ></PageHeader>
    <Outlet />
  </div>
);
