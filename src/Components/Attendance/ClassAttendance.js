import { LikeOutlined, MessageOutlined, StarOutlined,DownloadOutlined } from '@ant-design/icons';
import { Avatar, List, Space, Progress } from 'antd';
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
  const list = react_redux.useSelector((state) => state.users.value);
  const { id } = useParams();
  let inputs = list.filter((i) => i.id === id);

  let classdata = []
  inputs[0].classAttendance.map((i) => {
    classdata.push({
      Present: i.Present.length,
      Absent: i.Absent.length,
      Total: (i.Present.length + i.Absent.length),
      attendance: i.att,
      date: i.date,
      Batch: inputs[0].Batch,
      Branch: inputs[0].Branch,
      Type: inputs[0].Type,
      Subject: inputs[0].Subject
    })
  })


  return (
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
        dataSource={inputs[0].classAttendance}

        renderItem={(item) => (
          <List.Item
            key={'classAttendance'}
            actions={[
              <IconText icon={StarOutlined} text={`present : ${item.Present.length}`} key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text={`absent : ${item.Absent.length}`} key="list-vertical-like-o" />,
              //   <IconText icon={MessageOutlined} text={`Total :${(item.date.split("T")[0])}`} key="list-vertical-message" />,
            ]}
            extra={
              <Progress type="circle" width={80} percent={((item.Present.length / (item.Present.length + item.Absent.length)) * 100).toFixed()} />
            }

          >
            <List.Item.Meta
              avatar={<Avatar src={'https://joeschmoe.io/api/v1/random'} />}
              title={inputs[0].Subject}
              description={`Total :${(item.date.split("T")[0])}`}

            />
            {item.content}
          </List.Item>
        )}
      />
      <CsvDownload data={classdata}
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
  )
};

export default App;