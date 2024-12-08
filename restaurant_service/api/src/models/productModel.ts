import {RowDataPacket} from "mysql2/promise";

/**
 * Interface
 */
interface ProductInterface {
    product_id: number;
    product_name: string;
    shop_id: number;
    quantity: number;
    price: number;
}

/**
 * Mapper
 */
function rowToProductInterface (row: RowDataPacket): ProductInterface {
    return {
        product_id: row['product_id'],
        product_name: row['product_name'],
        shop_id: row['shop_id'],
        quantity: row['quantity'],
        price: row['price']
    };
}

export {ProductInterface, rowToProductInterface};