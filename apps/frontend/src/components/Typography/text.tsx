import cn from "classnames"

type TextProps = {
  children: React.ReactNode
  className: string
}

export const Text = ({ children, className }: TextProps) => (
  <p className={cn("", className)}> {children} </p>
)
