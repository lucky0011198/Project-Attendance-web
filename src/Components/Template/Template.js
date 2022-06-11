import { DownloadOutlined } from '@ant-design/icons';
import { message, Upload, Divider, List, Input, Tag, Button, Card } from 'antd';
import React, { useState } from 'react';
import Papa from "papaparse";
import Preview from './Preview';
import  Templates from "./Templates"
import * as react_redux from "react-redux";
const { Dragger } = Upload;
const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',

    onChange(info) {
        const { status } = info.file;

        console.log(info.target.files[0]);
        Papa.parse(info.target.files[0], {
            complete: function (results) {
                console.log("Finished:", results.data);
            }
        }
        )


        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }

        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },

    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

const App = () => {
    const list = react_redux.useSelector((state) => state.users.Template);
    const [Data, setData] = useState([])
    const [Template,setTemplate]= useState([])
    const [name,setname] = useState('')


    console.log(Data[0])
    return (
        <div>
            <div className='template-container'>

                <div>
                    <input
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        onChange={(e) => {
                            const files = e.target.files;

                            if (files) {

                                Papa.parse(files[0], {
                                    complete: function (results) {


                                        results.data.map((i) => {
                                            setData((j) => [...j, i[0]])
                                        })

                                        // setData(Data.concat(results.data))

                                    }
                                }
                                )
                            }


                        }}
                    />
                </div>
                <div><Input placeholder="Borderless"
                value={name}
                onChange={setname}
                bordered={false} /></div>

                <Preview Data={Data}/>
            </div>
<br/>
<div className="item-container">

    {
        list.map((i)=>(
<Card size="small" title={i.name} extra={<Preview Data={i.data}/>} style={{ width: 300 }}>
     {i.date}
     </Card>
        ))
    }

   
    </div>
         </div>

            )
}



            export default App;