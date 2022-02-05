import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { List } from './components/List'

type GridProps = {
    lists: Users;
    modifyLists: (users: Users) => void;
}

export default function Grid(props: GridProps){
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
                        <List
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