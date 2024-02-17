import toast from "react-hot-toast";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.log(error.message);
        throw new Error("Cabins can not loaded");
    }

    return data;
}

export async function createEditCabin(newCabin, id) {
    // Starts with the same url we created earlier or is it a "FileList" ?
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

    // Replace all "/" with nothing to don't create any new folder in supabase
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        "/",
        ""
    );

    // If has an imagepath on edit use it, otherwise create a new one
    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // Use for both situation Creat & Edit
    let query = supabase.from("cabins");

    // A) CREATE
    if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

    // B) EDIT
    if (id)
        query = query
            .update({ ...newCabin, image: imagePath })
            .eq("id", id)
            .select();

    const { data, error } = await query
        // To return newly created object, need to .select and .single
        .select()
        .single();

    if (error) {
        console.log(error.message);
        throw new Error("Cabin could not be deleted");
    }

    // 2. If created cabin successfully, then upload image
    if (hasImagePath) return data;

    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);

    // 3. Delete cabin if there was an error.
    if (storageError) {
        await supabase.from("cabins").delete().eq("id", data.id);
        toast.error(
            "Cabin image could not be uploaded, and the cabin was not created"
        );
        // throw new Error(
        //     "Cabin image could not be uploaded, and the cabin was not created"
        // );
    }

    return data;
}

export async function deleteCabin(id) {
    const { data, error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
        console.log(error.message);
        throw new Error("Cabin could not be deleted");
    }

    return data;
}
