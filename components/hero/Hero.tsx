import Link from "next/link";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="w-full bg-white">
            <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">

                <div className="grid items-center gap-0 lg:grid-cols-[45%_55%] lg:gap-10">

                    {/* =========================================
                        MOBILE + DESKTOP LEFT CONTENT
                    ========================================= */}

                    <div className="contents lg:block">

                        {/* Badge */}

                        <div className="order-1 w-full lg:order-none">
                            <div className="inline-flex items-center rounded-full bg-purple-100 px-4 py-2">
                                <span className="text-xs font-semibold uppercase tracking-wide text-purple-700 sm:text-sm">
                                    Elevate Your Tomorrow.
                                </span>
                            </div>
                        </div>

                        {/* Main Heading */}

                        <div className="order-2 w-full lg:order-none">
                            <h1 className="mt-3 max-w-xl text-4xl font-extrabold leading-[1.02] tracking-tight text-gray-900 sm:text-5xl lg:mt-5 lg:text-[52px]">
                                Everything a
                                <br />
                                <span className="text-purple-700">
                                    Software Engineer
                                </span>
                                <br />
                                Needs
                            </h1>
                        </div>

                        {/* Description */}

                        <div className="order-3 w-full lg:order-none">
                            <p className="mt-3 max-w-xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
                                Learn, build, and grow with in-depth articles,
                                AI tools, real-world projects, and the latest
                                tech insights.
                            </p>
                        </div>

                        {/* =========================================
                            MOBILE DASHBOARD IMAGE
                        ========================================= */}

                        <div className="order-4 w-full lg:hidden">
                            <div className="mt-5 w-full overflow-hidden rounded-3xl border border-gray-100 bg-white p-2 shadow-2xl">
                                <Image
                                    src="/hero.png"
                                    alt="Elvoret software engineering learning dashboard"
                                    width={1200}
                                    height={850}
                                    priority
                                    className="h-auto w-full rounded-2xl object-contain"
                                    sizes="100vw"
                                />
                            </div>
                        </div>

                        {/* =========================================
                            CTA BUTTONS
                        ========================================= */}

                        <div className="order-5 w-full lg:order-none">
                            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">

                                <Link
                                    href="/articles"
                                    className="rounded-xl bg-purple-700 px-6 py-3 text-center font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-purple-800"
                                >
                                    Explore Articles →
                                </Link>

                                <Link
                                    href="/tools"
                                    className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-center font-semibold text-gray-900 transition-colors duration-200 hover:border-purple-700 hover:text-purple-700"
                                >
                                    Explore AI Tools
                                </Link>

                            </div>
                        </div>

                        {/* =========================================
                            DESKTOP NEWSLETTER
                        ========================================= */}

                        <div className="order-6 hidden w-full max-w-xl lg:order-none lg:block">
                            <div className="mt-7">

                                <div className="mb-2">
                                    <p className="text-sm font-semibold text-gray-900">
                                        Join 250+ developers already subscribed
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        Get practical software engineering
                                        insights in your inbox.
                                    </p>
                                </div>

                                <form
                                    action="#"
                                    method="POST"
                                    className="flex w-full flex-col gap-2 sm:flex-row"
                                >
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        required
                                        className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                                    />

                                    <button
                                        type="submit"
                                        className="rounded-xl bg-purple-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors duration-200 hover:bg-purple-800"
                                    >
                                        Join Newsletter
                                    </button>
                                </form>

                            </div>
                        </div>

                        {/* =========================================
                            MOBILE NEWSLETTER / 240+ DEVELOPERS
                        ========================================= */}

                        <div className="order-6 w-full lg:hidden">
                            <div className="mt-7 max-w-xl">

                                <div className="mb-2">
                                    <p className="text-sm font-semibold text-gray-900">
                                        Join 240+ developers already subscribed
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        Get practical software engineering
                                        insights in your inbox.
                                    </p>
                                </div>

                                <form
                                    action="#"
                                    method="POST"
                                    className="flex w-full flex-col gap-2 sm:flex-row"
                                >
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        required
                                        className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                                    />

                                    <button
                                        type="submit"
                                        className="rounded-xl bg-purple-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors duration-200 hover:bg-purple-800"
                                    >
                                        Join Newsletter
                                    </button>
                                </form>

                            </div>
                        </div>

                    </div>

                    {/* =========================================
                        DESKTOP DASHBOARD IMAGE
                    ========================================= */}

                    <div className="hidden w-full lg:order-none lg:block">
                        <div className="w-full overflow-hidden rounded-3xl border border-gray-100 bg-white p-2 shadow-2xl">
                            <Image
                                src="/hero.png"
                                alt="Elvoret software engineering learning dashboard"
                                width={1200}
                                height={850}
                                priority
                                className="h-auto w-full rounded-2xl object-contain"
                                sizes="55vw"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}