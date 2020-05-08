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
import axios from 'axios';
class ModalUpdateView extends React.Component {
    constructor(props){
        super(props);
        this.state={
            open: false,
            assigneeName:'',
            photo:null,
            date:'',
            time:'',
            description:''
        };
    }
    handleClose(){
        this.props.close();
    }
    handleSave(id){
      const token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODg5NDYxMzUsIm5iZiI6MTU4ODk0NjEzNSwianRpIjoiNzYzODQwNDItN2Q4NS00OWZhLWJlOWEtMjUzZDZhOTVkN2Y5IiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1YmkgUCIsImVtYWlsIjoic3ViaUBzdWJpLmxsIiwidXNlcl9pZCI6IjVlYjNjMzkwZDY5ZGFiMjgyMmQxNjU3OCIsImNvbXBhbnlfaWQiOiI1ZWIzYzM5MGQ2OWRhYjI4MjJkMTY1NzciLCJpY29uIjoiaHR0cHM6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9jNjY0MWU4Y2ZkYzQ2NzU0MDg1NGI0ZDAyOWZhYTJhYSJ9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.4TeJPYqxecbuAO8VXN_fF1gfbiTVVl3QtyZODz_8Ifk";

      axios.put(`https://stageapi.hellomail.io/task/5eb3c394d69dab2822d1657d/${id}`,{
       
          assigned_user:"5eb3c394d69dab2822d1657d",
          task_date:this.state.date ? this.state.date : this.props.data.task_date,
          task_time:this.state.time ? this.state.time : this.props.data.task_time,
          task_msg:this.state.description ? this.state.description : this.props.data.task_msg
       
      },{
      headers:{
        "Authorization" :`Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => { 
       const data = res.data.results;
       this.props.updateData(data)
      this.handleClose();
      })

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
              id="date"
              label="date"
              type="date"
              fullWidth
              defaultValue={data.task_date_string}
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
              defaultValue={data.task_msg}
              
            />

          <div className="mt-3">
          <InputLabel htmlFor="name-multiple">Select Time</InputLabel>
             <Select
                  className="mb-2"
                  style={{ width: "100%" }}
                  onChange={e => {this.setState({time:e.target.value }) }}
                  defaultValue={data.task_time}
                  input={<Input id="name-multiple" />}
                >
                  <MenuItem value={"9.00 am"}>9.00 am</MenuItem>
                  <MenuItem value={"12.00 pm"}>12.00 pm</MenuItem>
                  <MenuItem value={"3.00 pm"}>3.00 pm</MenuItem>
                  <MenuItem value={"6.00 pm"}>6.00 pm</MenuItem>
                </Select>
          </div>

           
            <div className="mt-2">
            <Button variant="outline-success" onClick={this.handleSave.bind(this, data.id) }>save</Button>
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