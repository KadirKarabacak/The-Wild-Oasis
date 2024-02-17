/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";

// Components
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import FileInput from "../../ui/FileInput";

// Custom hooks
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
    // Custom Hooks
    const { isCreating, createCabin } = useCreateCabin();
    const { isUpdating, updateCabin } = useUpdateCabin();

    // Taking id and other values from cabin object
    const { id: editId, ...editValues } = cabinToEdit;

    // If we are editing, then add default values to form
    const isEditSession = Boolean(editId);

    // React-hook-form handling controlled inputs, submit, reset, access of input values, formState object for errors
    const { register, handleSubmit, reset, getValues, formState } = useForm({
        // if editing, use defaults
        defaultValues: isEditSession ? editValues : {},
    });
    const { errors } = formState;

    // Handling both isLoading situations
    const isWorking = isCreating || isUpdating;

    // Called on handleSubmit
    function onSubmit(data) {
        // To know which type of image need to pass "FileList" or "String"
        const image =
            typeof data.image === "string" ? data.image : data.image[0];

        if (isEditSession)
            updateCabin(
                { newCabinData: { ...data, image }, id: editId },
                {
                    onSuccess: () => {
                        reset();
                        onCloseModal?.();
                    },
                }
            );
        else
            createCabin(
                { ...data, image: image },
                {
                    onSuccess: () => {
                        reset();
                        onCloseModal?.();
                    },
                }
            );
    }

    function onError(errors) {
        console.log(errors);
    }

    return (
        // We must call handleSubmit directly
        <Form
            onSubmit={handleSubmit(onSubmit, onError)}
            // To conditionally style
            type={onCloseModal ? "modal" : "regular"}
        >
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isWorking}
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
                    disabled={isWorking}
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
                    disabled={isWorking}
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
                    disabled={isWorking}
                    defaultValue={0}
                    {...register("discount", {
                        required: "Discount is required",
                        validate: value => {
                            if (
                                value <= getValues().regularPrice &&
                                value >= 0
                            ) {
                                return true;
                            } else {
                                return "Discount should be less than regular price and equal or greater than 0";
                            }
                        },
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
                    disabled={isWorking}
                    defaultValue=""
                    {...register("description", {
                        required: "Description is required",
                    })}
                />
            </FormRow>

            <FormRow label="Cabin photo">
                <FileInput
                    id="image"
                    accept="image/*"
                    {...register("image", {
                        required: isEditSession
                            ? false
                            : "This field is required",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    // If we reuse this and if there is no modal, only just form, to avoid create a bug
                    onClick={() => onCloseModal?.()}
                    disabled={isWorking}
                    variation="secondary"
                    type="reset"
                >
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isEditSession ? "Update Cabin" : "Create Cabin"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
