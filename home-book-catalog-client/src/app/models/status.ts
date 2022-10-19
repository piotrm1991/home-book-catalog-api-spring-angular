import { StatusType } from "./status-type";

export interface Status {
    id: number;
    statusType: StatusType;
    dataUp: Date;
    comment: string;
}