class Metadata {
    public color: string = "black";
    public bold: boolean = false;
    public italic: boolean = false;
    public underlined: boolean = false;
}

export class CustomArea {
    public metadata: Metadata = new Metadata();
    public id: string;
    public text: string;
    constructor(id: string, text: string) {
        this.id = id;
        this.text = text;
    }
}

export class CustomAreaProcessor {
    private areas: CustomArea[];

    constructor() {
        this.areas = [];
    }

    setAreas(areas: CustomArea[]) {
        this.areas = areas;
    }

    addArea(id: string, text: string): void {
        let area: CustomArea = new CustomArea(id, text);
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
        let area = this.areas.find(a => a.id === id);
        return area !== undefined ? area : null;
    }
}