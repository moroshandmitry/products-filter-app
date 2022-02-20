import Head from 'next/head';

const HeadComponent = ({ title, content }) => {
	return (
		<Head>
			<title>{title}</title>
			<meta name='description' content={content} />
			<link rel='icon' href='/favicon.ico' />
		</Head>
	);
};
export default HeadComponent;
