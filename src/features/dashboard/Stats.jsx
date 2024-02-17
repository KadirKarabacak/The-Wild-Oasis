/* eslint-disable react/prop-types */
import {
    HiOutlineBanknotes,
    HiOutlineBriefcase,
    HiOutlineCalendarDays,
    HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
    // 1. Number of bookings
    const numBookings = bookings.length;

    // 2. Total sales [Total price of all bookings]
    const totalSales = bookings.reduce(
        (acc, booking) => (acc += booking.totalPrice),
        0
    );

    // 3. Checkins [ confirmedStays legth ]
    const checkins = confirmedStays.length;

    // 4. Occupancy rate [ Doluluk oranı ] --> number of checkedin nights(numDays * numCabins) / all available nights
    const occupation =
        confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
        (numDays * cabinCount);

    return (
        <>
            <Stat
                title="Bookings"
                color="blue"
                value={numBookings}
                icon={<HiOutlineBriefcase />}
            />
            <Stat
                title="Sales"
                color="green"
                value={formatCurrency(totalSales)}
                icon={<HiOutlineBanknotes />}
            />
            <Stat
                title="Check ins"
                color="indigo"
                value={checkins}
                icon={<HiOutlineCalendarDays />}
            />
            <Stat
                title="Occupancy rate"
                color="yellow"
                value={`${Math.round(occupation * 100)}%`}
                icon={<HiOutlineChartBar />}
            />
        </>
    );
}

export default Stats;
