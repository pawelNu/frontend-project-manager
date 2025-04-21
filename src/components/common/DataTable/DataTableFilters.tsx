import { FilterConfig } from './types';

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
                <div key={filter.accessor as string} className="col">
                    <label>{filter.label ?? (filter.accessor as string)}</label>

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
                            checked={(filterState[filter.accessor] as boolean) || false}
                            onChange={(e) =>
                                handleChange(filter.accessor, e.target.checked as F[typeof filter.accessor])
                            }
                        />
                    )}

                    {filter.type === 'select' && (
                        <select
                            className="form-select"
                            value={(filterState[filter.accessor] as string) || ''}
                            onChange={(e) =>
                                handleChange(filter.accessor, e.target.value as F[typeof filter.accessor])
                            }>
                            <option value="">-- Wybierz --</option>
                            {filter.options?.map((opt) => (
                                <option key={opt.value.toString()} value={String(opt.value)}>
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
