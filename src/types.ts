export interface Data {
    id: string;
    name: string;
    photo: string;
    price: number;
    category: string;
}


export type Condition = ">" | ">=" | "<" | "<=" | "==" | "!=";
