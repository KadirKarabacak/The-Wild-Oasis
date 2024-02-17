import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
    // It returns a big object includes error, data, isLoading etc...
    const {
        data: cabins,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["cabins"],
        queryFn: getCabins,
    });

    return { cabins, isLoading, error };
}
