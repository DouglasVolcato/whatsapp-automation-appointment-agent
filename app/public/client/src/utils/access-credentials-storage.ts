export type AccessCredentialsType = {
    token: string;
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
            }
        }
        return JSON.parse(credentials) as AccessCredentialsType;
    }

    static remove(): void {
        localStorage.removeItem("credentials");
    }
}