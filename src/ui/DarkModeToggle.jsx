import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "../ui/ButtonIcon";
import { useDarkMode } from "../context/DarkModeContext";

function DarkModeToggle() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
        <ButtonIcon onClick={toggleDarkMode}>
            {isDarkMode ? (
                <>
                    <HiOutlineSun /> Light mode
                </>
            ) : (
                <>
                    <HiOutlineMoon /> Dark mode
                </>
            )}
        </ButtonIcon>
    );
}

export default DarkModeToggle;
