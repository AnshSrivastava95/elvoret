import Link from "next/link";
import Image from "next/image";

export default function Navbar(){
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
                <div>
                    Links
                </div>
                <div>
                    Search
                </div>

            </div>
        </nav>
    );
}