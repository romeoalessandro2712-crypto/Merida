"use client";

import { useT } from "@/lib/providers";
import { ButtonLink } from "@/components/ui/Button";

export function NotFoundClient() {
  const { t } = useT();
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="label text-taupe">404</p>
      <h1 className="mt-3 font-serif text-4xl md:text-5xl text-navy font-medium">{t.common.notFound}</h1>
      <p className="mt-4 text-sm text-taupe">{t.common.notFoundText}</p>
      <ButtonLink href="/" className="mt-8">
        {t.common.home}
      </ButtonLink>
    </div>
  );
}
