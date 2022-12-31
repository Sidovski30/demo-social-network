import { instance, ResponseType, ResultCodesEnum, ResultCodeForCaptcha } from "./api"

type MeResponseType = {
    id: number, email: string, login: string
}
type LoginResponseType = {
   userId: number
}

export const authAPI = {
    me() {
        return instance.get<ResponseType<MeResponseType, ResultCodesEnum>>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null|string = null) {
        return instance.post<ResponseType<LoginResponseType, ResultCodesEnum|ResultCodeForCaptcha>>(`auth/login`, {email, password, rememberMe, captcha}).then(res => res.data)

    },
    logout() {
        return instance.delete(`auth/login`).then(res => res.data)
    }
}