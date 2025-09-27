import { useEffect, useState } from 'react';

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const years = Array.from({ length: 75 }, (_, i) => String(new Date().getFullYear() - i));

type Value = {
    start: string;
    end: string | 'present';
};

function DateRangePicker({
    start,
    end,
    current,
    uniqueSectionID,
}: {
    start?: boolean;
    end?: boolean;
    current?: boolean;
    uniqueSectionID: string;
}) {
    const [currentlyWorking, setCurrentlyWorking] = useState<boolean>(false);
    const [value, setValue] = useState<Value>({ start: '', end: '' }); // stores "MM/YYYY"

    const handleChange = (
        e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
        option: 'start' | 'end'
    ) => {
        let newValue = value[option];
        if (e.target.name === 'month') {
            newValue = `${e.target.value}/${newValue.split('/')[1] || new Date().getFullYear()}`;
        } else if (e.target.name === 'year') {
            newValue = `${newValue.split('/')[0] || String(new Date().getMonth() + 1).padStart(2, '0')}/${e.target.value}`;
        }
        setValue((prev) => ({ ...prev, [option]: newValue }));
    };

    useEffect(() => {
        if (currentlyWorking) return setValue((prev) => ({ ...prev, end: 'present' }));
        return setValue((prev) => ({ ...prev, end: '' }));
    }, [currentlyWorking]);

    useEffect(() => {
        console.log('Picked: ', value);
    }, [value]);

    return (
        <div className="flex flex-col">
            <div className="flex w-full flex-row items-center justify-between gap-4">
                {/* Start */}
                {start && (
                    <div className={`flex w-full items-center gap-2 rounded-lg py-2 text-sm`}>
                        {/* Month Select */}
                        <select
                            name="month"
                            id={`${uniqueSectionID}_month_start`}
                            value={value['start'].split('/')[0] || ''}
                            onChange={(e) => handleChange(e, 'start')}
                            className="focus:ring-dark rounded-md border border-pink-300 bg-white px-2 py-1 focus:ring-2 focus:outline-none dark:bg-gray-800 dark:text-white"
                        >
                            <option value="">MM</option>
                            {months.map((month, i) => {
                                const monthNumbered = String(i + 1).padStart(2, '0');
                                return (
                                    <option key={monthNumbered} value={monthNumbered}>
                                        {month}
                                    </option>
                                );
                            })}
                        </select>
                        <span>/</span>
                        {/* Year Input */}
                        <input
                            type="number"
                            inputMode="numeric"
                            name="year"
                            id={`${uniqueSectionID}_year_start`}
                            placeholder="YYYY"
                            min="1900"
                            max={`${new Date().getFullYear()}`}
                            value={value['start'].split('/')[1] || ''}
                            onChange={(e) => handleChange(e, 'start')}
                            className="w-20 rounded-md border border-pink-300 px-2 py-1 focus:ring-2 focus:ring-pink-400 focus:outline-none dark:bg-gray-800 dark:text-white"
                        />
                    </div>
                )}
                {/* End */}
                {end && (
                    <>
                        <span>—</span>
                        <div
                            className={`flex w-full items-center gap-2 rounded-lg py-2 text-sm ${
                                currentlyWorking ? 'cursor-not-allowed opacity-50' : ''
                            }`}
                        >
                            {/* Month Select */}
                            <select
                                name="month"
                                id={`${uniqueSectionID}_month_end`}
                                disabled={currentlyWorking}
                                value={value['end'].split('/')[0] || ''}
                                onChange={(e) => handleChange(e, 'end')}
                                className="focus:ring-dark rounded-md border border-pink-300 bg-white px-2 py-1 focus:ring-2 focus:outline-none dark:bg-gray-800 dark:text-white"
                            >
                                <option value="">MM</option>
                                {months.map((month, i) => {
                                    const monthNumbered = String(i + 1).padStart(2, '0');
                                    return (
                                        <option key={monthNumbered} value={monthNumbered}>
                                            {month}
                                        </option>
                                    );
                                })}
                            </select>
                            <span>/</span>
                            {/* Year Input */}
                            <input
                                type="number"
                                inputMode="numeric"
                                name="year"
                                id={`${uniqueSectionID}_year_end`}
                                placeholder="YYYY"
                                min="1900"
                                max={`${new Date().getFullYear()}`}
                                disabled={currentlyWorking}
                                value={value['end'].split('/')[1] || ''}
                                onChange={(e) => handleChange(e, 'end')}
                                className="w-20 rounded-md border border-pink-300 px-2 py-1 focus:ring-2 focus:ring-pink-400 focus:outline-none dark:bg-gray-800 dark:text-white"
                            />
                        </div>
                    </>
                )}
            </div>
            {/* Current */}
            {current && (
                <label className="flex items-center gap-2 pt-3">
                    <input
                        type="checkbox"
                        value={'present'}
                        id={`${uniqueSectionID}_year_end_current`}
                        checked={currentlyWorking}
                        name="current"
                        onChange={(e) => {
                            setCurrentlyWorking(e.target.checked);
                            handleChange(e, 'end');
                        }}
                    />
                    Currently Working
                </label>
            )}
        </div>
    );
}

export default DateRangePicker;
