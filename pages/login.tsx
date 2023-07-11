import type { NextPage } from "next";
import Head from "next/head";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import { useAuth } from "../lib/authContext";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify'

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
				console.log("sign with google", user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				const email = error.email;
				const credential = GoogleAuthProvider.credentialFromError(error);
			});
	}

	return (
		<>
			<Head>
				<title>Signin</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className='flex w-full max-h-full bg-zinc-100 p-8'>
				<ToastContainer />
				<div className='flex flex-col items-center m-auto  bg-white rounded-2xl p-4 space-y-6'>
					<div className='flex flex-col items-center space-y-6'>
						<div className='flex items-center  bg-white rounded-full shadow-xl w-fit '>
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
						<button
							onClick={() => loginWithGoogle()}
							className='flex p-4 transition bg-black rounded-xl space-x-2 font-inter hover:bg-zinc-800'
						>
							<Image
								src='/google.svg'
								alt='google'
								width={24}
								height={24}
							/>
							<span className='dark:text-white text-white'>
								Continue with Google
							</span>
						</button>
					</div>
					<div className='flex place-content-center w-full'>
						<p className='text-sm text-center text-zinc-600'>
							Don{`'`}t have an account? &nbsp;
							<Link href='/signup'>
								<span className='text-blue-500  underline text-medium '>
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
