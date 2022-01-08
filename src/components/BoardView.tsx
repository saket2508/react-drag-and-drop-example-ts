import Task from '../../types/Task';
import User from '../../types/User';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const TaskCard = (props: {task: Task, id: number}) => {
    const { task, id } = props;
    return(
        <Draggable draggableId={task.id.toString()} index={id}>
            {(provided, snapshot) => (
                <div 
                    key={id} 
                    className='card p-1'
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {task.title}
                    <div className='d-flex justify-content-between'>
                        <small className='text-muted'>id: {task.id}</small>
                            {task.completed 
                                ? <small className='text-success'>Completed</small>
                                : <small className='text-warning'>Pending</small>
                            }
                    </div>
                    
                </div>
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
                            <TaskCard task={task} id={id} key={id}/>
                        )
                    })}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </div>
    )
}


const BoardViewLayout = (props: {lists: User[], modifyLists: (users: User[]) => void}) => {
    const { lists, modifyLists } = props;

    const handleDragEnd = (res: any) => {
        const { source, destination } = res;
        if(!destination){
            return
        }
        let _lists = [...lists];
        let sourceUserIdx = parseInt(source.droppableId) - 1;
        let sourceItemIdx = source.index;

        let destUserIdx = parseInt(destination.droppableId) - 1;
        let destIdx = destination.index;

        if(sourceUserIdx === destUserIdx){
            // items are in the same column and need to be swapped
            let sourceItem = _lists[sourceUserIdx].tasks[sourceItemIdx];
            _lists[sourceUserIdx].tasks[sourceItemIdx] = _lists[sourceUserIdx].tasks[destIdx];
            _lists[sourceUserIdx].tasks[destIdx] = sourceItem
        } else {
            // items are in different columns so the source needs to be inserted into the destination list at the given position
            let sourceItem = _lists[sourceUserIdx].tasks[sourceItemIdx];
            _lists[destUserIdx].tasks = [..._lists[destUserIdx].tasks.slice(0, destIdx), sourceItem, ..._lists[destUserIdx].tasks.slice(destIdx)]
            _lists[sourceUserIdx].tasks = [..._lists[sourceUserIdx].tasks.slice(0, sourceItemIdx), ..._lists[sourceUserIdx].tasks.slice(sourceItemIdx+1)];
        }
        modifyLists(_lists);
    }

    return(
        <div className='d-flex flex-column flex-md-row gap-3'>
            <DragDropContext onDragEnd={handleDragEnd}>
                {lists?.map((user: User, id: number ) => {
                    return(
                        <Column key={id} user={user}/>
                    )
                })}
            </DragDropContext>
        </div>
      )
}

export default BoardViewLayout