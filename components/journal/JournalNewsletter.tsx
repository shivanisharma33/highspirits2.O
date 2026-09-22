"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Aurora } from "@/components/ui/Aurora";
import { ArrowRight } from "@/components/ui/Icons";

export function JournalNewsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section
      aria-labelledby="dispatch-title"
      className="grain relative overflow-hidden bg-[#03150D] py-24 md:py-32 text-hs-cream"
    >
      <Aurora />

      {/* Ambient warm glow lights */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 left-1/3 h-80 w-80 rounded-full bg-hs-gold/10 blur-[120px]"
      />

      <div className="shell relative z-10">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-hs-gold/25 bg-hs-green-dark/40 p-8 sm:p-14 lg:p-16 backdrop-blur-xl">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Editorial Copy */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-hs-gold/30 bg-hs-gold/10 px-3.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.24em] text-hs-gold">
                ✦ High Spirits Blog
              </span>
              <h2
                id="dispatch-title"
                className="font-display mt-5 text-3xl sm:text-4xl text-hs-cream leading-tight"
              >
                Stories, recipes & <em className="italic text-gold-gradient">culinary insights</em>
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-hs-cream/75">
                Stay updated with Chef Ishpreet Bedi’s spice notes, new blog releases,
                and exclusive dining updates directly from Victoria Street, Bunbury.
              </p>
            </div>

            {/* Form */}
            <div className="lg:col-span-5">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl border border-hs-gold/40 bg-hs-gold/10 p-6 text-center"
                >
                  <p className="font-display text-xl text-hs-gold">Welcome to the Table</p>
                  <p className="mt-2 text-xs text-hs-cream/80">
                    You have been subscribed to High Spirits Blog updates. We look forward to sharing our stories with you.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="h-13 w-full rounded-full border border-hs-gold/30 bg-black/40 px-5 text-sm text-hs-cream placeholder:text-hs-cream/45 backdrop-blur-sm transition-all focus:border-hs-gold focus:bg-black/60 focus:outline-none focus:ring-2 focus:ring-hs-gold/20"
                    />
                  </div>
                  <button
                    type="submit"
                    className="group inline-flex h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-linear-to-r from-hs-gold via-amber-400 to-hs-gold px-6 text-xs font-bold uppercase tracking-[0.2em] text-[#03150D] shadow-lg shadow-hs-gold/20 transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
                  >
                    <span>Subscribe to Blog</span>
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <p className="text-center text-[0.68rem] text-hs-cream/45">
                    Never spammed. Unsubscribe at any moment.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
