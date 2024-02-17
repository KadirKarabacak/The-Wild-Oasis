import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Login situations must be a mutation
export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: user => {
            // Manually set data to the cache
            queryClient.setQueryData(["user", user.user]);
            navigate("/dashboard", { replace: true });
        },
        onError: err => {
            toast.error(err.message);
        },
    });
    return { login, isLoading };
}
