import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
    const queryClient = useQueryClient();

    // We have to mutate status and ispaid properties
    const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
        queryKey: ["bookings"],
        mutationFn: bookingId =>
            updateBooking(bookingId, {
                status: "checked-out",
            }),
        // Data comes from returned function into apiBookings
        onSuccess: data => {
            toast.success(`Booking ${data.id} successfully checked out`);
            // Both is the same
            queryClient.invalidateQueries({ active: true });
            // queryClient.invalidateQueries("bookings");
        },
        onError: () => {
            toast.error("There was an error while checked out");
        },
    });
    return { checkout, isCheckingOut };
}
