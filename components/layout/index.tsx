import Header from "./header";
import Footer from "./footer";

type Props = {
	children: React.ReactNode;
};

export default function Layout({ children }: Props) {
	return (
		<div
<<<<<<< HEAD
			className="flex flex-col min-h-screen container mx-auto md:w-11/12 lg:w-full
    divide-y"
=======
			className="flex flex-col min-h-screen container mx-auto md:w-11/12  lg:w-full bg-background text-text"
>>>>>>> 32570c2bfad84c8cb93b7d145e039369952a6f2c
		>
			<div className=" h-16 ">
				<Header />
			</div>
			<div className="flex-grow">{children}</div>
			<Footer />
		</div>
	);
}
