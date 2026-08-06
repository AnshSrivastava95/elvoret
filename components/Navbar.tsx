import Link from "next/link";
import Image from "next/image";

export default function Navbar(){
    return(
        <nav>
            <div className="max-w-7x1 mx-auto flex justify-between items-center h-16">
                <div>
                    <Link href="/">
                    <Image src="/logo.png" alt="Elvoret Logo" width={40} height={40} />

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