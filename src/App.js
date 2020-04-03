import React, { useState } from 'react';
import { List, Button, Row, Col, Checkbox, Input } from 'antd';
import './App.css';

function App() {
  const [inProgressList, setInProgressList] = useState([]);
  const [completedList, setCompletedList] = useState([])
  const [inputValue, setInputValue] = useState("");

  function addTask() {
    setInProgressList(inProgressList => [...inProgressList, { checked: false, task: inputValue }])
    setInputValue("")
  }

  function moveInProgressToCompleted() {
    const toMoved = inProgressList.filter(item => item.checked === true);
    const notMoved = inProgressList.filter(item => item.checked === false);
    setCompletedList(completedList => [...completedList, ...toMoved])
    setInProgressList(notMoved);
  }

  function moveCompletedToInProgress() {
    const toMoved = completedList.filter(item => item.checked === true);
    const notMoved = completedList.filter(item => item.checked === false);
    setInProgressList(inProgressList => [...inProgressList, ...toMoved])
    setCompletedList(notMoved);
  }

  function onChangeInProgress(e) {
    const newInProgressList = [...inProgressList]
    const targetIdx = newInProgressList.findIndex(item => item.task === e.target.value)
    newInProgressList[targetIdx] = { checked: e.target.checked, task: e.target.value }
    setInProgressList(newInProgressList)
  }

  function onChangeCompleted(e) {
    const newCompletedList = [...completedList]
    const targetIdx = newCompletedList.findIndex(item => item.task === e.target.value)
    newCompletedList[targetIdx] = { checked: e.target.checked, task: e.target.value }
    setCompletedList(newCompletedList)
  }

  return (
    <Row justify="center" style={{ marginTop: '50px' }} gutter={[16, 24]}>
      <Col span={8}>
        <Row>
          <List
            style={{ width: '100%' }}
            header={<div>In Progress</div>}
            bordered
            dataSource={inProgressList}
            renderItem={item => (
              <List.Item>
                <Checkbox 
                value={item.task} 
                checked={item.checked}
                onChange={onChangeInProgress}>{item.task}</Checkbox>
              </List.Item>
            )}
          />
        </Row>
        <Row>
          <Col span={20}>
            <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          </Col>
          <Col span={4}>
            <Button onClick={addTask} style={{ width: '100%' }}>Add</Button>
          </Col>
        </Row>
      </Col>
      <Col>
        <Row style={{ height: '100%' }} justify="center" align="middle">
          <Button onClick={moveCompletedToInProgress} className="my-button">
            ←
          </Button>
          <Button onClick={moveInProgressToCompleted} className="my-button">
            →
          </Button>
        </Row>
      </Col>
      <Col span={8}>
        <List
          header={<div>Completed</div>}
          bordered
          dataSource={completedList}
          renderItem={item => (
            <List.Item>
              <Checkbox 
              value={item.task} 
              checked={item.checked} 
              onChange={onChangeCompleted}>{item.task}</Checkbox>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
}

export default App;
