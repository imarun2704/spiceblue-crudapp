import React from "react";
import FormControl from "react-bootstrap/FormControl";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Modal from "./../modal";
import { deleteData, setAddData } from "./../../redux/actions/contactActions";
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
    const token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODg5NDYxMzUsIm5iZiI6MTU4ODk0NjEzNSwianRpIjoiNzYzODQwNDItN2Q4NS00OWZhLWJlOWEtMjUzZDZhOTVkN2Y5IiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1YmkgUCIsImVtYWlsIjoic3ViaUBzdWJpLmxsIiwidXNlcl9pZCI6IjVlYjNjMzkwZDY5ZGFiMjgyMmQxNjU3OCIsImNvbXBhbnlfaWQiOiI1ZWIzYzM5MGQ2OWRhYjI4MjJkMTY1NzciLCJpY29uIjoiaHR0cHM6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9jNjY0MWU4Y2ZkYzQ2NzU0MDg1NGI0ZDAyOWZhYTJhYSJ9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.4TeJPYqxecbuAO8VXN_fF1gfbiTVVl3QtyZODz_8Ifk";

    axios.get(`https://stageapi.hellomail.io/task/5eb3c394d69dab2822d1657d`,{
      headers:{
        "Authorization" :`Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      console.log(res.data,'222');
      this.setState({data:res.data.results});
      const data = res.data.results;
      this.props.setAddData(data);
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
    const token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODg5NDYxMzUsIm5iZiI6MTU4ODk0NjEzNSwianRpIjoiNzYzODQwNDItN2Q4NS00OWZhLWJlOWEtMjUzZDZhOTVkN2Y5IiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1YmkgUCIsImVtYWlsIjoic3ViaUBzdWJpLmxsIiwidXNlcl9pZCI6IjVlYjNjMzkwZDY5ZGFiMjgyMmQxNjU3OCIsImNvbXBhbnlfaWQiOiI1ZWIzYzM5MGQ2OWRhYjI4MjJkMTY1NzciLCJpY29uIjoiaHR0cHM6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9jNjY0MWU4Y2ZkYzQ2NzU0MDg1NGI0ZDAyOWZhYTJhYSJ9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.4TeJPYqxecbuAO8VXN_fF1gfbiTVVl3QtyZODz_8Ifk";

    axios.delete(`https://stageapi.hellomail.io/task/5eb3c394d69dab2822d1657d/${id}`,{ headers:{
      "Authorization" :`Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }})
    .then(res => {
      console.log(res.data,'suces');
   
      this.props.deleteData(id);
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
    console.log(this.props.listData,'111');
      const listData = this.props.listData;
 
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
                    {listData &&
                     listData.map(el => (
                        <tr key={el.id}>
                          
                          <td>
                            <div className="d-flex justify-content-start">
                              <Avatar
                                alt="Remy Sharp"
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
              
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ contactReducer }) => ({
  listData: contactReducer.listData
});
const mapDispatchToProps = dispatch => ({
  deleteData: id => dispatch(deleteData(id)),
  setAddData: (data) => dispatch(setAddData(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contact);
