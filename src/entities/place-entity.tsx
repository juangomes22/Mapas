export default class PlaceEntity{
    id: string;
    description: string;
    imagePath: string;
    photoDate: string;
    title: string;
    coords: {latitude: number, longitude: number};
    author: string;
}