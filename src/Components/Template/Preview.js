import { Button, Drawer, Divider, List, Tag,Space,Input } from 'antd';
import React, { useState } from 'react';
import * as react_redux from "react-redux";
import { addTemplate } from "../redux/users";

const App = (Props) => {

    const dispatch = react_redux.useDispatch();
    const [visible, setVisible] = useState(false);
    const [name,setname] = useState('')

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    console.log(name)
    return (
        <div>
            <Button type="primary" onClick={showDrawer}>
                Open
            </Button>
            <Drawer
             extra={
                <Space>
                     <div><Input placeholder="Borderless"
                
            
                onChange={(event)=>{
                    setname(event.target.value)
                }}
                bordered={false} /></div>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button type="primary" onClick={()=>{
                     dispatch(addTemplate({data:Props.Data,name,date:new Date()}))
                    alert(name)
                  }}>
                   Add
                  </Button>
                </Space>
              }
                size={window.innerWidth>600?"large":"default"}
                 placement="right" onClose={onClose} visible={visible}>
                <Divider orientation="left">Preview Data</Divider>
                <List
                    header={<div>Header</div>}

                    bordered
                    dataSource={Props.Data}
                    renderItem={(item, index) => (
                        <List.Item>
                            <Tag>{(index + 1)}</Tag> {item}
                        </List.Item>
                    )}
                />
            </Drawer>
        </div>
    );
};

export default App;