/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";
import { useSearchParams } from "react-router-dom";

const StyledFilter = styled.div`
    border: 1px solid var(--color-grey-100);
    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-sm);
    border-radius: var(--border-radius-sm);
    padding: 0.4rem;
    display: flex;
    gap: 0.4rem;
`;

const FilterButton = styled.button`
    background-color: var(--color-grey-0);
    border: none;

    ${({ active }) =>
        active &&
        css`
            background-color: var(--color-brand-600);
            color: var(--color-brand-50);
        `}

    border-radius: var(--border-radius-sm);
    font-weight: 500;
    font-size: 1.4rem;
    /* To give the same height as select */
    padding: 0.44rem 0.8rem;
    transition: all 0.3s;

    &:hover:not(:disabled) {
        background-color: var(--color-brand-600);
        color: var(--color-brand-50);
    }
`;

function Filter({ filterField, options }) {
    // useParams to set URL for filter
    const [searchParams, setSearchParams] = useSearchParams();

    // To set active class
    const currentFilter = searchParams.get(filterField) || options.at(0).value;

    function handleClick(value) {
        // cabins?discount=all/no-discount/with-discount
        searchParams.set(filterField, value);

        // Filter değiştiğinde sayfayı 1'e getirmeliyiz, yoksa sayfa sayısından daha az sonuç varsa hata veriyor.
        if (searchParams.get("page")) searchParams.set("page", 1);
        setSearchParams(searchParams);
    }

    return (
        <StyledFilter>
            {options.map(option => (
                <FilterButton
                    onClick={() => handleClick(option.value)}
                    key={option.value}
                    active={option.value === currentFilter ? "true" : undefined}
                    disabled={option.value === currentFilter}
                >
                    {option.label}
                </FilterButton>
            ))}
        </StyledFilter>
    );
}

export default Filter;
