import { supabase } from "../../lib/supabase";

/**
 * Creates an order + its items in Supabase
 * @param {{ orderData, cartItems }} params
 */
export async function createOrder({ orderData, cartItems }) {
    // 1. Insert order
    const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([orderData])
        .select()
        .single();

    if (orderError) throw new Error(orderError.message);

    // 2. Insert order items
    const items = cartItems.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        product_image: item.image,
        price: item.price,
        quantity: item.quantity,
    }));

    const { error: itemsError } = await supabase
        .from("order_items")
        .insert(items);

    if (itemsError) throw new Error(itemsError.message);

    return order;
}
