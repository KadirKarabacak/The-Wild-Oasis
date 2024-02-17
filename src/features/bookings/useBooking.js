import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
    const { bookingId } = useParams();

    // It returns a big object includes error, data, isLoading etc...
    const {
        data: booking,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["bookings", bookingId],
        queryFn: () => getBooking(bookingId),
        retry: false,
    });

    return { booking, isLoading, error };
}
