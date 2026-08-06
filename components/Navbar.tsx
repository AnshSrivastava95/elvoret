import Link from "next/link";
import Image from "next/image";

export default function Navbar(){
    const navItems=[
         { name: "Articles", href: "/articles" },
         { name: "AI", href: "/ai" },
         { name: "System Design", href: "/system-design" },
         { name: "Tools", href: "/tools" },
         { name: "News", href: "/news" },
        ]
  
    return(
        <nav className="sticky top-0 bg-white border-b border-gray-200 z-50">
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
                    {navItems.map((item)=>(<Link key={item.name} href={item.href} className="hover:text-purple-700 transition-colors duration-200">
                    {item.name}
                    </Link>))}
                </div>
                <div>
                    Search
                </div>

            </div>
        </nav>
    );
}