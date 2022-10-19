import { Room } from "./rooms";

export interface Shelf {
    id: number;
    letter: string;
    number: number;
    room: Room;
    noBooks: number;
}