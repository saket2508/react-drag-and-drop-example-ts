declare type Task = {
    id: string;
    title: string;
    completed: boolean;
}

declare type Users = {
    [name: string]: Task[]
}