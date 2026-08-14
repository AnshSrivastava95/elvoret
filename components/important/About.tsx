import React from 'react';

export default function AboutPage() {
  return (
    <div className="bg-white text-slate-900 font-sans antialiased min-h-screen py-16 px-6">
      <main className="max-w-4xl mx-auto">
        
        {/* Page Title Header */}
        <div className="text-center mb-14">
          <span className="text-indigo-600 font-semibold tracking-widest text-xs uppercase bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full mb-3 inline-block">
            Transparency & Trust
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mt-2 mb-4">
            About Elvoret
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Engineering high-performance software, clean system architecture, and modern digital platforms.
          </p>
        </div>

        {/* Founder Profile Card (AdSense Compliance Essential) */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 mb-12 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-2xl group-hover:bg-indigo-100 transition-all duration-500"></div>
          
          {/* Photo Frame */}
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-2 border-indigo-200 shadow-md flex-shrink-0 bg-slate-200 relative">
            <img 
              src="/profile.png" 
              alt="Ansh Srivastava" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
          </div>

          <div className="text-center md:text-left z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">Ansh Srivastava</h2>
            <p className="text-indigo-600 font-semibold text-sm mb-4 tracking-wide uppercase">Founder & Lead Architect</p>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Elvoret was built to champion clean code, system architecture transparency, and high-performance digital solutions. As a developer and creator, my goal is to curate useful technical infrastructure and insights that bring genuine value to the web ecosystem.
            </p>
          </div>
        </div>

        {/* The All-in-One Platform Section */}
        <div className="bg-gradient-to-br from-indigo-50/50 via-slate-50 to-slate-50 border border-indigo-100 rounded-2xl p-8 md:p-10 mb-8 shadow-sm relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-indigo-100/50 rounded-full blur-3xl"></div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-lg">🚀</span>
            The All-in-One Hub for Developers & Builders
          </h3>
          <p className="text-slate-700 text-base leading-relaxed mb-6">
            Elvoret is engineered to be your <strong className="text-slate-900">all-in-one platform</strong> for high-level technical execution. From advanced architectural layout designs and streamlined workflow utilities to robust full-stack engineering resources, Elvoret centralizes the tools developers need to build, scale, and optimize modern digital systems seamlessly under one roof.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-700">
            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
              <strong className="text-slate-900 block mb-1">⚡ Unified Systems</strong>
              Centralized platform architecture designed for maximum performance and fluid developer workflows.
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
              <strong className="text-slate-900 block mb-1">🛠️ Smart Utilities</strong>
              Curated tools and digital templates built to speed up development cycles and system design.
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
              <strong className="text-slate-900 block mb-1">📈 Scalable Insights</strong>
              Deep technical breakdowns, engineering standards, and resources for growing tech ecosystems.
            </div>
          </div>
        </div>

        {/* Detailed Sections for AdSense Value Guidelines */}
        <div className="grid gap-6 text-slate-700">
          
          <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 hover:border-slate-300 transition-colors">
            <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center text-sm">🎯</span>
              Our Core Mission
            </h3>
            <p className="text-slate-600 leading-relaxed">
              At Elvoret, we focus on bridging the gap between heavy technical concepts and sleek, accessible implementation. Whether building backend microservices, optimizing web workflows, or publishing digital articles, quality and user clarity remain our primary focus.
            </p>
          </section>

          <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 hover:border-slate-300 transition-colors">
            <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center text-sm">🛡️</span>
              Commitment to Quality & Transparency
            </h3>
            <p className="text-slate-600 leading-relaxed">
              We adhere strictly to web standards, original publishing, and verified ownership. Having a clearly identifiable author profile, secure domain routing, and direct official communication lines ensures a safe, reliable experience for all our visitors and partners.
            </p>
          </section>

          <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 hover:border-slate-300 transition-colors">
            <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center text-sm">✉️</span>
              Official Contact Channel
            </h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Have questions, technical inquiries, or collaboration proposals? Reach out directly through our custom domain business channel.
            </p>
            <a 
              href="mailto:contact@elvoret.in" 
              className="inline-flex items-center gap-3 bg-[#6366F1] hover:bg-[#4F46E5] text-white font-medium px-6 py-3 rounded-xl transition-all shadow-md shadow-indigo-600/20"
            >
              contact@elvoret.in
            </a>
          </section>

        </div>
      </main>
    </div>
  );
}