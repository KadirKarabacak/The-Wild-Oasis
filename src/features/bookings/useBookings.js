// React Query
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { FIRST_PAGE, PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
    const queryclient = useQueryClient();
    // We can get params right here to filter data with passing to getBookings
    const [searchParams] = useSearchParams();

    //! FILTER
    const filterValue = searchParams.get("status");
    const filter =
        !filterValue || filterValue === "all"
            ? null
            : { field: "status", value: filterValue };

    //! SORT
    const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
    const [field, direction] = sortByRaw.split("-");
    const sortBy = { field, direction };

    //! PAGINATION
    const page = !searchParams.get("page")
        ? FIRST_PAGE
        : Number(searchParams.get("page"));

    //! QUERY
    const {
        isLoading,
        data: { data: bookings, count } = {},
        error,
    } = useQuery({
        // To make refetch on filter, we add our object to queryKey like useEffect
        queryKey: ["bookings", filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    });

    //! PRE-FETCHING
    const pageCount = Math.ceil(count / PAGE_SIZE);

    // If currentpage is less than pageCount, fetch next page
    if (page < pageCount)
        queryclient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page + 1],
            // Here we fetch the data page + 1 which is next page
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
        });

    // If currentpage is greater than firstPage, fetch previous page
    if (page > 1)
        queryclient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page - 1],
            // Here we fetch the data page + 1 which is next page
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
        });

    return {
        isLoading,
        bookings,
        error,
        count,
    };
}
