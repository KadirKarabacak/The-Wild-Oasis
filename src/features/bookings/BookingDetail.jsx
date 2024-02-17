import styled from "styled-components";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import ButtonText from "../../ui/ButtonText";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";
import { HiArrowUpOnSquare, HiTrash } from "react-icons/hi2";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const navigate = useNavigate();
    const moveBack = useMoveBack();
    const { booking, isLoading } = useBooking();
    const { checkout, isCheckingOut } = useCheckout();
    const { isDeleting, deleteBookingMutate } = useDeleteBooking();

    if (!booking) return;
    const { status, id } = booking;

    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    if (isLoading) return <Spinner />;
    if (!booking) return <Empty resource="booking" />;

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{id}</Heading>
                    <Tag type={statusToTagName[status]}>
                        {status.replace("-", " ")}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <ButtonGroup>
                {status === "checked-out" && (
                    <Modal>
                        <Modal.Open opens="delete">
                            <Button
                                variation="danger"
                                disabled={isDeleting}
                                icon={<HiTrash />}
                            >
                                Delete
                            </Button>
                        </Modal.Open>
                        <Modal.Window name="delete">
                            <ConfirmDelete
                                resourceName={id}
                                onConfirm={() => {
                                    deleteBookingMutate(id, {
                                        onSuccess: () => {
                                            moveBack();
                                        },
                                    });
                                }}
                                disabled={isDeleting}
                            />
                        </Modal.Window>
                    </Modal>
                )}

                {status === "unconfirmed" && (
                    <Button onClick={() => navigate(`/checkin/${id}`)}>
                        Check in
                    </Button>
                )}

                {status === "checked-in" && (
                    <Button
                        onClick={() => checkout(id)}
                        icon={<HiArrowUpOnSquare />}
                        disabled={isCheckingOut}
                    >
                        Check Out
                    </Button>
                )}

                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;
