import { Draggable, Droppable } from 'react-beautiful-dnd'
import { CardUI } from './CardUI'
import { avatars } from '../dummy.data'

type ItemProps = {  
    task: Task;
    index: number;
    colId: number;
}

const Item = ({ task, colId, index }: ItemProps) => {
    return(
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <CardUI 
                    provided={provided} 
                    snapshot={snapshot} 
                    colId={colId} 
                    task={task}
                />
            )}
        </Draggable>
    )
}

type ListProps = {
    colId: number;
    user: string;
    tasks: Task[]
}

export const List = ({ colId, user, tasks }: ListProps) => {
    return (
    <div
        className='col p-2 h-100' 
        style={{ backgroundColor: '#E5E5E5' }}
        >   
        <div className='d-flex align-items-center gap-2'>
            <img className='thumbnailPic' src={avatars[user]} alt={user}/>
            <h6 className='fw-semibold'>{user}</h6>
        </div>
        <Droppable droppableId={user}>
            {provided => (
                <div 
                    className='d-flex flex-column gap-1 pt-2 pb-2'
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {tasks.map((task: Task, idx: number) => {
                        return (
                            <Item 
                                task={task}
                                index={idx} 
                                key={idx} 
                                colId={colId}
                            />
                        )
                    })}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </div>
    )
}
