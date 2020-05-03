import React from "react";
import FormControl from "react-bootstrap/FormControl";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Modal from "./../modal";
import { deleteData } from "./../../redux/actions/contactActions";
import ModalUpdateView from "./../updateModal";
import { connect } from "react-redux";
import axios from 'axios';
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  }
}));
class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      updateShow: false,
      viewObj: {},
      updateData: {},
      searchField: "",
      reader:null,
      data:[]
    };
    this.handleModal = this.handleModal.bind(this);
    this.handleUpdatedData = this.handleUpdatedData.bind(this);
    this.handleEditModalClose = this.handleEditModalClose.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleReader = this.handleReader.bind(this);
  }

  componentDidMount(){
    const token ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODg0MjYyNTEsIm5iZiI6MTU4ODQyNjI1MSwianRpIjoiY2M4ODYxMDEtOWY3OC00NzNjLTgwODctOTRkMGQwNGNmOTkyIiwiaWRlbnRpdHkiOnsibmFtZSI6IlNhcmF2YW5hbiBUZXN0aW5nIiwiZW1haWwiOiJzcGljZWJsdWV0ZXN0MkBnbWFpbC5jb20iLCJ1c2VyX2lkIjoiNWU3ODgwZGE3ZWEyZjA5ZTgwM2U4NmY1IiwiaWNvbiI6IiJ9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.wcBIUDWWx4YcPEzjwykqMwv-kl-lop4v9nvPDJk-ArM';
    
    axios.get(`https://stageapi.hellomail.io/task/5e7880dd7ea2f09e803e86fa`,{
      headers:{
        "Authorization" :`Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      console.log(res.data,'222');
      this.setState({data:res.data.results});
    })
  }
  handleModal() {
    this.setState({ open: !this.state.open });
  }
  handleClose() {
    this.setState({ open: false });
  }

  handleView(id) {
    const obj = this.props.contactListData.find(el => el.id === id);
    this.setState({ viewObj: obj });
  }
  handleEditModal(data) {
    console.log("kakkakkakk", data)
    this.setState({ updateShow: true, updateData: data });
  }

  handleEditModalClose() {
    this.setState({ updateShow: false });
  }

  handleDelete(id) {
    const token ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODg0MTE4NDUsIm5iZiI6MTU4ODQxMTg0NSwianRpIjoiNjBhZjk4ZGMtNjA3Ny00MTM3LWExY2UtYWZmMjJlZTliNGQ0IiwiaWRlbnRpdHkiOnsibmFtZSI6IlNhcmF2YW5hbiBUZXN0aW5nIiwiZW1haWwiOiJzcGljZWJsdWV0ZXN0MkBnbWFpbC5jb20iLCJ1c2VyX2lkIjoiNWU3ODgwZGE3ZWEyZjA5ZTgwM2U4NmY1IiwiaWNvbiI6IiJ9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.ljF09welDL4yLUKEt9kR-b3LpdFFndOJRD-BEUzhy8s';

    axios.delete(`https://stageapi.hellomail.io/task/5e7880dd7ea2f09e803e86fa/${id}`,{ headers:{
      "Authorization" :`Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }})
    .then(res => {
      window.location.reload();
      console.log(res,'suces')
    })
    // this.props.deleteData(id);
    // this.setState({ viewObj: {} });
  }
  handleUpdatedData(data) {
    this.setState({ viewObj: data });
  }
  handleReader(data){
    this.setState({ reader:data });
  }

  render() {
    // const filteredData = this.props.contactListData.filter(el =>
    //   el.assigneeName.includes(this.state.searchField)
    // );
    const classes = <useStyles />;
    return (
      <div>
        <Modal show={this.state.open} reader={this.handleReader} close={this.handleClose} />
        <ModalUpdateView
          show={this.state.updateShow}
          parentData={this.handleUpdatedData}
          data={this.state.updateData}
          close={this.handleEditModalClose}
          localId={this.state.updateData.id && this.state.updateData.id }
        />

        <Container>
          <Row>
            <Col xs={12} md={8}>
              <div className="d-flex justify-content-between mt-5 ">
                <FormControl
                  type="text"
                  placeholder="Search By Name"
                  onChange={e => {
                    this.setState({ searchField: e.target.value });
                  }}
                  className="w-50"
                />
                <Button variant="outline-info" onClick={this.handleModal}>
                  Create Task
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={8}>
              <div className="mt-5">
                <Table responsive="sm">
                  <thead variant="success">
                    <tr>
                      <th>ID</th>
                      <th>Task info</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data &&
                      this.state.data.map(el => (
                        <tr>
                          
                          <td>
                            <div className="d-flex justify-content-start">
                              <Avatar
                                alt="Remy Sharp"
                                src={localStorage.getItem(el.id)}
                                className={classes.small}
                              />
                              <span>{el.assigned_user}</span>{" "}
                      <div>{el.task_msg}</div> <span>{el.task_time}</span>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex ">
                              <Button
                                variant="outline-info"
                                onClick={this.handleEditModal.bind(this, el)}
                              >
                                Edit
                              </Button>
                              <span className="ml-4">
                                {" "}
                                <Button
                                  onClick={this.handleView.bind(this, el.id)}
                                  variant="outline-success"
                                >
                                  View
                                </Button>
                              </span>
                              <span className="ml-1">
                                {" "}
                                <Button
                                variant="outline-danger"
                                onClick={this.handleDelete.bind(this, el.id)}
                              >
                             delete
                              </Button>
                                {/* <Button
                                  onClick={this.handleDelete.bind(this, el.id)}
                                  variant="outline-danger"
                                >
                                  Delete
                                </Button> */}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </Col>

            <Col>
              <div className="mt-5">
                {/* <Card className={classes.root}>
                  <CardContent>
                    <div>

                    <h5>View Task Information</h5>
                      <div className="w-25 h-25">
                       <Avatar   
                        alt="profile photo"
                        src={this.state.viewObj && localStorage.getItem(this.state.viewObj.id)}
                        className={classes.large}
                      />
                      </div>        
                     
                        <div className=" mt-3">
                         <h6>Assignee Name : {this.state.viewObj && this.state.viewObj.assigneeName}</h6> 
                         </div>
                         <div className=" mt-3">
                         <h6>Date : {this.state.viewObj && this.state.viewObj.date}</h6> 
                         </div>
                         <div className=" mt-3">
                         <h6>Time : {this.state.viewObj && this.state.viewObj.time}</h6> 
                         </div>                      
                         <div className=" mt-3">
                         <h6>Description : {this.state.viewObj && this.state.viewObj.description}</h6> 
                         </div>
                      
                    </div>
                  </CardContent>
                  <CardActions></CardActions>
                </Card> */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ contactReducer }) => ({
  contactListData: contactReducer.contactListData
});
const mapDispatchToProps = dispatch => ({
  deleteData: id => dispatch(deleteData(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contact);
