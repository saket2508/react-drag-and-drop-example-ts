import { useState } from 'react'
import BoardViewLayout from './components/BoardView'
import { people } from './dummy.data'

const App = () => {
  const [ usersData, setUsersData ] = useState<Users>(people);

  const modifyLists = (users: Users) => {
    setUsersData(users)
  }

  return (
    <div className='container'>
      <div className='container mt-3 mb-2'>
        <BoardViewLayout 
          lists={usersData} 
          modifyLists={modifyLists}
        />
      </div>
    </div>
  );
}

export default App;
