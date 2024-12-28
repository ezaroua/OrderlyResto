import {RowDataPacket} from "mysql2/promise";

/**
 * Interface
 */
interface ProductInterface {
    id_product: number;
    product_name: string;
    description: string;
    id_shop: number;
    stock_quantity: number;
    price: number;
}

/**
 * Mapper
 */
function rowToProductInterface (row: RowDataPacket): ProductInterface {
    return {
        id_product: row['id_product'],
        product_name: row['product_name'],
        description: row['description'],
        id_shop: row['id_shop'],
        stock_quantity: row['stock_quantity'],
        price: row['price']
    };
}

export {ProductInterface, rowToProductInterface};