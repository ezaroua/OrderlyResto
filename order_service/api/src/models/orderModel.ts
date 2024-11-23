import {RowDataPacket} from "mysql2/promise";

/**
 * Type pour le statut de la commande
 */
type OrderStatus = 'draft' | 'pending' | 'preparing' | 'out_for_delivery' | 'delivered' | 'canceled';

/**
 * Interface pour un article de la commande
 */
interface OrderItem {
    product_id: string;
    quantity: number;
    special_demand?: string;
}
  

/**
 * Interface commande
 */
interface OrderInterface {
    order_id: number;
    shop_id: number;
    client_id: number;
    delivery_id?: number;
    status: OrderStatus; 
    total_amount: number;
    items: OrderItem[];
    order_date: Date;
    client_note?: string;
}

/**
 * Mapper commande
 */
function rowToOrderInterface (row: RowDataPacket): OrderInterface {
    return {
        order_id: row['order_id'],
        shop_id: row['shop_id'],
        client_id: row['client_id'],
        delivery_id: row['delivery_id'],
        status: row['status'],
        total_amount: row['total_amount'],
        items: row['items'],
        order_date: row['order_date'],
        client_note: row['client_note']
    };
}

export {OrderInterface, rowToOrderInterface};