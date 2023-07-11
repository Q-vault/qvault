import { Button } from "@mui/material";
import { useAuth, signOut } from "../../lib/authContext";
import Link from "next/link";

export default function Header(props: any) {
	const { user, loading } = useAuth();

	return (
		<div className="flex h-full flex-row">
			<div className="container mx-auto flex p-5 flex-col md:flex-row text-center justify-center items-center">
				<nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
					<Link href="/contribute">
						<span className="mr-5 hover:text-gray-900">Contribute</span>
					</Link>
					<Link href="/aboutus">
						<span className="mr-5 hover:text-gray-900">About us</span>
					</Link>
					<Link href="/donate">
						<span className="mr-5 hover:text-gray-900">Donate</span>
					</Link>
				</nav>
			</div>

			<div className="flex flex-col absolute right-0 mt-2.5 mr-2.5">
				{!user && !loading ? (
					<div className="flex flex-row">
						<Link passHref href="/signup">
							<Button variant="outlined" className="mr-2.5"> Sign Up </Button>
						</Link>

						<Link passHref href="/signin">
							<Button variant="outlined" className="mr-2.5"> Sign In </Button>
						</Link>
					</div>
				) : null}
				{user ? (
					<div className="flex flex-row">
						<Link href="/privatessr">
							<Button variant="outlined" className="mr-2.5"> Private SSR</Button>
						</Link>

						<Link href="/private">
							<Button variant="outlined" className="mr-2.5"> Private </Button>
						</Link>

						<Button onClick={signOut} variant="outlined" className="mr-2.5" color="error"> Sign Out </Button>
					</div>
				) : null}
			</div>
		</div>
	);
}
