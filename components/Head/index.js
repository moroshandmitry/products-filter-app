import Head from 'next/head';

const HeadComponent = ({ title, content }) => {
	return (
		<Head>
			<title>{title}</title>
			<meta name='description' content={content} />
			<link rel='icon' href='/favicon.ico' />

			<meta charSet='UTF-8' />
			<meta
				name='viewport'
				content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
			/>
		</Head>
	);
};
export default HeadComponent;
