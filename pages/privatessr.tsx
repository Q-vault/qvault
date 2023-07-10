import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { authServer } from "../lib/session";
import type { TIdTokenResult } from "../lib/authContext";
import React, { ReactNode } from "react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const user = await authServer(ctx);

	return { props: { user } };
};

interface HomeProps {
	user: TIdTokenResult;
}

const Home: NextPage<HomeProps> = ({ user }) => {
	if (!user) {
		return <h1>Log in to continue</h1>;
	}

	return (
		<>
			<Head>
				<title>Private SSR</title>
			</Head>

			<main>
				<h1>Email : {user.claims?.email}</h1>
				Private
				Testing Server Side Rendering
			</main>
		</>
	);
};

export default Home;
