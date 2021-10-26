import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const config = { authority: 'searchv7.expertrec.com' };



export const autoSuggest = createAsyncThunk(
    "https://searchv7.expertrec.com/v6/search/eb17a931b1ab4950928cabbf42527715/",
    async (searchTerm) => {
        const promise = axios
            .get(`https://searchv7.expertrec.com/v6/search/eb17a931b1ab4950928cabbf42527715/?user=&q=${searchTerm}&size=6&suggestions=1&maxSuggestions=6`, config)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    window.location.reload();
                } else {
                    return "Error";
                }
                return "Error";
            });

        const result = await promise;
        if (searchTerm.length > 1) {
            return result;

        }
    }

)

export const slice = createSlice({
    name: "app",
    initialState: {
        autoSuggestResult: {}
    },

    extraReducers: {
        [autoSuggest.fulfilled]: (state, action) => {
            state.autoSuggestResult = action.payload;
        }
    }


});
export default slice.reducer;
