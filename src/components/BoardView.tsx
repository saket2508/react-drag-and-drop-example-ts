import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { FC } from 'react';
import { CardUI } from './CardUI';
import { avatars } from '../dummy.data'

type CardLayoutProps = {  
    task: Task;
    index: number;
    colId: number;
}

const CardLayout: FC<CardLayoutProps> = ({ task, colId, index }) => {
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

type ColumnLayoutProps = {
    colId: number;
    user: string;
    tasks: Task[]
}

const ColumnLayout: FC<ColumnLayoutProps> = ({ colId, user, tasks }) => {
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
                            <CardLayout 
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

type BoardViewLayoutProps = {
    lists: Users;
    modifyLists: (users: Users) => void;
}

const BoardViewLayout: FC<BoardViewLayoutProps> = (props) => {
    const { lists, modifyLists } = props;

    const handleDragEnd = (res: DropResult) => {
        const { source, destination } = res;
        if(!destination){
            return
        }
        let _lists = {...lists};
        let sourceUser = source.droppableId;
        let sourceIdx = source.index;

        let destUser = destination.droppableId;
        let destIdx = destination.index;

        if(sourceUser === destUser){
            // items are in the same column and need to be swapped
            let sourceItem = _lists[sourceUser][sourceIdx];
            _lists[sourceUser][sourceIdx] = _lists[sourceUser][destIdx];
            _lists[sourceUser][destIdx] = sourceItem
        } else {
            // items are in different columns so the source needs to be inserted into the destination list at the given position
            let sourceItem = _lists[sourceUser][sourceIdx];
            _lists[destUser] = [
                ..._lists[destUser].slice(0, destIdx), 
                sourceItem, 
                ..._lists[destUser].slice(destIdx)
            ]
            _lists[sourceUser] = [
                ..._lists[sourceUser].slice(0, sourceIdx), 
                ..._lists[sourceUser].slice(sourceIdx+1)
            ];
        }
        modifyLists(_lists);
    }

    return(
        <div className='d-flex flex-column flex-md-row gap-3'>
            <DragDropContext onDragEnd={handleDragEnd}>
                {Object.keys(lists).map((name: string, idx: number) => {
                    return (
                        <ColumnLayout
                            key={name}
                            user={name}
                            tasks={lists[name]}
                            colId={idx}
                        />
                    )
                })}
            </DragDropContext>
        </div>
      )
}

export default BoardViewLayout