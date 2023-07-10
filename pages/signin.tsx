import type { NextPage } from "next";
import Head from "next/head";
import {
	getAuth,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useAuth } from "../lib/authContext";

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
			<div className="m-auto my-24 w-1/3 h-1/3 divide-y-4 space-y-1">
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
					<button onClick={() => loginWithGoogle()}>Login with Google</button>
				</div>
			</div>
		</>
	);
};

export default Home;
