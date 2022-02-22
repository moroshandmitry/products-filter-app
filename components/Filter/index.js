import { useContext } from 'react';
import CatalogContext from '../Catalog/Provider';
import RangeInput from './RangeFilter';

const Filter = () => {
	const { filters, updateSelectedFilters } = useContext(CatalogContext);

	return (
		<div className='px-2'>
			{Object.entries(filters).map((item) => (
				<div key={item[0]}>
					<ul className='flex flex-wrap'>
						<span>{item[0].toUpperCase()}:</span>
						{item[1].map((filterValue) => (
							<li
								key={filterValue}
								onClick={() => updateSelectedFilters(item[0], filterValue)}
								className='px-2 pb-2'
							>
								{item[0] === 'colors' && (
									<label
										className='px-1 border rounded-full'
										style={{ background: `${filterValue}` }}
									>
										<input
											className='opacity-0'
											type='checkbox'
											name={filterValue}
											value={filterValue}
										/>
									</label>
								)}
							</li>
						))}
					</ul>
				</div>
			))}

			<RangeInput />
		</div>
	);
};

export default Filter;
