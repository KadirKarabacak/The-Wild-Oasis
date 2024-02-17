import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName,
                avatar: "",
            },
        },
    });

    if (error) throw new Error(error.message);

    return data;
}

// https://supabase.com/dashboard/project/mcgxonulxclcyrtynujv/api?page=users
export async function login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw new Error(error.message);

    // Giriş başarılı olduğunda token ve diğer veriler localStorage'a kaydedilir
    return data;
}

// After a long time when user come back, refetch and validate the token
export async function getCurrentUser() {
    // localStorage içerisinden session verisini alır.
    const { data: session } = await supabase.auth.getSession();

    if (!session.session) return null;

    const { data, error } = await supabase.auth.getUser();

    if (error) throw new Error(error.message);

    return data?.user;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
    //: Conditionally create updateData object
    let updateData;
    if (password) updateData = { password };
    if (fullName) updateData = { data: { fullName } };

    //: 1) Update password OR fullName
    const { data, error } = await supabase.auth.updateUser(updateData);

    if (error) throw new Error(error.message);
    if (!avatar) return data;

    //: 2) Upload the avatar image [ Like Cabins image ]
    const fileName = `avatar-${data.user.id}-${Math.random()}`;

    const { error: storageError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatar);

    if (storageError) throw new Error(storageError.message);

    //: 3) Update the user's avatar
    const { error: updateError, data: updatedUser } =
        await supabase.auth.updateUser({
            data: {
                avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
            },
        });
    if (updateError) throw new Error(updateError.message);
    return updatedUser;
}
