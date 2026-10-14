"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  activeCampaignKey,
  campaignsFromKey,
  type Campaign,
} from "@/lib/campaigns";
import { media } from "@/lib/media";

const noopSubscribe = () => () => {};

/**
 * `serverKey` puede venir de HTML prerenderizado en build; en el cliente se
 * recalcula con la fecha real para que ninguna campaña se vea fuera de su ventana.
 */
function useActiveCampaigns(serverKey: string) {
  const key = useSyncExternalStore(
    noopSubscribe,
    () => activeCampaignKey(),
    () => serverKey,
  );
  return campaignsFromKey(key);
}

function CampaignMark({
  campaign,
  className,
}: {
  campaign: Campaign;
  className: string;
}) {
  if (campaign.image) {
    return (
      <span
        className={"relative block shrink-0 " + className}
        style={{ aspectRatio: campaign.image.ratio }}
      >
        <Image
          src={media(campaign.image.key)}
          alt={campaign.image.alt}
          fill
          sizes="40px"
          className="object-contain"
        />
      </span>
    );
  }
  const Icon = campaign.icon;
  if (!Icon) return null;
  return (
    <span
      className={
        "flex aspect-square shrink-0 items-center justify-center rounded-full text-white " +
        className
      }
      style={{ backgroundColor: campaign.color }}
    >
      <Icon className="h-[55%] w-[55%]" />
    </span>
  );
}

export function CampaignHeaderMarks({ active }: { active: string }) {
  const campaigns = useActiveCampaigns(active);
  if (campaigns.length === 0) return null;

  return (
    <>
      <span className="h-7 w-px bg-black/10 md:h-8" aria-hidden />
      <span className="flex items-center gap-2">
        {campaigns.map((c) => (
          <span key={c.id} title={c.title}>
            <CampaignMark campaign={c} className="h-8 md:h-9" />
          </span>
        ))}
      </span>
    </>
  );
}

function CampaignBadge({ campaign }: { campaign: Campaign }) {
  const className =
    "inline-flex items-center gap-2 rounded-full border border-white/25 py-1.5 pr-3.5 pl-1.5 text-[11px] font-semibold whitespace-nowrap text-white shadow-lg backdrop-blur-sm transition hover:brightness-110 sm:pr-4 sm:pl-2 sm:text-xs md:text-sm";
  const style = {
    backgroundColor: `${campaign.color}e6`,
    boxShadow: `0 10px 24px -8px ${campaign.color}80`,
  };
  const content = (
    <>
      <span
        className="flex h-6 w-6 items-center justify-center rounded-full bg-white"
        style={{ color: campaign.color }}
      >
        {campaign.image ? (
          <CampaignMark campaign={campaign} className="h-4" />
        ) : campaign.icon ? (
          <campaign.icon className="h-3.5 w-3.5" />
        ) : null}
      </span>
      {campaign.label}
    </>
  );

  if (!campaign.href) {
    return (
      <span className={className} style={style} title={campaign.title}>
        {content}
      </span>
    );
  }
  if (campaign.href.startsWith("/")) {
    return (
      <Link href={campaign.href} className={className} style={style}>
        {content}
      </Link>
    );
  }
  return (
    <a
      href={campaign.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
    >
      {content}
    </a>
  );
}

export function CampaignHeroBadges({ active }: { active: string }) {
  const campaigns = useActiveCampaigns(active);
  if (campaigns.length === 0) return null;

  return (
    <div className="mb-5 flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center">
      {campaigns.map((c) => (
        <CampaignBadge key={c.id} campaign={c} />
      ))}
    </div>
  );
}

/** Tinte sobre toda la página; `multiply` mantiene legibles textos y fotos. */
export function CampaignBackdrop({ active }: { active: string }) {
  const tint = useActiveCampaigns(active).find((c) => c.tint)?.tint;
  if (!tint) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 mix-blend-multiply"
      style={{
        background:
          `radial-gradient(60% 50% at 0% 0%, rgba(${tint},0.22) 0%, rgba(${tint},0) 70%),` +
          `radial-gradient(55% 45% at 100% 100%, rgba(${tint},0.2) 0%, rgba(${tint},0) 70%),` +
          `linear-gradient(rgba(${tint},0.08), rgba(${tint},0.08))`,
      }}
    />
  );
}
