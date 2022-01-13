import Task from './Task';

interface User {
    id: string,
    name: string,
    img: string,
    tasks: Task[]
}

export default User