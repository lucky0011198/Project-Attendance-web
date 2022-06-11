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
        // <Button key="2"
        
        // onClick={()=>{
        //   localStorage.removeItem('Template')

          
        // }}
        // >
        //   Profile
        // </Button>,
        <Button key="1" 
        style={{
          borderRadius: "6px",
          border: 'none',
          display: "inline-block",
          cursor: "pointer", "color": "#ffffff",
          
          height:'3rem',
          textDecoration: "none",
        }}
        type="primary">
       <Link to="/Template">Creat template</Link>   
        </Button>,
      ]}
    ></PageHeader>
    <Outlet />
  </div>
);
