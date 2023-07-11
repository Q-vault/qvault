import social from './social.json'
import Image from 'next/image'
export default function Footer(props: any) {
	return (
		<>
    <div className="flex flex-wrap text-center items-center justify-center ">
                {social.map((item, index) => (
                    <div key={index} className="mr-4 mb-2.5 mt-2.5 transform-gpu transition-all hover:scale-125" style={{ marginRight: "10px" }}>
                        <a href={item.link} target="_blank" rel="noreferrer">
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={40}
                                height={40}
                            />
                        </a>
                    </div>
                ))}
            </div>
		</>
	);
}
