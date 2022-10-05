import {AppThunk} from "../../app/store";
import {createPacksType, packsAPI, PackType, ResponsePacksType, updatePackType} from "../../api/api";
import {setAppStatusAC} from "../../app/app-reducer";
import {errorHandlerUtil} from "../../common/utils/errors-utils";

const initialState = {
    cardPacks: null as PackType[] | null,
    page: 0,
    pageCount: 5,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    token: null as string | null,
    tokenDeathTime: null as number | null
}

export const packsReducer = (state = initialState, action: PacksActionsType): InitialPacksStateType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS-DATA':
            return {...action.data}
        default:
            return state
    }
}

//action creators
export const setPacksDataAC = (data: ResponsePacksType) => ({type: 'PACKS/SET-PACKS-DATA', data} as const)

//thunks
export const setPacksTC = (page: number, pageCount?: number): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await packsAPI.getPacks(page, pageCount)
        dispatch(setPacksDataAC(res.data))
    } catch (e) {
        errorHandlerUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}

export const addNewPackTC = (data: createPacksType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        await packsAPI.createPack(data)
        dispatch(setPacksTC(0))
    } catch (e) {
        errorHandlerUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}

export const changePackTC = (data: updatePackType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        await packsAPI.updatePack(data)
        dispatch(setPacksTC(0))
    } catch (e) {
        errorHandlerUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}

export const deletePackTC = (data: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        await packsAPI.deletePack(data)
        dispatch(setPacksTC(0))
    } catch (e) {
        errorHandlerUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}

//types
export type InitialPacksStateType = typeof initialState

export type PacksActionsType =
    | ReturnType<typeof setPacksDataAC>