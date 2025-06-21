import { AccessTypeEnum } from "@/abstract/enums/access-type-enum";

export type AccessCredentialsType = {
    token: string;
    access_type: AccessTypeEnum;
}

export class AccessCredentialsStorage {
    static set(credentials: AccessCredentialsType): void {
        localStorage.setItem("credentials", JSON.stringify(credentials));
    }

    static get(): AccessCredentialsType {
        const credentials = localStorage.getItem("credentials");
        if (!credentials) {
            return {
                token: "",
                access_type: AccessTypeEnum.none,
            }
        }
        return JSON.parse(credentials) as AccessCredentialsType;
    }

    static remove(): void {
        localStorage.removeItem("credentials");
    }
}