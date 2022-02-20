import CatalogContext from './Provider';
import Filter from 'components/Filter';
import ProductCard from 'components/ProductCard';
import Pagination from 'components/Pagination';
import { useContext } from 'react';

const Catalog = () => {
	const { selectedProducts, page, limit } = useContext(CatalogContext);

	return (
		<div>
			<Filter />
			<div className='grid grid-cols-3 gap-4'>
				{selectedProducts
					.map((product) => (
						<ProductCard product={product} key={product.node.name} />
					))
					.splice(page * limit, limit)}
			</div>
			<Pagination />
		</div>
	);
};

export default Catalog;
