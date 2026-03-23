import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "../services/orderService";

export function useUserOrders(userId) {
    return useQuery({
        queryKey: ["orders", userId],
        queryFn: () => getUserOrders(userId),
        enabled: !!userId,
    });
}
