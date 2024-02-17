// Before add EDIT FEATURE TO CABIN
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import FileInput from "../../ui/FileInput";
import { createCabin } from "../../services/apiCabins";

function CreateCabinForm() {
    // React-hook-form handling controlled inputs, submit, reset, access of input values, formState object for errors
    const { register, handleSubmit, reset, getValues, formState } = useForm();
    const { errors } = formState;

    // Taking queryClient for invalidate cabins after add
    const queryClient = useQueryClient();

    // Taking mutation to mutate cabins
    const { mutate, isLoading: isCreating } = useMutation({
        mutationFn: createCabin,
        onSuccess: () => {
            toast.success("New cabin successfully created");
            queryClient.invalidateQueries("cabins");
            reset();
        },
        onError: err => {
            toast.error(err.message);
        },
    });

    // Called on handleSubmit
    function onSubmit(data) {
        mutate({ ...data, image: data.image[0] });
    }

    // If there is one matched validation it runs onError
    function onError(errors) {
        console.log(errors);
    }

    return (
        // We must call handleSubmit directly
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isCreating}
                    {...register("name", {
                        required: "Cabin name is required",
                    })}
                />
            </FormRow>

            <FormRow
                label="Maximum capacity"
                error={errors?.maxCapacity?.message}
            >
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isCreating}
                    // doin register gives us some functions like onBlur, onChange
                    {...register("maxCapacity", {
                        required: "MaxCapacity is required",
                        min: {
                            value: 1,
                            message: "Capacity should be at least 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Regular price"
                error={errors?.regularPrice?.message}
            >
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isCreating}
                    {...register("regularPrice", {
                        required: "Regular Price is required",
                        min: {
                            value: 1,
                            message: "Regular price should be at least 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    disabled={isCreating}
                    defaultValue={0}
                    {...register("discount", {
                        required: "Discount is required",
                        // Own validation function
                        validate: value =>
                            value <= getValues().regularPrice ||
                            "Discount should be less than regular price",
                    })}
                />
            </FormRow>

            <FormRow
                label="Description for website"
                error={errors?.description?.message}
            >
                <Textarea
                    type="number"
                    id="description"
                    disabled={isCreating}
                    defaultValue=""
                    {...register("description", {
                        required: "Description is required",
                    })}
                />
            </FormRow>

            <FormRow label="Cabin photo">
                <FileInput id="image" accept="image/*" {...register("image")} />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    disabled={isCreating}
                    variation="secondary"
                    type="reset"
                >
                    Cancel
                </Button>
                <Button disabled={isCreating}>Add Cabin</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
