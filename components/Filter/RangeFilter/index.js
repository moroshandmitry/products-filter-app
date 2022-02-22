import { useContext, useState } from 'react';
import CatalogContext from 'components/Catalog/Provider';
import { Range, getTrackBackground } from 'react-range';

const RangeInput = () => {
	const [values, setValues] = useState([100, 300]);
	const { prices, selectedPrices, setSelectedPrices } =
		useContext(CatalogContext);

	const STEP = 0.1;
	const MIN = prices.min;
	const MAX = prices.max;

	return (
		<div className='relative pt-1 flex justify-center flex-wrap'>
			{/* <label htmlFor='customRange1' className='form-label'></label>
			<input
				id='customRange1'
				type='range'
				min={MIN}
				max={MAX}
				value={selectedPrices}
				step='1'
				onChange={(e) => setSelectedPrices(e.target.value)}
				className='form-range appearance-none w-full h-6 p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none'
			/> */}

			<Range
				values={values}
				step={STEP}
				min={MIN}
				max={MAX}
				// rtl={false}
				onChange={(values) => {
					setValues(values);
				}}
				renderTrack={({ props, children }) => (
					<div
						onMouseDown={props.onMouseDown}
						onTouchStart={props.onTouchStart}
						style={{
							...props.style,
							height: '36px',
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
									// rtl,
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
							height: '42px',
							width: '42px',
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
