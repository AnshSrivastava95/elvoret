"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AI() {
    return (
        <>
            <Navbar />

            <main>
                {/* Hero Section */}
                <section className="relative flex min-h-[480px] items-center justify-center overflow-hidden border-b border-gray-200 px-6 py-20">
                    
                    {/* Background Glow */}
                    <div className="absolute left-1/2 top-0 -z-10 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl" />

                    {/* Hero Content */}
                    <div className="mx-auto max-w-4xl text-center">

                        {/* Badge */}
                        <span className="mb-6 inline-block rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-xs font-bold tracking-[0.15em] text-purple-700">
                            AI LEARNING PATH
                        </span>

                        {/* Heading */}
                        <h1 className="mx-auto max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-gray-950 md:text-6xl lg:text-7xl">
                            Master AI,{" "}
                            <span className="bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">
                                From Basics to Advanced
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-gray-500 md:text-xl">
                            Learn artificial intelligence step by step — from
                            fundamental concepts and mathematics to machine
                            learning, deep learning, and real-world AI systems.
                        </p>

                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}