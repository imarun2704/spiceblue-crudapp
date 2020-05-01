import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { connect } from 'react-redux';
import {updateData} from './../../redux/actions/contactActions';

class ModalUpdateView extends React.Component {
    constructor(props){
        super(props);
        this.state={
            open: false,
            assigneeName:null,
            photo:null,
            date:null,
            time:null,
            description:null
        };
    }
    handleClose(){
        this.props.close();
    }
    handleSave(){

       let data = {
        id: this.props.data.id,
        assigneeName: this.state.assigneeName === null ? this.props.data.assigneeName : this.state.assigneeName ,
        date: this.state.date === null ? this.props.data.date : this.state.date,
        time: this.state.time === null ? this.props.data.time : this.state.time,
        description: this.state.description === null ? this.props.data.description : this.state.description,
      };
      this.props.updateData(data);
      this.props.parentData(data);
      this.handleClose();
    }

    uploadImage = (element) => {
      var file = element.target.files[0];
      var reader = new FileReader();
      let localId  =  this.props.localId;
      reader.onloadend = function() {
        localStorage.setItem(localId, reader.result);
      };
      reader.readAsDataURL(file);
    };
    render(){

        const {show, data} = this.props;
        return (
     <div>
      <Modal show={show} >
        <Modal.Header >
         <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Assignee Name"
              type="string"
              defaultValue={data.assigneeName}
              fullWidth
              onChange={e => {
                this.setState({ assigneeName: e.target.value });
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="date"
              label="date"
              type="date"
              fullWidth
              defaultValue={data.date}
              onChange={e => {
                this.setState({ date: e.target.value });
              }}
            />
             <TextField
               autoFocus
               margin="dense"
               id="description"
               label="Task description"
               type="string"
               fullWidth
               onChange={e => {
                 this.setState({ description: e.target.value });
               }}
              defaultValue={data.description}
              
            />

          <div className="mt-3">
          <InputLabel htmlFor="name-multiple">Select Time</InputLabel>
             <Select
                  className="mb-2"
                  style={{ width: "100%" }}
                  onChange={e => {this.setState({time:e.target.value }) }}
                  defaultValue={data.time}
                  input={<Input id="name-multiple" />}
                >
                  <MenuItem value={"9.00 am"}>9.00 am</MenuItem>
                  <MenuItem value={"12.00 pm"}>12.00 pm</MenuItem>
                  <MenuItem value={"3.00 pm"}>3.00 pm</MenuItem>
                  <MenuItem value={"6.00 pm"}>6.00 pm</MenuItem>
                </Select>
          </div>

           
            <div className="mt-2">
            <Button variant="outline-success" onClick={this.handleSave.bind(this) }>save</Button>
            <span className="ml-3">
            <Button variant="outline-danger" onClick={this.handleClose.bind(this)}> Close
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
    updateData: (data) => dispatch(updateData(data))
 });
 
export default connect(null, mapDispatchToProps)(ModalUpdateView);