import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Submission {
    id: bigint;
    name: string;
    isRead: boolean;
    company: string;
    message: string;
    timestamp: Time;
    workersNeeded: bigint;
    phone: string;
    typeOfWork: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteSubmission(id: bigint): Promise<void>;
    getAllSubmissions(): Promise<Array<Submission>>;
    getCallerUserRole(): Promise<UserRole>;
    isCallerAdmin(): Promise<boolean>;
    markSubmissionRead(id: bigint): Promise<void>;
    markSubmissionUnread(id: bigint): Promise<void>;
    submitQuery(input: Submission): Promise<bigint>;
}
