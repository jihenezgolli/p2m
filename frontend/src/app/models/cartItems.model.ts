import { Products } from './products.model';

export class CartItems {
    public id: number;
    public userId?: number;
    public productId?: number;
    public orderId?: number;
    public quantity?: number;
    public total?: number;
    public product?: Products[];
    constructor(id: number, userId: number, productId: number, orderId: number, quantity: number, total: number, product: Products[]) {
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.orderId = orderId;
        this.quantity = quantity;
        this.total = total;
        this.product = product;
    }
}