import { cva, VariantProps } from "class-variance-authority"
import cn from "classnames"

const style = {
  body:
    "text-[11px] md:text-sm lg:text-base text-neutral-gray font-roboto-flex tracking-wider",
  span: "text-neutral-gray font-roboto-flex",
  heading_1: "text-4xl md:text-5xl lg:text-6xl font-semibold",
  heading_2: "text-2xl md:text-3xl lg:text-3xl [&_span]:font-semibold",
  heading_3: "text-2xl [&_span]:underline [&_span]:font-semibold",
  heading_4: "text-xl [&_span]:underline [&_span]:font-semibold",
} as const

const text = cva("font-normal text-dark-teal", {
  variants: {
    style,
  },
  defaultVariants: {
    style: "body",
  },
})

export interface TypographyProps extends VariantProps<typeof text> {
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span"
  className?: string
  styleAs: keyof typeof style
  children: React.ReactNode
}

export const Typography = ({
  as = "p",
  children,
  styleAs,
  className,
}: TypographyProps) => {
  const Text = as

  return (
    <Text className={cn(text({ style: styleAs }), className)}>{children}</Text>
  )
}
