"use client";

import { Section } from "@/components/section";
import { useEffect, useRef } from "react";
import { buttonVariants } from "../ui/button";
import { Icons } from "../icons";
import { APP_NAME } from "@/app/consts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePostHog } from "posthog-js/react";

export function SenjaTestimonials() {
  const senjaContainerRef = useRef<HTMLDivElement>(null);
  const posthog = usePostHog();

  useEffect(() => {
    if (senjaContainerRef.current) {
      const script = document.createElement("script");
      script.src =
        "https://widget.senja.io/widget/634426d3-2ae5-4494-96cc-5273fab6fe36/platform.js";
      script.type = "text/javascript";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  const handleTryForFreeClick = () => {
    posthog.capture("Testimonials CTA Clicked", {
      source: "senja-testimonials",
      cta_text: `Try ${APP_NAME} for free`,
    });
  };

  return (
    <Section id="senja-testimonials">
      <div className="border-t border-x">
        <div className="pt-8 px-4">
          <div
            ref={senjaContainerRef}
            className="senja-embed"
            data-id="634426d3-2ae5-4494-96cc-5273fab6fe36"
            data-mode="shadow"
            data-lazyload="false"
            style={{ display: "block", width: "100%" }}
          ></div>
          <div className="bg-background py-8 w-full flex justify-center items-center mt-[-76px] relative z-10 rounded-none">
            <Link
              href="/login"
              onClick={handleTryForFreeClick}
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full sm:w-auto text-background flex gap-2 rounded-lg"
              )}
            >
              <Icons.logo className="size-6" />
              Try {APP_NAME} for free
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
