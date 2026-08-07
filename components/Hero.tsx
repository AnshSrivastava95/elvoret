import Link from "next/link";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="max-w-7xl mx-auto px-6 pt-6">
            <div className="min-h-[80vh] flex items-center">
                <div className="flex items-center justify-between gap-6 w-full">
                    <div className="basis-[48%]">
                        <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2">
                            <span className="text-sm font-medium text-purple-800">
                                Elevate Your Tomorrow.
                            </span>
                        </div>

                        <h1 className="mt-6 text-5xl lg:text-[58px] font-extrabold leading-[1.08] text-gray-900">
                            Everything a
                            <br />
                            <span className="text-purple-700">
                                Software Engineer
                            </span>
                            <br />
                            Needs
                        </h1>

                        <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600">
                            Learn, build, and grow with in-depth articles, AI tools,
                            real-world projects, and the latest tech insights.
                        </p>

                        <div className="mt-8 flex items-center gap-4">
                            <Link
                                href="/articles"
                                className="rounded-xl bg-purple-700 px-6 py-3 text-white font-semibold shadow-lg hover:bg-purple-800 transition-colors duration-200"
                            >
                                Explore Articles →
                            </Link>

                            <Link
                                href="/tools"
                                className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 hover:border-purple-700 hover:text-purple-700 transition-colors duration-200"
                            >
                                Explore AI Tools
                            </Link>
                        </div>

                        <div className="mt-10">
                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-3">
                                    <div className="h-10 w-10 rounded-full border-2 border-white bg-purple-200"></div>
                                    <div className="h-10 w-10 rounded-full border-2 border-white bg-purple-300"></div>
                                    <div className="h-10 w-10 rounded-full border-2 border-white bg-purple-400"></div>
                                    <div className="h-10 w-10 rounded-full border-2 border-white bg-purple-500"></div>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-900">
                                        240+ developers already subscribed
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Join our growing software engineering community.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="basis-[52%] flex justify-end">
                        <div className="w-full max-w-none rounded-3xl bg-white p-3 shadow-2xl border border-gray-100">
                            <Image
                                src="/hero.png"
                                alt="Elvoret Dashboard"
                                width={1300}
                                height={900}
                                className="w-full rounded-2xl"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}