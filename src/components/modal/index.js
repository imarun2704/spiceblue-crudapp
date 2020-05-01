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
    const id= new Date().getUTCMilliseconds();
    let data = {
      id:id && id,
      assigneeName: this.state.assigneeName,
      photo: this.state.photo,
      date: this.state.date,
      time: this.state.time,
      description: this.state.description
    };
    this.props.setAddData(data);
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
              autoFocus
              margin="dense"
              id="name"
              label="Assignee Name"
              type="string"
              fullWidth
              onChange={e => {
                this.setState({ assigneeName: e.target.value });
              }}
            />
            
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
