export interface User{
    id:number;
    name:string;
    email:string;
}

export interface LoginResponse{
    success:boolean;
    message:string;
    token:string;
    user:User;
}

export interface RegisterResponse{
    success:boolean;
    message:string;
}