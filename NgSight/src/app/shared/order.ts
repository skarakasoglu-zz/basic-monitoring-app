import { Customer } from './customer'
import { Product } from './product';

export interface Order {
    id: number;
    customer: Customer;
    product: Product;
    total: number;
    placed: Date;
    completed: Date;
}