export class ImageFile {
    imageBase64: string;
    name: string;

    constructor(name: string, imageBase64: string) {
        this.name = name;
        this.imageBase64 = imageBase64;
    }
}