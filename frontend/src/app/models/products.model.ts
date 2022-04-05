import { Categories } from './categories.model';

export class Products {
    public id: number;
    public categoryId: number;
    public name: string;
    public price: number;
    public description: string;
    public image: string;
    public category?: Categories[];
    public quantity: number;
    public orderId: number;
    constructor(id: number, categoryId: number, name: string, price: number, description: string, image: string, category: Categories[], quantity: number, orderId: number) {
        this.id = id;
        this.categoryId = categoryId;
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
        this.category = category;
        this.quantity = quantity;
        this.orderId = orderId;
    }
}