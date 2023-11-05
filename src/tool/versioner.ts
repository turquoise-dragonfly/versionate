const VERSION_FORMAT = /\d+(.\d+)*(-\d+)*/;

export class Versioner {

    elements: number[];
    prerelease: number;

    constructor(version: string) {
        if (!VERSION_FORMAT.test(version)) {
            throw Error('Invalid version');
        }

        // Divide la versión.
        let [first, rest] = version.split('-');
        this.elements = first.split('.').map(element => Number(element));
        this.prerelease = Number(rest);
        if (isNaN(this.prerelease)) {
            this.prerelease = 0;
        }
    }

    bump(fragment: string): Versioner {
        if (fragment === 'prerelease') {
            this.prerelease += 1;
        }
        else {
            let position: number = Number(fragment);
            if (isNaN(position))
            {
                switch (fragment) {
                    case 'MAJOR':
                        position = 1;
                        break;
                    case 'MINOR':
                        position = 2;
                        break;
                    case 'PATCH':
                        position = 3;
                        break;
                
                    default:
                        throw Error('Invalid fragment');
                }
            }
            position--;

            this.elements[position] += 1;
            this.elements = this.elements.map((element, index) => {
                return index > position ? 0 : element;
            });
            this.prerelease = 0;
        }

        return this;
    }

    get(): string {
        return this.elements.join('.') + (this.prerelease > 0 ? `-${this.prerelease}` : '');
    }
}