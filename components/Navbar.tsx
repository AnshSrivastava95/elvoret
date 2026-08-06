import Link from "next/link";
import Image from "next/image";

export default function Navbar(){
    const navItems=[
        "Articles",
        "AI",
        "System Design",
        "Tools",
        "News",
    ]
  
    return(
        <nav>
            <div className="max-w-7x1 mx-auto flex justify-between items-center h-16 px-6">
                <div>
                    <Link href="/" className="flex items-center gap-2">
                    <Image src="/logo.png" alt="Elvoret Logo" width={40} height={40} />
                    <span className="text-xl font-bold tracking wide text-purple-900">
                        ELVORET
                    </span>

                    </Link>
                </div>
                <div className="flex gap-8">
                    {navItems.map((item)=>(<Link key={item} href="#">
                    {item}
                    </Link>))}
                    Links
                </div>
                <div>
                    Search
                </div>

            </div>
        </nav>
    );
}