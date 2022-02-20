import Head from '../components/Head';
import Catalog from '../components/Catalog';
import { productRequest } from '@/components/Catalog/utils/productRequest';
import { CatalogProvider } from '@/components/Catalog/Provider';
import {
	useCategoryGenerator,
	useFilterGenerator,
	useSelectedProductsFilter,
} from '@/components/Catalog/hooks';
import { useEffect, useState } from 'react';
import {
	selectedFilterGenerator,
	selectedFiltersUpdater,
} from '@/components/Catalog/utils';

export async function getServerSideProps(context) {
	const products = await productRequest();
	return {
		props: {
			products,
		},
	};
}

function Home({ products }) {
	const limit = 20;
	const categories = useCategoryGenerator(products);
	const filters = useFilterGenerator(products);
	const [selectedFilters, setSelectedFilters] = useState({});
	const [page, setPage] = useState(0);

	useEffect(() => {
		setSelectedFilters(selectedFilterGenerator(filters));
	}, []);

	const updateSelectedFilters = (key, value) =>
		selectedFiltersUpdater(
			key,
			value,
			selectedFilters,
			setSelectedFilters,
			setPage
		);
	const selectedProducts = useSelectedProductsFilter(
		products,
		selectedFilters,
		limit,
		page
	);

	const provider = {
		products,
		categories,
		filters,
		selectedFilters,
		selectedProducts,
		updateSelectedFilters,
		limit,
		page,
		setPage,
	};
	return (
		<div style={{ background: '#F8F5EE' }}>
			<Head title='Products filter' content='Product filter with pagination' />
			<main className='container mx-auto pt-3'>
				<CatalogProvider value={provider}>
					<Catalog />
				</CatalogProvider>
			</main>
		</div>
	);
}

export default Home;
