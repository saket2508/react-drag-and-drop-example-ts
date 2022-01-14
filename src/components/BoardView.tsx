import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { FC } from 'react';
import { CardUI } from './CardUI';

type CardLayoutProps = {  
    task: Task;
    id: number;
    colId: string;
}

const CardLayout: FC<CardLayoutProps> = (props) => {
    const { task, colId, id } = props;
    return(
        <Draggable draggableId={task.id} index={id}>
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

type ColumnLayoutProps = {
    user: User;
}

const ColumnLayout: FC<ColumnLayoutProps> = (props) => {
    const { user } = props;
    return (
    <div
        className='col p-2 h-100' 
        style={{ backgroundColor: '#E5E5E5' }}
        >   
        <div className='d-flex align-items-center gap-2'>
            <img className='thumbnailPic' src={user.img} alt={user.name}/>
            <h6 className='fw-semibold'>{user.name}</h6>
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
                            <CardLayout task={task} id={id} key={id} colId={user.id}/>
                        )
                    })}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </div>
    )
}

type BoardViewLayoutProps = {
    lists: User[];
    modifyLists: (users: User[]) => void;
}

const BoardViewLayout: FC<BoardViewLayoutProps> = (props) => {
    const { lists, modifyLists } = props;

    const handleDragEnd = (res: DropResult) => {
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
                {lists.map((user: User, id: number ) => {
                    return(
                        <ColumnLayout key={id} user={user}/>
                    )
                })}
            </DragDropContext>
        </div>
      )
}

export default BoardViewLayout