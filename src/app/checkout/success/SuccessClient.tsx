"use client";

import Image from "next/image";
import { asset } from "@/lib/asset";
import { useSearchParams } from "next/navigation";
import { useT } from "@/lib/providers";
import { ButtonLink } from "@/components/ui/Button";

export function SuccessClient() {
  const { t } = useT();
  const params = useSearchParams();
  const order = params.get("order") ?? "MRD-DEMO";

  return (
    <div className="mx-auto max-w-xl px-4 py-20 md:py-28 text-center animate-fade-up">
      <Image
        src={asset("/brand/meridia-crest-600.jpg")}
        alt="MERIDIA crest"
        width={80}
        height={80}
        className="mx-auto h-20 w-20 rounded-full border border-line object-cover"
      />
      <h1 className="mt-8 font-serif text-4xl md:text-5xl text-navy font-medium">{t.checkout.successTitle}</h1>
      <p className="mt-4 text-sm text-charcoal/85 leading-relaxed">{t.checkout.successText}</p>
      <p className="mt-6 label text-taupe">
        {t.checkout.orderNumber}: <span className="text-navy">{order}</span>
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <ButtonLink href={`/track?order=${order}`}>{t.track.cta}</ButtonLink>
        <ButtonLink href="/shop" variant="secondary">
          {t.checkout.continue}
        </ButtonLink>
      </div>
    </div>
  );
}
