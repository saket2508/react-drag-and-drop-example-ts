declare type Task = {
    id: string;
    title: string;
    completed: boolean;
}

declare type User = {
    id: string;
    name: string;
    img: string;
    tasks: Task[];
}

