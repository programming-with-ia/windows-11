import { useState, useEffect } from "react";

type UseTimeProps = {
    interval?: number;
    ignoreUpdate?: (newDate: Date, oldDate: Date) => boolean;
};

const useTime = ({
    interval = 1000,
    ignoreUpdate = (newDate, oldDate) =>
        newDate.getMinutes() === oldDate.getMinutes(),
}: UseTimeProps = {}) => {
    const [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        const tick = () => {
            const date = new Date();
            if (!ignoreUpdate(date, time)) {
                setTime(date);
            }
        };

        const timerId = setInterval(tick, interval);

        return () => clearInterval(timerId);
    }, [interval, ignoreUpdate, time]);

    return time;
};

export default useTime;
