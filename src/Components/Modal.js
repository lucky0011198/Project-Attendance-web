import { Button, Modal, Form, Select } from "antd";
import React, { useState } from "react";
import * as icon from "@ant-design/icons";
import * as ant from "antd";
import { useSelect, useDispatch } from "react-redux";

import * as react_redux from "react-redux";
import { addUser } from "./redux/users";

//select input feild..
const { Option } = Select;
let index = 0;
export default () => {
  const dispatch = react_redux.useDispatch();
  const list = react_redux.useSelector((state) => state.users.value);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reverse, setReverse] = useState(true);
  const [Range, setRange] = useState([1, 10]);
  const [Type, setType] = useState("Lecture");

  console.log(list);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //select input feild....
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    let id = "";
    id += value;
    setInputs((values) => ({
      ...values,
      [name]: value,
      Type,

      Attendance: [],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      addUser({
        ...inputs,
        id: inputs.Subject + inputs.Batch + inputs.Branch + inputs.Type,
        Range,
      })
    );
  };

  const [items, setItems] = useState({
    Batch: [],
    Branch: [],
    Subject: [],
  });

  return (
    <>
      <Button
        type="default"
        shape="round"
        icon={<icon.PlusOutlined style={{ fontSize: "3rem", color: "#DDD" }} />}
        onClick={showModal}
        className="creat"
      ></Button>
      <Modal
        footer={null}
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form onSubmit={handleSubmit}>
          {[{ name: "Subject" }, { name: "Branch" }, { name: "Batch" }].map(
            (i) => (
              <Form.Item
                name={i.name}
                rules={[
                  {
                    required: true,
                    message: "Please ant.input your Range!",
                  },
                ]}
              >
                <ant.Input
                  placeholder={`${i.name} name`}
                  name={i.name}
                  value={eval(`inputs.${i.name}`) || ""}
                  onChange={handleChange}
                />

                <ant.Radio.Group buttonStyle="solid">
                  {eval(`items.${i.name}`).map((i) => (
                    <ant.Radio.Button value={i}>{i}</ant.Radio.Button>
                  ))}
                </ant.Radio.Group>
              </Form.Item>
            )
          )}

          <Form.Item
            name="Range"
            label="Select range"
            rules={[
              {
                required: true,
                message: "Please ant.input your Range!",
              },
            ]}
          >
            <ant.Slider
              range
              step={0}
              defaultValue={Range}
              onChange={setRange}
            />
            <ant.Space>
              <h4>
                Students from :<b> {Range[0]}</b>
              </h4>

              <h4>
                Students to : <b> {Range[1]} </b>
              </h4>
            </ant.Space>
          </Form.Item>
          <Form.Item
            label="Select lecture type"
            rules={[
              {
                required: true,
                message: "Please ant.input your type!",
              },
            ]}
          >
            <ant.Select
              defaultValue={Type}
              style={{
                width: 120,
              }}
              onChange={setType}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </ant.Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </form>
      </Modal>
    </>
  );
};
