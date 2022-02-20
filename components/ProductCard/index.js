import Image from 'next/image';

const ProductCard = ({ product }) => {
	const {
		node: {
			name,
			thumbnailImage: {
				file: { url },
			},
			shopifyProductEu: {
				variants: {
					edges: [
						{
							node: { price },
						},
					],
				},
			},
		},
	} = product;

	return (
		<div className='w-fit'>
			<Image
				className='w-full'
				src={`https:${url}`}
				width='398'
				height='398'
				alt={name}
			/>
			<div className='flex justify-between'>
				<div className='text-sm font-bold'>{name}</div>
				<div className='text-sm font-bold'>&euro;{price}</div>
			</div>
		</div>
	);
};

export default ProductCard;
