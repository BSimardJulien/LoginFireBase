import { DeepMap, FieldError } from "react-hook-form";


export interface TextFormInfoProps {
    id: string;
    type: string;
    name: string;
    value: string;
    isRequired: boolean;
    error: DeepMap<Record<string, any>, FieldError>;
    register: any;
}