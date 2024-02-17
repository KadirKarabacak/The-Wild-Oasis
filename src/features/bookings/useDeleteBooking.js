import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

export function useDeleteBooking() {
    // We need to use queryClient to update UI after mutations
    const queryClient = useQueryClient();

    // To mutate data with React-Query need useMutation deleting or adding
    const { isLoading: isDeleting, mutate: deleteBookingMutate } = useMutation({
        mutationFn: deleteBooking,
        // Immediately update UI after deleting
        onSuccess: () => {
            toast.success("Booking successfully deleted");
            queryClient.invalidateQueries({
                queryKey: ["bookings"],
            });
        },
        onError: err => toast.error(err.message),
    });

    return { isDeleting, deleteBookingMutate };
}
