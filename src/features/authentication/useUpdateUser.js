import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
    const queryClient = useQueryClient();

    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: () => {
            toast.success("User account successfully updated");
            queryClient.invalidateQueries("user");
        },
        onError: err => {
            toast.error(err.message);
        },
    });

    return { updateUser, isUpdating };
}
