import { useState, useEffect } from 'react';
import { Button } from "@mui/material";
import { useAuth, signOut } from "../../lib/authContext";
import Link from "next/link";

export default function Header(props: any) {
	const { user, loading } = useAuth();
	const [isMobile, setIsMobile] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

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

	const handleMobileNavigation = () => {
		setIsMenuOpen(!isMenuOpen);
		console.log(isMenuOpen);
	};

	return (
		<div className="flex h-full flex-row">
			<div className="container mx-auto flex p-5 flex-col md:flex-row text-center justify-center items-center">
				{isMobile ? (
					// Render hamburger button for mobile view
					<div className='navdiv' onClick={handleMobileNavigation}>
						<button className={`hamburger-button ${isMenuOpen ? 'open' : ''}`}>
							<span className="hamburger-icon"></span>
						</button>
					</div>
				) : (
					// Render regular navigation for other viewports
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
				)}
			</div>

			{isMobile && (
				// Render mobile full-screen menu
				<div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
					<div className="mobile-menu-content">
						<nav className="flex flex-col items-center text-base">
							<Link href="/contribute">
								<Button variant="text" className="mr-2.5 hover:bg-primary">
									Contribute
								</Button>
							</Link>
							<Link href="/aboutus">
								<Button variant="text" className="mr-2.5 hover:bg-primary">
									About us
								</Button>
							</Link>
							<Link href="/donate">
								<Button variant="text" className="mr-2.5 hover:bg-primary">
									Donate
								</Button>
							</Link>
						</nav>
					</div>
				</div>
			)}

			<div className="flex flex-col absolute right-0 mt-2.5 mr-2.5">
				{!user && !loading ? (
					<div className="flex flex-row">
						<Link passHref href="/login">
							<Button variant="outlined" className="mr-2.5">
								Log In
							</Button>
						</Link>
					</div>
				) : null}
				{user ? (
					<div className="flex flex-row">
						<Link href="/privatessr">
							<Button variant="outlined" className="mr-2.5">
								Private SSR
							</Button>
						</Link>

						<Link href="/private">
							<Button variant="outlined" className="mr-2.5">
								Private
							</Button>
						</Link>

						<Button onClick={signOut} variant="outlined" className="mr-2.5" color="error">
							Sign Out
						</Button>
					</div>
				) : null}
			</div>

			<style jsx>{`
				.navdiv {
					padding-top: 5px;
					padding-bottom: 5px;
				}

				.hamburger-button {
					background-color: transparent;
					border: none;
					cursor: pointer;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 5px;
				}

				.hamburger-icon {
					display: block;
					width: 20px;
					height: 2px;
					background-color: #333;
					position: relative;
					transition: background-color 0.3s ease;
				}

				.hamburger-icon::before,
				.hamburger-icon::after {
					content: '';
					display: block;
					width: 100%;
					height: 100%;
					background-color: inherit;
					position: absolute;
					transition: transform 0.3s ease;
				}

				.hamburger-icon::before {
					top: -6px;
				}

				.hamburger-icon::after {
					bottom: -6px;
				}

				.hamburger-button.open .hamburger-icon::before {
					transform: rotate(45deg);
					top: 0;
					z-index: 9999;
				}

				.hamburger-button.open .hamburger-icon::after {
					transform: rotate(-45deg);
					bottom: 0;
					z-index: 9999;
				}

				.mobile-menu {
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background-color: rgba(0, 0, 0, 0.8);
					z-index: 100;
					opacity: 0;
					visibility: hidden;
					transition: opacity 0.3s ease, visibility 0s linear 0.3s;
				}

				.mobile-menu.open {
					opacity: 1;
					visibility: visible;
					transition: opacity 0.3s ease;
				}

				.mobile-menu-content {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 100%;
				}

				.mobile-menu a {
					margin-bottom: 10px;
					color: #fff;
					font-size: 18px;
					text-decoration: none;
				}
			`}</style>
		</div>
	);
}
