import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
    // We need to use queryClient to update UI after mutations
    const queryClient = useQueryClient();

    // To mutate data with React-Query need useMutation deleting or adding
    const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
        mutationFn: deleteCabinApi,
        // Immediately update UI after deleting
        onSuccess: () => {
            toast.success("Cabin successfully deleted");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: err => toast.error(err.message),
    });

    return { isDeleting, deleteCabin };
}
