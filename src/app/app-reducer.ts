const initialState: TasksType = {}

export const appReducer = (state = initialState, action: TaskActionType): TasksType => {
    switch (action.type) {
        case 'XXX': {
            return state
        }
        default:
            return state
    }
}

// type
export type TasksType = {}
export type TaskActionType = {type: 'XXX'}