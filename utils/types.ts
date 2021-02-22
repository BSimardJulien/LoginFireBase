import { DeepMap, FieldError } from "react-hook-form";


export interface TextFormInfoProps {
    type: string;
    name: string;
    defaultValue: string;
    isRequired: boolean;
    errors: DeepMap<Record<string, any>, FieldError>;
    register: any;
    readonly: boolean;
}