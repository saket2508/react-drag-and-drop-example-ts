import { Card } from 'reactstrap';
import Task from '../../types/Task';
import User from '../../types/User';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const TaskCard = (props: {task: Task, id: number}) => {
    const { task, id } = props;
    return(
        <Draggable draggableId={task.id.toString()} index={id}>
            {provided => (
                <Card 
                    key={id} 
                    className='p-1'
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    innerRef={provided.innerRef}
                >
                    {task.title}
                    <div className='d-flex justify-content-between'>
                        <small className='text-muted'>id: {task.id}</small>
                            {task.completed 
                                ? <small className='text-success'>Completed</small>
                                : <small className='text-warning'>Pending</small>
                            }
                    </div>
                </Card>
            )}
        </Draggable>
    )
}

const Column = (props: { user: User }) => {
    const { user } = props;
    return (
    <div
        key={user.id} 
        className='col p-2 h-100' 
        style={{ backgroundColor: '#E5E5E5' }}
        >   
        <div className='d-flex align-items-center gap-2'>
            <img className='thumbnailPic' src={user.img}/>
            <h6 className='fw-bold'>{user.name}</h6>
        </div>
        <Droppable droppableId={user.id}>
            {provided => (
                <div 
                    className='d-flex flex-column gap-1 pt-2 pb-2'
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {props.user.tasks.map((task: Task, id: number) => {
                        return (
                            <TaskCard task={task} id={id}/>
                        )
                    })}
                </div>
            )}
        </Droppable>
    </div>
    )
}


const BoardViewLayout = (props: {data: User[]}) => {
    const handleDragEnd = () => {}
    const { data } = props;
    return(
        <div className='d-flex flex-column flex-md-row gap-3'>
            <DragDropContext onDragEnd={handleDragEnd}>
                {data?.map((user: User, id: number ) => {
                    return(
                        <Column key={id} user={user}/>
                    )
                })}
            </DragDropContext>
        </div>
      )
}

export default BoardViewLayout