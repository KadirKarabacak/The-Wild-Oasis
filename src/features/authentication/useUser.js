import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
    //! Wrong useage
    // const { isLoading, data: user } = useQuery("user", getCurrentUser);
    //* Correct usage
    const { isLoading, data: user } = useQuery({
        queryFn: getCurrentUser,
        queryKey: ["user"],
    });
    return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}
