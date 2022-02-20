import { useContext } from 'react';
import CatalogContext from '../Catalog/Provider';

const Filter = () => {
	const { filters, updateSelectedFilters } = useContext(CatalogContext);

	return (
		<div>
			{Object.entries(filters).map((item) => (
				<div key={item[0]}>
					<ul className='flex'>
						<span>{item[0].toUpperCase()}:</span>
						{item[1].map((filterValue) => (
							<li
								key={filterValue}
								onClick={() => updateSelectedFilters(item[0], filterValue)}
								className='px-1'
							>
								{item[0] === 'colors' ? (
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
								) : (
									filterValue
								)}
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
};

export default Filter;
