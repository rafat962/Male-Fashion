import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../services/orderService";

export function useCreateOrder({ onSuccess, onError } = {}) {
    return useMutation({
        mutationFn: createOrder,
        onSuccess,
        onError,
    });
}
