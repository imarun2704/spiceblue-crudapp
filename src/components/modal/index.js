import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { connect } from "react-redux";
import { setAddData } from "./../../redux/actions/contactActions";
import axios from "axios";

class ModalView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      assigneeName: null,
      photo: null,
      date: null,
      time:null,
      description:null,
      localId:null
    };
    // this.submitForm = this.submitForm.bind(this);
  }
  handleClose() {
    this.props.close();
  }

  
  handleSave() {
const token ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODg0MjYyNTEsIm5iZiI6MTU4ODQyNjI1MSwianRpIjoiY2M4ODYxMDEtOWY3OC00NzNjLTgwODctOTRkMGQwNGNmOTkyIiwiaWRlbnRpdHkiOnsibmFtZSI6IlNhcmF2YW5hbiBUZXN0aW5nIiwiZW1haWwiOiJzcGljZWJsdWV0ZXN0MkBnbWFpbC5jb20iLCJ1c2VyX2lkIjoiNWU3ODgwZGE3ZWEyZjA5ZTgwM2U4NmY1IiwiaWNvbiI6IiJ9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.wcBIUDWWx4YcPEzjwykqMwv-kl-lop4v9nvPDJk-ArM';
//  const body= {
//       assigned_user:"5e7880dd7ea2f09e803e86fa",
//       task_date:this.state.date,
//       task_time:this.state.time,
//       task_msg: this.state.description
//     };


    axios.post('https://stageapi.hellomail.io/task/5e7880dd7ea2f09e803e86fa',{
   assigned_user:"5e7880dd7ea2f09e803e86fa",
   task_date:"this.state.date",
   task_time:"this.state.time",
   task_msg: "this.state.description"
   }, {
    headers:{
      'Authorization':`Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      console.log(res.data,'222');
    })
    .catch(err => {
      console.log(err,'222');
    });

    // this.props.setAddData(data);
    this.handleClose();
  }


  render() {
    const { show } = this.props;
    return (
      <div>
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>Create Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           
            
             <TextField
             className="mt-2"
              autoFocus
              margin="dense"
              type="date"
              fullWidth
              onChange={e => {
                this.setState({ date: e.target.value });
              }}
            />
            <TextField
              autoFocus
              className="mt-2"
              margin="dense"
              id="description"
              label="Task description"
              type="string"
              fullWidth
              onChange={e => {
                this.setState({ description: e.target.value });
              }}
            />
          <div className="mt-3">
          <InputLabel htmlFor="name-multiple">Select Time</InputLabel>
             <Select
                   className="mb-2"
                  style={{ width: "100%" }}
                  onChange={e => {this.setState({time:e.target.value }) }}
                  label="Time"
                  input={<Input id="name-multiple" />}
                >
                  <MenuItem value={"9.00 am"}>9.00 am</MenuItem>
                  <MenuItem value={"12.00 pm"}>12.00 pm</MenuItem>
                  <MenuItem value={"3.00 pm"}>3.00 pm</MenuItem>
                  <MenuItem value={"6.00 pm"}>6.00 pm</MenuItem>
                </Select>
                </div>
            {/* <input
              ref={fileInput => (this.fileInput = fileInput)}
              type="file"
              className="uploadImage"
              onChange={evt => this.uploadImage(evt)}
            /> */}
            <div className="mt-2">
              <Button
                variant="outline-success"
                onClick={this.handleSave.bind(this)}
              >
                save
              </Button>
              <span className="ml-3">
                <Button
                  variant="outline-danger"
                  onClick={this.handleClose.bind(this)}
                >
                  Close
                </Button>
              </span>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setAddData: data => dispatch(setAddData(data))
});

export default connect(
  null,
  mapDispatchToProps
)(ModalView);
