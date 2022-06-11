import { LikeOutlined, MessageOutlined, StarOutlined,DownloadOutlined } from '@ant-design/icons';
import { Avatar, List, Space,Progress } from 'antd';
import * as react_redux from "react-redux";
import React from 'react';
import { useParams } from "react-router-dom";
import CsvDownload from 'react-json-to-csv'


const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const App = () => {
  const inputs = react_redux.useSelector((state) => state.users.value);
  const { id } = useParams();
  let list = inputs.filter((i) => i.id === id);
  
  
  return(
  <div>
  <List
    itemLayout="vertical"
    size="small"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 5,
    }}
    dataSource={list[0].Attendance}
    footer={
      <div>
       <b>Total number of Attendance taken</b> {inputs[0].classAttendance.length}
      </div>
    }
    renderItem={(item) => (
      <List.Item
        key={'students'}
        actions={[
          <IconText icon={StarOutlined} text={`present : ${item.present}`} key="list-vertical-star-o" />,
          <IconText icon={LikeOutlined} text={`absent : ${item.absent}`} key="list-vertical-like-o" />,
          // <IconText icon={MessageOutlined} text={`Total :${(item.present+item.absent)}`} key="list-vertical-message" />,
        ]}
        extra={
          <Progress type="circle" width={80}  percent={((item.present / (item.present+item.absent)) * 100).toFixed()} />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={'https://joeschmoe.io/api/v1/random'} />}
          title={`Roll number: ${item.id}`}
         
        />
        {item.content}
      </List.Item>
    )}
  />
  <CsvDownload data={inputs[0].Attendance}
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
)};

export default App;