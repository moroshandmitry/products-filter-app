import { useMemo } from 'react';
import uniq from 'lodash.uniq';
import isEmpty from 'lodash.isempty';

const useCategoryGenerator = (products) =>
	useMemo(() => {
		const categories = [];
		if (products) {
			for (const product of products) {
				if (product?.node?.categoryTags)
					categories.push(...product?.node?.categoryTags);
			}
		}
		return uniq(categories);
	}, [products]);

const useFilterGenerator = (products) =>
	useMemo(() => {
		const colors = [];
		const prices = [];
		if (products) {
			for (const product of products) {
				const {
					node: {
						colorFamily,
						shopifyProductEu: {
							variants: { edges },
						},
					},
				} = product;
				for (const edge of edges) {
					const {
						node: { price },
					} = edge;
					prices.push(price);
				}
				if (colorFamily) {
					for (const colorName of colorFamily) {
						const { name: color } = colorName;
						colors.push(color);
					}
				}
			}
		}
		return {
			colors: uniq(colors),
			prices: uniq(prices),
		};
	}, [products]);

const useSelectedProductsFilter = (products, filters) =>
	useMemo(() => {
		if (isEmpty(filters?.colors) && isEmpty(filters?.prices)) {
			return [...products];
		}

		const getProductsByColor = (colorFamily) => {
			if (colorFamily) {
				return colorFamily.find((item) =>
					filters.colors.find((color) => color === item.name)
				);
			}

			return false;
		};

		return products.filter((product) => {
			const {
				node: { colorFamily },
			} = product;
			if (getProductsByColor(colorFamily)) {
				return product;
			}
		});
	}, [products, filters]);

export { useCategoryGenerator, useFilterGenerator, useSelectedProductsFilter };
