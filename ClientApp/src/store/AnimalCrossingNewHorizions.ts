import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

enum AnimalCrossingNewHorizionsActionTypes {
    RECEIVE_ITEM_DATA,
    REQUEST_ITEM_DATA
}
export interface AnimalCrossingNewHorizonsState {
    isLoading: boolean;
    initialLoad: boolean;
    fish: Items[];
}

export interface Items {
    name: string;
    price: number;
    imageURL: string;
    available: boolean;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface ReceiveItemDataAction {
    type: AnimalCrossingNewHorizionsActionTypes.RECEIVE_ITEM_DATA ,
    items: Items[]
}

interface RequestItemDataAction {
    type: AnimalCrossingNewHorizionsActionTypes.REQUEST_ITEM_DATA
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = ReceiveItemDataAction | RequestItemDataAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestPrices: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (!appState || !appState.acnh || !appState.acnh.initialLoad) {
            console.log('dispatching to acnh');
            fetch('api/acnh')
                .then(response => response.json() as Promise<Items[]>)
                .then(data => {
                    dispatch({ type: AnimalCrossingNewHorizionsActionTypes.RECEIVE_ITEM_DATA, items: data });
                });
            dispatch({ type: AnimalCrossingNewHorizionsActionTypes.REQUEST_ITEM_DATA });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: AnimalCrossingNewHorizonsState = { fish: [], isLoading: false, initialLoad: false };

export const reducer: Reducer<AnimalCrossingNewHorizonsState> = (state: AnimalCrossingNewHorizonsState | undefined, incomingAction: Action): AnimalCrossingNewHorizonsState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case AnimalCrossingNewHorizionsActionTypes.RECEIVE_ITEM_DATA:
            return {                
                fish: action.items,
                isLoading: false,
                initialLoad: true
            };
        case AnimalCrossingNewHorizionsActionTypes.REQUEST_ITEM_DATA:
            return {
                isLoading: true,
                fish: state.fish,
                initialLoad: true
            };
        default: return state;
    }

};
