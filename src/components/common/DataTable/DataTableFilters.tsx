export type FilterOption = { label: string; value: string | number };

export type FilterConfig<F> = {
    accessor: keyof F;
    label?: string;
    type: 'text' | 'checkbox' | 'select';
    options?: FilterOption[];
};

type Props<F> = {
    filters: FilterConfig<F>[];
    filterState: Partial<F>;
    onChange: (newFilters: Partial<F>) => void;
};

export function DataTableFilters<F>({ filters, filterState, onChange }: Props<F>) {
    const handleChange = <K extends keyof F>(key: K, value: F[K]) => {
        onChange({ ...filterState, [key]: value });
    };

    return (
        <div className="row g-2">
            {filters.map((filter) => (
                <div key={String(filter.accessor)} className="col">
                    <label>{filter.label ?? String(filter.accessor)}</label>

                    {filter.type === 'text' && (
                        <input
                            type="text"
                            className="form-control"
                            value={(filterState[filter.accessor] as string) || ''}
                            onChange={(e) => handleChange(filter.accessor, e.target.value as F[typeof filter.accessor])}
                        />
                    )}

                    {filter.type === 'checkbox' && (
                        <input
                            type="checkbox"
                            checked={Boolean(filterState[filter.accessor])}
                            onChange={(e) =>
                                handleChange(filter.accessor, e.target.checked as F[typeof filter.accessor])
                            }
                        />
                    )}

                    {filter.type === 'select' && (
                        <select
                            className="form-select"
                            value={String(filterState[filter.accessor] || '')}
                            onChange={(e) =>
                                handleChange(filter.accessor, e.target.value as F[typeof filter.accessor])
                            }>
                            <option value="">-- Wybierz --</option>
                            {filter.options?.map((opt) => (
                                <option key={String(opt.value)} value={String(opt.value)}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            ))}
        </div>
    );
}
