class Metadata {
    public color: string = "black";
    public bold: boolean = false;
    public italic: boolean = false;
    public underlined: boolean = false;
}

class CustomArea {
    public metadata: Metadata = new Metadata();
    public id: string;
    constructor(id: string) {
        this.id = id;
    }
}

export class CustomAreaProcessor {
    private areas: CustomArea[];

    constructor() {
        this.areas = [];
    }

    addArea(area: CustomArea): void {
        this.areas.push(area);
    }

    removeArea(area: CustomArea): void {
        let index = this.areas.indexOf(area);
        if (index !== -1) {
            this.areas.splice(index, 1);
        }
    }

    getAreas(): CustomArea[] {
        return this.areas;
    }

    getArea(id: string): CustomArea | null {
        let area = this.areas.find(a => a.id == id);
        return area !== undefined ? area : null;
    }
}