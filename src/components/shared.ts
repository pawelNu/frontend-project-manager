export const parseDateToISOString = (value: string) => {
    if (!value) return null;
    const [year, month, day] = value.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day)).toISOString();
};

export const formatISOStringToDate = (value: string) => {
    if (!value) return '';
    return value.split('T')[0];
};
