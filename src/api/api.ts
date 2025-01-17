import axios, {AxiosResponse} from 'axios'
import {ProfileType} from "../features/auth/auth-reducer";
import {ForgotPasswordType, SetNewPasswordType} from '../features/auth/auth-reducer'

export const instance = axios.create({
    //baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
})

export const instanceHeroku = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
})

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseMeType>>('/auth/login', data)
    },
    logout() {
        return instance.delete<AxiosResponse<ResponseMeType>>('/auth/me')
    },
    me() {
        return instance.post<{}, AxiosResponse<ResponseMeType>>('/auth/me')
    },
    changeUserNameOrAvatar(data: ChangeUserNameParamsType) {
        return instance.put<ChangeUserNameParamsType, AxiosResponse<ResponseUpdatesUserType>>('auth/me', data)
    },
    registerUser(data: RegisterParamsType) {
        return instance.post<RegisterParamsType, AxiosResponse<ResponseMeType>>('auth/register', data)
    },
    forgotPassword(data: ForgotPasswordType) {
        return instanceHeroku.post<ForgotPasswordType, AxiosResponse<ResponseForgotType>>('auth/forgot', data)
    },
    setNewPassword(data: SetNewPasswordType) {
        return instanceHeroku.post<SetNewPasswordType, AxiosResponse<ResponseForgotType>>('auth/set-new-password', data)
    },
}

export const packsAPI = {
    getPacks(data: ParamsType) {
        return instance.get<ResponsePacksType>(`cards/pack`, {
            params: {
                page: data.page,
                pageCount: data.pageCount,
                packName: data.packName,
                user_id: data.userID,
                min: data.min,
                max: data.max
            }
        })
    },
    createPack(cardsPack: createPacksType,) {
        return instance.post('cards/pack', {cardsPack})
    },
    updatePack(cardsPack: updatePackType) {
        return instance.put('cards/pack', {cardsPack})
    },
    deletePack(packID: string) {
        return instance.delete(`cards/pack?id=${packID}`)
    },
}

export const cardsAPI = {
    getCards(data: cardsParamsType) {
        return instance.get<ResponseCardsType>(`cards/card`, {
            params: {
                page: data.page,
                pageCount: data.pageCount,
                cardQuestion: data.cardQuestion,
                cardsPack_id: data.cardsPack_id
            }
        })
    },
    createCards(card: createCardsType) {
        return instance.post('cards/card', {card})
    },
    updateLearnCards(learn: cardLearnType) {
        return instance.put<ResponseCardsLearnType>('cards/grade', learn)
    },
    updateCards(card: updateCardsType) {
        return instance.put('cards/card', {card})
    },
    deleteCards(cardID: string) {
        return instance.delete(`cards/card?id=${cardID}`)
    },
}

//type
export type ChangeUserNameParamsType = {
    name?: string
    avatar?: string
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}

export type ResponseUpdatesUserType = {
    token: string
    tokenDeathTime: string
    updatedUser: ProfileType
}

export type ResponseForgotType = {
    info: string;
    success: boolean;
    answer: boolean;
    html: boolean;
}

export type ResponseMeType = {
    _id: string;
    email: string;
    rememberMe: boolean;
    isAdmin: boolean;
    name: string;
    verified: boolean; // подтвердил ли почту
    publicCardPacksCount: number; // количество колод
    created: string;
    updated: string;
    __v: number;
    token: string;
    tokenDeathTime: number;
    avatar: string;
}

export type RegisterParamsType = {
    email: string
    password: string
}

//type packsAPI
export type ResponsePacksType = {
    cardPacks: PackType[];
    page: number;
    pageCount: number;
    cardPacksTotalCount: number;
    minCardsCount: number;
    maxCardsCount: number;
    token: string;
    tokenDeathTime: number;
}

export type PackType = {
    _id: string;
    user_id: string;
    user_name: string;
    private: boolean;
    name: string;
    path: string;
    grade: number;
    shots: number;
    cardsCount: number;
    type: string;
    rating: number;
    created: string;
    updated: string;
    more_id: string;
    __v: number;
}

export type createPacksType = {
    name: string
    deckCover?: string
    private?: boolean
}

export type updatePackType = {
    _id: string
    name?: string
}

//type cardsAPI
export type ResponseCardsType = {
    cards: CardsType[];
    packUserId: string;
    packName: string;
    packPrivate: boolean;
    packDeckCover: string;
    packCreated: string;
    packUpdated: string;
    page: number;
    pageCount: number;
    cardsTotalCount: number;
    minGrade: number;
    maxGrade: number;
    token: string;
    tokenDeathTime: number;
}

export type CardsType = {
    _id: string;
    cardsPack_id: string;
    user_id: string;
    answer: string;
    question: string;
    grade: number;
    shots: number;
    comments: string;
    type: string;
    rating: number;
    more_id: string;
    created: string;
    updated: string;
    __v: number;
}

export type createCardsType = {
    cardsPack_id: string | undefined
    question?: string
    answer?: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}

export type updateCardsType = {
    _id?: string
    question?: string
    comments?: string
}

export type ParamsType = {
    page?: string,
    pageCount?: string,
    packName?: string
    userID?: string
    min?: string
    max?: string
}

export type cardsParamsType = {
    page?: string,
    pageCount?: string,
    cardQuestion?: string
    cardsPack_id?: string
}

export type cardLearnType = {
    grade: number
    card_id: string
}

// learn cart
export type ResponseCardsLearnType = {
    updatedGrade: updatedGradeCartType;
    token: string;
    tokenDeathTime: number;
}
export type updatedGradeCartType = {
    _id: string;
    cardsPack_id: string;
    card_id: string;
    user_id: string;
    grade: number;
    shots: number;
    more_id: string;
    created: string;
    updated: string;
    __v: number;
}