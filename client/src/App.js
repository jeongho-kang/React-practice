import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@mui/material';

const styles = theme => ({
  root : {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table : {
    minWidth: 1000
  },
  Progress : {
    margin:theme.spacing(2)
  }
});



// props 는 변경할 수 없는 데이터를 명시할 때 사용하고
// state 는 변경할 수 있는 데이터를 명시할 떄 사용한다.

class App extends Component {
  state={
    customers : "",
    completed : 0
  }
  // 실제 api 서버에 접근하도록 componentDidMount 를 사용한다.
  componentDidMount() {
    this.timer=setInterval(this.progress, 20); // 0.02초마다 프로그레스 설정
    this.callApi()
    .then(res => this.setState({customers:res}))
    .catch(err => console.log(err));
  }
  // api 불러오기 (비동기적 수행)
  callApi = async() => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }
  progress =() => {
    const {completed} = this.state;
    this.setState({completed:completed >=100 ? 0 : completed +1});
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
      <Paper className ={classes.root}>
        <Table className = {classes.table}>
        <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead> 
          <TableBody>
        {this.state.customers? this.state.customers.map(c => {
            return(
              <Customer 
              key={c.id}
              id={c.id}
              image={c.image}
              name={c.name}
              birthday={c.birthday}
              gender={c.gender}
              job={c.job} 
              />
             );
          }) :
          <TableRow>
            <TableCell colSpan="6" align="center">
              <CircularProgress className={classes.progress} variant="determinate" value ={this.state.completed}/>
            </TableCell>
          </TableRow>
         }
          </TableBody>
        </Table>
      </Paper>
      <CustomerAdd/>
      </div>
    );
  }
  
}

export default withStyles(styles)(App);

