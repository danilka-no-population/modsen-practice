import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchResult {
    id: string;
    name: string;
    location: {
        lat: number;
        lng: number;
    };
}

interface SearchResultsState {
    results: SearchResult[];
}

const initialState: SearchResultsState = {
    results: [],
};

const searchResultsSlice = createSlice({
    name: 'searchResults',
    initialState,
    reducers: {
        setSearchResults(state, action: PayloadAction<SearchResult[]>) {
            state.results = action.payload;
        },
    },
});

export const { setSearchResults } = searchResultsSlice.actions;
export default searchResultsSlice.reducer;
