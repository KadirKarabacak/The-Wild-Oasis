import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
    const {
        isLoading,
        settings: {
            minBookingLength,
            maxBookingLength,
            maxGuestsPerBooking,
            breakfastPrice,
            // Hacking for the read undefined values
        } = {},
    } = useSettings();
    const { isUpdating, updateSetting } = useUpdateSetting();

    function handleUpdate(e, field) {
        const { value } = e.target;

        if (!value) return;
        updateSetting({ [field]: value });
    }

    if (isLoading) return <Spinner />;

    return (
        <Form>
            <FormRow label="Minimum nights/booking">
                <Input
                    type="number"
                    id="min-nights"
                    defaultValue={minBookingLength}
                    disabled={isUpdating}
                    // When user leaves input it makes update
                    onBlur={e => handleUpdate(e, "minBookingLength")}
                />
            </FormRow>

            <FormRow label="Maximum nights/booking">
                <Input
                    type="number"
                    id="max-nights"
                    disabled={isUpdating}
                    defaultValue={maxBookingLength}
                    onBlur={e => handleUpdate(e, "maxBookingLength")}
                />
            </FormRow>

            <FormRow label="Maximum guests/booking">
                <Input
                    type="number"
                    id="max-guests"
                    disabled={isUpdating}
                    defaultValue={maxGuestsPerBooking}
                    onBlur={e => handleUpdate(e, "maxGuestsPerBooking")}
                />
            </FormRow>

            <FormRow label="Breakfast price">
                <Input
                    type="number"
                    id="breakfast-price"
                    disabled={isUpdating}
                    defaultValue={breakfastPrice}
                    onBlur={e => handleUpdate(e, "breakfastPrice")}
                />
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
