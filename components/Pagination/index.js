import { useContext } from 'react';
import CatalogContext from '../Catalog/Provider';
import { range } from '@/components/Catalog/utils';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

const Pagination = () => {
	const { selectedProducts, page, setPage, limit } = useContext(CatalogContext);

	const pageCount = +(selectedProducts.length / limit).toFixed(0);
	const currentPage = page + 1;

	const handleFilteredPages = (item) => {
		const prevPages = currentPage - 2;
		const nextPages = currentPage + 2;

		if (item === currentPage) {
			return item;
		}

		if (currentPage < 3 && item < 6) {
			return item;
		}

		if (currentPage === 3 && item >= prevPages && item <= nextPages) {
			return item;
		}

		if (item >= prevPages && item <= nextPages) {
			return item;
		}
	};

	const activePageClass = `z-10 bg-indigo-50 border-indigo-500 text-indigo-600 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium`;
	const defaultPageClass = `bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium`;

	return (
		<nav
			className='flex justify-center relative z-0 rounded-md shadow-sm -space-x-px py-3'
			aria-label='Pagination'
		>
			<a
				href='#'
				className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
				onClick={() => currentPage > 1 && setPage(page - 1)}
			>
				<ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
			</a>
			{currentPage > 3 && (
				<>
					<a href='#' className={defaultPageClass} onClick={() => setPage(0)}>
						1
					</a>
					<span className='relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700'>
						...
					</span>
				</>
			)}
			{range(1, pageCount)
				.filter((item) => handleFilteredPages(item))
				.map((item) => (
					<a
						key={item}
						onClick={() => setPage(item - 1)}
						href='#'
						className={
							item === currentPage ? activePageClass : defaultPageClass
						}
					>
						{item}
					</a>
				))}
			{currentPage < pageCount - 2 && (
				<>
					<span className='relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700'>
						...
					</span>
					<a
						href='#'
						className={defaultPageClass}
						onClick={() => setPage(pageCount - 1)}
					>
						{pageCount}
					</a>
				</>
			)}
			<a
				href='#'
				className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
				onClick={() => currentPage !== pageCount && setPage(page + 1)}
			>
				<ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
			</a>
		</nav>
	);
};

export default Pagination;
