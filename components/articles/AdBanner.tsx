export default function AdBanner() {
    return (
        <section className="max-w-[1440px] mx-auto px-6 mt-10">
            <div className="rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50/30 h-24 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xs uppercase tracking-widest text-gray-400">
                        Advertisement
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        728 × 90 Responsive Banner
                    </p>
                </div>
            </div>
        </section>
    );
}