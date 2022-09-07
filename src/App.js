import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root : {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table : {
    minWidth: 1000
  }
})

/*const customers = [{
  'id': 1,
  'image' : 'https://placeimg.com/64/64/1',
  'name': '강정호',
  'birthday' : 980307,
  'gender' : '남자',
  'job' : '대학생'
},
{
  'id': 2,
  'image' : 'https://placeimg.com/64/64/2',
  'name': '홍길동',
  'birthday' : 560407,
  'gender' : '남자',
  'job' : '개발자'
},
{
  'id': 3,
  'image' : 'https://placeimg.com/64/64/3',
  'name': '이순신',
  'birthday' : 950512,
  'gender' : '남자',
  'job' : '충무공'
}
]
*/
class App extends Component {
  render() {
    const { classes } = this.props;
    return (
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
        {customers.map(c => {
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
            }
          )
         }
          </TableBody>
        </Table>
      </Paper>
    );
  }
  
}

export default withStyles(styles)(App);

