import React, { useEffect, useState } from 'react'
import axios from 'axios'
import User from '../types/User'
import { Card } from 'reactstrap'
import BoardViewLayout from './components/BoardView'

const App = () => {
  const [ usersData, setUsersData ] = useState<User[] | null>(null);

  const getData = () => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then((res => res.data))
      .then(data => {
        let finn = data.slice(0, 9);
        let jake = data.slice(9, 13);
        let bubblegun = data.slice(13, 20);
        setUsersData([
            {name: 'Finn', tasks: finn, img:'/images/finn.png', id:'1'}, 
            {name: 'Jake', tasks: jake, img:'/images/jake.png', id: '2'},
            {name: 'Princess Bubblegum', tasks: bubblegun, img:'/images/bubblegum.png', id: '3'},
        ])
      })
  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <div className='container'>
      <h3 className='text-center mt-4'>Board View Component</h3>
      <div className='container mt-4 pb-4'>
        <BoardViewLayout data={usersData!}/>
      </div>
    </div>
  );
}

export default App;
