/* eslint-disable react/prop-types */
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers.js";
import CreateCabinForm from "./CreateCabinForm.jsx";
import { HiSquare2Stack, HiPencil, HiTrash } from "react-icons/hi2";
import { useDeleteCabin } from "./useDeleteCabin.js";
import { useCreateCabin } from "./useCreateCabin.js";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Table from "../../ui/Table.jsx";

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Price = styled.div`
    font-family: "Sono";
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: "Sono";
    font-weight: 500;
    color: var(--color-green-700);
`;

// const Button = styled.button`
//     border: none;
//     border-radius: var(--border-radius-sm);
//     box-shadow: var(--shadow-sm);
//     color: var(--color-brand-500);
//     transition: all 0.3s;

//     &:not(:last-child) {
//         margin-right: 0.3rem;
//     }

//     &:hover {
//         color: var(--color-brand-700);
//     }
// `;

function CabinRow({ cabin }) {
    const { isDeleting, deleteCabin } = useDeleteCabin();
    const { isCreating: isDuplicating, createCabin } = useCreateCabin();

    const {
        name,
        maxCapacity,
        regularPrice,
        discount,
        image,
        id: cabinId,
        description,
    } = cabin;

    function handleDuplicate() {
        createCabin({
            name: `Copy of ${name}`,
            maxCapacity,
            regularPrice,
            discount,
            image,
            description,
        });
    }

    return (
        <Table.Row role="row">
            <Img src={image} alt="Cabin Image" />
            <Cabin>{name}</Cabin>
            <div>Fits up to {maxCapacity} guests</div>
            <Price>{formatCurrency(regularPrice)}</Price>
            {discount ? (
                <Discount>{formatCurrency(discount)}</Discount>
            ) : (
                <span>&mdash;</span>
            )}
            <div>
                <button disabled={isDuplicating} onClick={handleDuplicate}>
                    <HiSquare2Stack />
                </button>

                <Modal>
                    <Modal.Open opens="edit">
                        <button>
                            <HiPencil />
                        </button>
                    </Modal.Open>
                    <Modal.Window name="edit">
                        <CreateCabinForm cabinToEdit={cabin} />
                    </Modal.Window>
                    <Modal.Open opens="delete">
                        <button>
                            <HiTrash />
                        </button>
                    </Modal.Open>
                    <Modal.Window name="delete">
                        <ConfirmDelete
                            resourceName={cabin.name}
                            onConfirm={() => deleteCabin(cabinId)}
                            disabled={isDeleting}
                        />
                    </Modal.Window>
                </Modal>
            </div>
        </Table.Row>
    );
}

export default CabinRow;
