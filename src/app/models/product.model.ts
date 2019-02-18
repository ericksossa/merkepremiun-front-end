export class ProductsModel {
    constructor(
        public id?: string,
        public name?: string,
        public weight?: string,
        public price?: number,
        public imageURL?: string,
        public stock?: number,
        public recommended?: boolean,
        public referenceId = '',
    ) { }
}
