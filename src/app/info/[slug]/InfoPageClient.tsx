"use client";

import Link from "next/link";
import type { InfoPageSlug } from "@/lib/i18n";
import { useT } from "@/lib/providers";

export function InfoPageClient({ slug }: { slug: InfoPageSlug }) {
  const { t } = useT();
  const page = t.pages[slug];
  return (
    <article className="mx-auto max-w-2xl px-4 py-12 md:py-20">
      <p className="label text-taupe mb-3">
        <Link href="/" className="hover:text-navy">
          {t.product.breadcrumbHome}
        </Link>{" "}
        / {page.title}
      </p>
      <h1 className="font-serif text-4xl md:text-5xl text-navy font-medium">{page.title}</h1>
      <div className="mt-8 flex flex-col divide-y divide-line border-y border-line">
        {page.body.map((p, i) => (
          <p key={i} className="py-5 text-[0.95rem] leading-relaxed text-charcoal/85">
            {p}
          </p>
        ))}
      </div>
    </article>
  );
}
