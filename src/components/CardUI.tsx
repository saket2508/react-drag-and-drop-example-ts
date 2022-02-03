import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { FC } from 'react';

type CardUIProps = {
    provided: DraggableProvided;
    snapshot: DraggableStateSnapshot;
    colId: number;
    task: Task;
}

export const CardUI: FC<CardUIProps> = (props) => {
    const { provided, snapshot, colId, task } = props
    if(!snapshot.isDragging){
        return(
            <div 
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
        )
    }
    switch(colId){
        case 0:
            return(
                <div 
                    className='card p-1 blueBg'
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
            )
        case 1:
            return(
                <div 
                    className='card p-1 yellowBg'
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
            )
        case 2:
            return(
                <div 
                    className='card p-1 purpleBg'
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
            )
        case 3:
            return(
                <div 
                    className='card p-1 greenBg'
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
            )
        default:
            return(
                <div></div>
            )
    }
}
