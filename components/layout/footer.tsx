import { useState, useEffect } from 'react';
import social from './social.json'
import Image from 'next/image'
export default function Footer(props: any) {
	const [isMobile, setIsMobile] = useState(false)

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
    
    return (
		<>
    <div className="flex flex-wrap text-center items-center justify-center">
                {social.map((item, index) => (
                    <div key={index} className="mr-5 mb-2.5 mt-2.5 transform-gpu transition-all hover:scale-125" style={{ marginRight: "10px" }}>
                        <a href={item.link} target="_blank" rel="noreferrer">
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={isMobile ? 20 : 40}
                                height={isMobile ? 20 : 40}
                            />
                        </a>
                    </div>
                ))}
            </div>
		</>
	);
}
