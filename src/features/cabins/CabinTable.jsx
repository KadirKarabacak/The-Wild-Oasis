import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
// import Empty from "../../ui/Empty";

import { useCabins } from "./useCabins";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
    const { isLoading, cabins } = useCabins();
    const [searchParams] = useSearchParams();

    // 1) FILTER
    const filterValue = searchParams.get("discount") || "all";

    let filteredCabins;
    if (filterValue === "all") filteredCabins = cabins;
    if (filterValue === "no-discount")
        filteredCabins = cabins?.filter(cabin => cabin.discount === 0);
    if (filterValue === "with-discount")
        filteredCabins = cabins?.filter(cabin => cabin.discount > 0);

    // 2) SORT
    const sortBy = searchParams.get("sortBy") || "startDate-asc";
    // Returns an array from splitting, so we destructure
    const [field, direction] = sortBy.split("-");

    // if ascending then positive, else negative
    const modifier = direction === "asc" ? 1 : -1;
    const sortedCabins = filteredCabins?.sort(
        (a, b) => (a[field] - b[field]) * modifier
    );

    if (isLoading) return <Spinner />;

    // if (!cabins.length) return <Empty resource="cabins" />;

    return (
        // Wrapping with menus to add menu to each row
        <Menus>
            <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
                <Table.Header role="row">
                    <div></div>
                    <div>Cabin</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </Table.Header>

                {/* <Table.Body>
                {cabins.map(cabin => (
                    <CabinRow cabin={cabin} key={cabin.id} />
                    ))}
                </Table.Body> */}

                {/* Render props pattern */}
                <Table.Body
                    data={sortedCabins}
                    render={cabin => <CabinRow cabin={cabin} key={cabin.id} />}
                />
            </Table>
        </Menus>
    );
}

export default CabinTable;
