import { useContext, useState } from 'react';
import CatalogContext from 'components/Catalog/Provider';
import { Range, getTrackBackground } from 'react-range';

const RangeInput = () => {
	const [values, setValues] = useState([100, 300]);
	const {
		prices,
		selectedPrices,
		setSelectedPrices,
		products,
		selectedProducts,
	} = useContext(CatalogContext);

	console.log('prices', prices);

	const STEP = 1;
	const MIN = prices.min;
	const MAX = prices.max;

	const filteredProductsByPrices = (products) => {
		const filteredProducts = selectedProducts.filter((product) => {
			const {
				node: {
					shopifyProductEu: {
						variants: { edges },
					},
				},
			} = product;

			const [x, y] = values;
			const [edge] = edges;

			if (
				+edge?.node.price >= Math.floor(x) &&
				+edge?.node.price <= Math.floor(y)
			) {
				return product;
			}
		});

		console.log('filteredProducts', filteredProducts);

		return filteredProducts;
	};

	return (
		<div className='relative pt-1 flex justify-center flex-wrap'>
			<Range
				values={values}
				step={STEP}
				min={MIN}
				max={MAX}
				onChange={(values) => {
					setValues(values);
					setSelectedPrices(values);
					filteredProductsByPrices(selectedProducts);
				}}
				renderTrack={({ props, children }) => (
					<div
						onMouseDown={props.onMouseDown}
						onTouchStart={props.onTouchStart}
						style={{
							...props.style,
							height: '20px',
							display: 'flex',
							width: '100%',
						}}
					>
						<div
							ref={props.ref}
							style={{
								height: '5px',
								width: '100%',
								borderRadius: '4px',
								background: getTrackBackground({
									values,
									colors: ['#ccc', '#548BF4', '#ccc'],
									min: MIN,
									max: MAX,
								}),
								alignSelf: 'center',
							}}
						>
							{children}
						</div>
					</div>
				)}
				renderThumb={({ props, isDragged }) => (
					<div
						{...props}
						style={{
							...props.style,
							height: '22px',
							width: '22px',
							borderRadius: '4px',
							backgroundColor: '#FFF',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							boxShadow: '0px 2px 6px #AAA',
						}}
					>
						<div
							style={{
								height: '16px',
								width: '5px',
								backgroundColor: isDragged ? '#548BF4' : '#CCC',
							}}
						/>
					</div>
				)}
			/>
		</div>
	);
};

export default RangeInput;
