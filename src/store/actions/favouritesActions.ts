import {addToFavorites, deleteFromFavoritesList} from "../slices/favouriteSlice";
import {addFavoritePlace, deleteFavoritePlace} from "../../firebaseStorage";
import { AppDispatch } from "../index";

export const addPlaceToFavorites = (userId: string , place: Place) => async (dispatch: AppDispatch) => {
    try {
        await addFavoritePlace(userId, place.place_id);
        dispatch(addToFavorites(place));
    } catch (error) {
        console.error("Failed to delete place:", error);
    }
}
export const deletePlaceFromFavorites = (userId: string , placeId: string) => async (dispatch: AppDispatch) => {
    try {
        await deleteFavoritePlace(userId, placeId);
        dispatch(deleteFromFavoritesList(placeId));
    } catch (error) {
        console.error("Failed to delete place:", error);
    }
}