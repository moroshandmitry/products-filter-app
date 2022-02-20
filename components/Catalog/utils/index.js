const selectedFilterGenerator = (filters) => {
	const selectedFilters = Object.keys(filters).map((item) => [item, []]);
	return Object.fromEntries(selectedFilters);
};

const selectedFiltersUpdater = (
	filterKey,
	filterValue,
	filters,
	filterSetterCallback,
	setPage
) => {
	const updatedFilter = { ...filters };

	updatedFilter[filterKey] = updatedFilter[filterKey].some(
		(item) => item === filterValue
	)
		? updatedFilter[filterKey].filter(
				(filterElement) => filterElement !== filterValue
		  )
		: [...updatedFilter[filterKey], filterValue];

	setPage(0);
	filterSetterCallback(updatedFilter);
};
export const range = (start, end) => {
	const length = end - start + 1;
	return Array.from({ length }, (_, idx) => idx + start);
};

export { selectedFilterGenerator, selectedFiltersUpdater };
