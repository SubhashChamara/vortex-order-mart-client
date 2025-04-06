import {Request} from "../api/Request";

import {SignInRequest} from "../../app/core/types/SignInRequest";
import {SingInResponse} from "../../app/core/types/SingInResponse";
import {UserDetailDto} from "../../app/core/types/UserDetailDto";

export const authServiceRequests = () => {
    const prefix = "auth";

    return {
        signin: (request: SignInRequest) =>
            Request.POST<SingInResponse>(`${prefix}/sign-in`, request),
        me: () =>
            Request.GET<UserDetailDto>(`${prefix}/me`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        login: (jwt: string) =>
            Request.GET<UserDetailDto>(`${prefix}/user/login`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }),
    };
};
