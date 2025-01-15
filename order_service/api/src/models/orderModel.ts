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
    id_order: number;
    id_shop: number;
    id_client: number;
    id_delivery_user?: number;
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
        id_order: row['id_order'],
        id_shop: row['id_shop'],
        id_client: row['id_client'],
        id_delivery_user: row['id_delivery_user'],
        status: row['status'],
        total_amount: row['total_amount'],
        items: row['items'],
        order_date: row['order_date'],
        client_note: row['client_note']
    };
}

export {OrderInterface, rowToOrderInterface};