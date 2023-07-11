import type { NextPage } from "next";
import Head from "next/head";
import {
	getAuth,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useAuth } from "../lib/authContext";
import { Button } from "@mui/material";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify'
import { useRouter } from "next/router";

const Home: NextPage = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const { user, loading } = useAuth();

	if (loading) return null;

	if (user) return <h1>Already Logged in!</h1>;

	const auth = getAuth();

	function login() {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log("success", user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log("error", errorMessage);
				window.alert(errorMessage);
			});
	}

	const router = useRouter()

	return (
		<>
			<Head>
				<title>Sign In</title>
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
						<div>
							<label htmlFor="email" className="font-inter">Email</label>
							{' '}
							<input
								id="email"
								type="email"
								onChange={(e) => setEmail(e.target.value)}
								className="border border-current"
							/>
						</div>
						<div>
							<label htmlFor="pass" className="font-inter">Password</label>
							{' '}
							<input
								id="pass"
								type="password"
								onChange={(e) => setPassword(e.target.value)}
								className="border border-current"
							/>
						</div>
						<Button
							variant="contained" 
							onClick={() => login()}
							className='flex p-4 transition text-white bg-black rounded-xl space-x-2 font-inter hover:bg-zinc-800'	
						>
							<span className='dark:text-white text-white'>Login</span>
						</Button>
						<Button
							variant="contained"
							onClick={() => router.replace('/login')}
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
						</Button>
					</div>
				</div>
			</div>
			{/* <div className="m-auto my-24 w-1/3 h-1/3 divide-y-4 space-y-1">
				<div className="space-y-1">
					<input
						type="email"
						onChange={(e) => setEmail(e.target.value)}
						className="border border-current	"
					/>
					<br />
					<input
						type="password"
						onChange={(e) => setPassword(e.target.value)}
						className="border border-current	"
					/>
					<br />
					<button onClick={() => login()}>Login</button>
				</div>
				<br />
				<div>
					<Link href={"/login"}>Login with Google</Link>
				</div>
			</div> */}
		</>
	);
};

export default Home;
