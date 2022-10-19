import { Author } from "./author";
import { Publisher } from "./publisher";
import { Shelf } from "./shelf";
import { Status } from "./status";

export interface Book {
    id: number;
    name: string;
    author: Author;
    publisher: Publisher;
    status: Status;
    shelf: Shelf;
}