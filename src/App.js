import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';

const customers = [{
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
  'birthday' : 450204,
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

class App extends Component {
  render() {
    return (
      <div>
        {
          customers.map(c => {
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
            )
          })
        }
      </div>
    );
  }
  
}

export default App;
