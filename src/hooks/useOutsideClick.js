import { useEffect, useRef } from "react";

export function useOutsideClick(close, listenCapturing = true) {
    const ref = useRef();

    useEffect(
        function () {
            function handleClick(e) {
                if (ref.current && !ref.current.contains(e.target)) {
                    close();
                }
            }

            // Third arg true points to only handle event in capturing phase, we use a portal then our modal shows in body. If event is bubble up, it close modal immediately
            document.addEventListener("click", handleClick, listenCapturing);

            return () =>
                document.removeEventListener(
                    "click",
                    handleClick,
                    listenCapturing
                );
        },
        [close, listenCapturing]
    );

    return ref;
}
