import { configureStore,createSlice } from '@reduxjs/toolkit';

const songSlice = createSlice({
    name:'songs',
    initialState:[],
    reducers:{
        addSong(state,action){
            state.push(action.payload);
        },
        removeSong(state,action){

        }
    }
})

const store = configureStore({
    reducer:{
        songs: songSlice.reducer
    }
})

export { store };