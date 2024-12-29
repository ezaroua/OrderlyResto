import {RowDataPacket} from "mysql2/promise";

/**
 * Interface
 */
interface ShopInterface {
    id_shop: number;
    shop_name: string;
    address: string;
    city: string;
    postal_code: number;
    phone: string;
    rating_count: number;
    shop_rate: number;
}

/**
 * Mapper
 */
function rowToShopInterface (row: RowDataPacket): ShopInterface {
    return {
        id_shop: row['id_shop'],
        shop_name: row['shop_name'],
        address: row['address'],
        city: row['city'],
        postal_code: row['postal_code'],
        phone: row['phone'],
        rating_count: row['rating_count'],
        shop_rate: row['shop_rate']
    };
}

export {ShopInterface, rowToShopInterface};