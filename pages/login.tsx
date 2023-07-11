import type { NextPage } from "next";
import Head from "next/head";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	FacebookAuthProvider
} from "firebase/auth";
import { useAuth } from "../lib/authContext";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify'
import { Button } from "@mui/material";

const Home: NextPage = () => {
	const { user, loading } = useAuth();

	if (loading) return null;

	if (user) return <h1>Already Logged in!</h1>;

	const auth = getAuth();

	function loginWithGoogle() {
		const googleProvider = new GoogleAuthProvider();

		signInWithPopup(auth, googleProvider)
			.then((result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const user = result.user;
				console.log("signed in with google", user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				const email = error.email;
				const credential = GoogleAuthProvider.credentialFromError(error);
			});
	}

	function loginWithFB() {
		const fbProvider = new FacebookAuthProvider();

		signInWithPopup(auth, fbProvider)
			.then((result) => {
				const credential = FacebookAuthProvider.credentialFromResult(result);
				const user = result.user;
				console.log("signed in with facebook", user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				const email = error.email;
				const credential = FacebookAuthProvider.credentialFromError(error);
			});
	}

	return (
		<>
			<Head>
				<title>Login</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className='flex w-full max-h-full bg-zinc-100 p-8'>
				<ToastContainer />
				<div className='flex flex-col items-center m-auto  bg-secondary rounded-2xl p-4 space-y-6'>
					<div className='flex flex-col items-center space-y-6'>
						<div className='flex items-center bg-secondary rounded-full shadow-xl w-fit '>
							<Image
								src='/logo.svg'
								alt='nextjs'
								width={50}
								height={50}
							/>
						</div>
						<div className='flex flex-col items-center space-y-2'>
							<h2 className='text-2xl font-bold font-archivo text-black '>
								Welcome back to QVault{' '}
							</h2>
						</div>
						<Button
							variant="contained"
							onClick={() => loginWithGoogle()}
							className='bg-primary hover:bg-accent'
						>
							<Image
								src='/google.svg'
								alt='google'
								width={24}
								height={24}
							/>{' '}
							<span className='dark:text-text text-text pl-5'>
								Continue with Google
							</span>
						</Button>
						<Button
							variant="contained"
							onClick={() => loginWithFB()}
							className='bg-primary hover:bg-accent'
						>
							<Image
								src='/facebook.svg'
								alt='facebook'
								width={24}
								height={24}
							/>{' '}
							<span className='dark:text-text text-text pl-1'>
								Continue with Facebook
							</span>
						</Button>
					</div>
					<div className='flex place-content-center w-full'>
						<p className='text-sm text-center text-zinc-600'>
							Don{`'`}t have an account? &nbsp;
							<Link href='/signup'>
								<span className='text-text hover:text-secondary underline text-medium '>
									Sign up
								</span>
							</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
