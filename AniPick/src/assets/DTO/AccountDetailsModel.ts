import UserFavouriteOpening from "./UserFavouriteOpening";

export default interface AccountDetailsModel {
    name: string;
    favoriteOpeningName: string;
    favoriteOpeningClickCount: string;
    userFavouriteOpenings: UserFavouriteOpening[];
}