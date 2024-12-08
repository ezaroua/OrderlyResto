import {RowDataPacket} from "mysql2/promise";

/**
 * Interface
 */
interface ShopInterface {
    shop_id: number;
    shop_name: string;
    address: string;
    city: string;
    postal_code: number;
    phone: string;
    shop_note: number;
}

/**
 * Mapper
 */
function rowToShopInterface (row: RowDataPacket): ShopInterface {
    return {
        shop_id: row['shop_id'],
        shop_name: row['shop_name'],
        address: row['address'],
        city: row['city'],
        postal_code: row['postal_code'],
        phone: row['phone'],
        shop_note: row['shop_note']
    };
}

export {ShopInterface, rowToShopInterface};