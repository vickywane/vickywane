"use client";
import { LazyMotion, m } from "framer-motion";
import loadFeatures from "./load-features";

type Props = {
  className?: string;
  children?: string | JSX.Element | Array<JSX.Element>;
  enableLazyMotion?: boolean;
};

export default function LazyLoader({ children, className }: Props) {
  return (
    <LazyMotion strict features={loadFeatures}>
      <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeOut", duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
        className={`block ${className}`}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
