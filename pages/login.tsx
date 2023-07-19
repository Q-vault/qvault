import type { NextPage } from "next";
import Head from "next/head";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	GithubAuthProvider,
	fetchSignInMethodsForEmail,
	linkWithCredential,
	AuthProvider,
} from "firebase/auth";
import { useAuth } from "../lib/authContext";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify'
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { showToast } from "@/components/showToast";
import { useRouter } from "next/router";

const Home: NextPage = () => {
	const { user, loading } = useAuth();
	const [isMobile, setIsMobile] = useState(false)
	const router = useRouter();

	useEffect(() => {
		const handleResize = () => {
			const isMobileView = window.innerWidth < 600;
			setIsMobile(isMobileView);
		};

		// Add event listener to window resize
		window.addEventListener('resize', handleResize);

		// Initial check
		handleResize();

		// Clean up event listener on unmount
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	if (loading) return null;

	if (user) return <h1>Already Logged in!</h1>;

	const auth = getAuth();

	const getProviderForProviderId = (providerId: string):AuthProvider | null=> {
		switch (providerId) {
			case 'google.com':
				return new GoogleAuthProvider();
			case 'github.com':
				return new GithubAuthProvider();
			// Add more cases for other supported providers
			default:
				return null
		}
	};

	function loginWithGoogle() {
		const googleProvider = new GoogleAuthProvider();

		signInWithPopup(auth, googleProvider)
			.then((result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const user = result.user;
				console.log("signed in with google", user);
			})
			.catch((error) => {
				if (error.code === 'auth/account-exists-with-different-credential') {
					let authtoken = error.customData._tokenResponse.oauthAccessToken;
					let pendingProvider = error.customData._tokenResponse.providerId;
					let email = error.customData.email;
					fetchSignInMethodsForEmail(auth, email).then(function (methods) {
						var provider = getProviderForProviderId(methods[0]);
						if (provider) {
							signInWithPopup(auth, provider).then(function (result) {
								if (pendingProvider) {
									let pendingCred;
									if (pendingProvider === 'github.com') {
										pendingCred = GithubAuthProvider.credential(authtoken)
									}
									if (pendingCred) {
										linkWithCredential(result.user, pendingCred).then(function (usercred) {
											router.push('/');
										});
									}
								} else {
									showToast('Invalid current provider', 'error')
								}
							});
						}
						else {
							showToast('Invalid Primary Provider', "error");
						}
					});
				} else {
					const credential = GithubAuthProvider.credentialFromError(error);
					console.error(error)
					console.log(credential)
				}
			});
	}

	function loginWithGithub() {
		const ghProvider = new GithubAuthProvider();

		signInWithPopup(auth, ghProvider)
			.then((result) => {
				const credential = GithubAuthProvider.credentialFromResult(result);
				const user = result.user;
				console.log("signed in with github", user);
			})
			.catch((error) => {
				if (error.code === 'auth/account-exists-with-different-credential') {
					let authtoken = error.customData._tokenResponse.oauthAccessToken;
					let pendingProvider = error.customData._tokenResponse.providerId;
					let email =  error.customData.email;
					fetchSignInMethodsForEmail(auth, email).then(function (methods) {
						var provider = getProviderForProviderId(methods[0]);
						if (provider) {
							signInWithPopup(auth, provider).then(function (result) {
								if (pendingProvider) {
									let pendingCred;
									if(pendingProvider === 'github.com'){
										pendingCred = GithubAuthProvider.credential(authtoken)
									}
									if(pendingCred) {
										linkWithCredential(result.user, pendingCred).then(function (usercred) {
											router.push('/');
										});
									}
								} else {
									showToast('Invalid current provider', 'error')
								}
							});
						}
						else {
							showToast('Invalid Primary Provider', "error");
						}
					});
				} else {
					const credential = GithubAuthProvider.credentialFromError(error);
					console.error(error)
					console.log(credential)
				}
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
				<div className={`flex flex-col items-center m-auto bg-secondary rounded-2xl space-y-6 ${isMobile ? 'p-4' : 'p-12' }`}>
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
							<h2 className='text-lg font-bold font-archivo text-black '>
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
								width={isMobile ? 20 : 24}
								height={isMobile ? 20 : 24}
							/>{' '}
							<span className='dark:text-text text-text pl-5 text-xs'>
								Continue with Google
							</span>
						</Button>
						<Button
							variant="contained"
							onClick={() => loginWithGithub()}
							className='bg-primary hover:bg-accent'
						>
							<Image
								src='/google.svg'
								alt='github'
								width={isMobile ? 20 : 24}
								height={isMobile ? 20 : 24}
							/>{' '}
							<span className='dark:text-text text-text pl-1 text-xs'>
								Continue with Github
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
