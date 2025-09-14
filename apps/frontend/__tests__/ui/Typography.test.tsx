import { render, screen } from "@testing-library/react"
import { Typography, TypographyProps } from "@/components/ui/Typography"
import "@testing-library/jest-dom"

describe("Typography component", () => {
  describe("Rendering", () => {
    it("renders Typography with props", () => {
      const defaultProps: TypographyProps = {
        as: "p",
        styleAs: "body",
        children: "Test content",
      }

      render(<Typography {...defaultProps} />)

      expect(screen.getByText("Test content")).toHaveTextContent("Test content")
      expect(screen.getByRole("paragraph")).toBeInTheDocument()
    })

    // it("renders children correctly", () => {
    //   const content = "Hello world"
    //   renderTypography({ children: content })
    //   expect(screen.getByText(content)).toBeInTheDocument()
    // })

    // it("renders JSX children correctly", () => {
    //   renderTypography({
    //     children: (
    //       <>
    //         Hello <span>world</span>
    //       </>
    //     ),
    //   })
    //   expect(screen.getByText("Hello")).toBeInTheDocument()
    //   expect(screen.getByText("world")).toBeInTheDocument()
    // })
  })

  // describe("HTML Elements", () => {
  //   it("renders as paragraph by default", () => {
  //     renderTypography({ as: "p" })
  //     expect(screen.getByText("Test content").tagName).toBe("P")
  //   })

  //   it("renders as h1 when as prop is h1", () => {
  //     renderTypography({ as: "h1" })
  //     expect(screen.getByText("Test content").tagName).toBe("H1")
  //   })

  //   it("renders as h2 when as prop is h2", () => {
  //     renderTypography({ as: "h2" })
  //     expect(screen.getByText("Test content").tagName).toBe("H2")
  //   })

  //   it("renders as h3 when as prop is h3", () => {
  //     renderTypography({ as: "h3" })
  //     expect(screen.getByText("Test content").tagName).toBe("H3")
  //   })

  //   it("renders as h4 when as prop is h4", () => {
  //     renderTypography({ as: "h4" })
  //     expect(screen.getByText("Test content").tagName).toBe("H4")
  //   })

  //   it("renders as h5 when as prop is h5", () => {
  //     renderTypography({ as: "h5" })
  //     expect(screen.getByText("Test content").tagName).toBe("H5")
  //   })

  //   it("renders as h6 when as prop is h6", () => {
  //     renderTypography({ as: "h6" })
  //     expect(screen.getByText("Test content").tagName).toBe("H6")
  //   })
  // })

  // describe("Style Variants", () => {
  //   it("applies body style classes", () => {
  //     renderTypography({ styleAs: "body" })
  //     const element = screen.getByText("Test content")
  //     expect(element).toHaveClass(
  //       "text-xs",
  //       "md:text-sm",
  //       "lg:text-base",
  //       "text-neutral-gray",
  //       "font-roboto-flex",
  //       "tracking-wider"
  //     )
  //   })

  //   it("applies span style classes", () => {
  //     renderTypography({ styleAs: "span" })
  //     const element = screen.getByText("Test content")
  //     expect(element).toHaveClass("italic")
  //   })

  //   it("applies heading_1 style classes", () => {
  //     renderTypography({ styleAs: "heading_1" })
  //     const element = screen.getByText("Test content")
  //     expect(element).toHaveClass(
  //       "text-4xl",
  //       "md:text-5xl",
  //       "lg:text-6xl",
  //       "font-semibold"
  //     )
  //   })

  //   it("applies heading_2 style classes", () => {
  //     renderTypography({ styleAs: "heading_2" })
  //     const element = screen.getByText("Test content")
  //     expect(element).toHaveClass("text-2xl", "md:text-3xl", "lg:text-3xl")
  //   })

  //   it("applies heading_3 style classes", () => {
  //     renderTypography({ styleAs: "heading_3" })
  //     const element = screen.getByText("Test content")
  //     expect(element).toHaveClass("text-2xl")
  //   })

  //   it("applies heading_4 style classes", () => {
  //     renderTypography({ styleAs: "heading_4" })
  //     const element = screen.getByText("Test content")
  //     expect(element).toHaveClass("text-xl")
  //   })
  // })

  // describe("Default Classes", () => {
  //   it("always applies default font and color classes", () => {
  //     renderTypography({ styleAs: "body" })
  //     const element = screen.getByText("Test content")
  //     expect(element).toHaveClass("font-normal", "text-dark-teal")
  //   })

  //   it("applies default classes with different style variants", () => {
  //     renderTypography({ styleAs: "heading_1" })
  //     const element = screen.getByText("Test content")
  //     expect(element).toHaveClass("font-normal", "text-dark-teal")
  //   })
  // })

  // describe("Custom Classes", () => {
  //   it("applies custom className alongside default classes", () => {
  //     renderTypography({
  //       styleAs: "body",
  //       className: "custom-class another-class",
  //     })
  //     const element = screen.getByText("Test content")
  //     expect(element).toHaveClass(
  //       "custom-class",
  //       "another-class",
  //       "font-normal",
  //       "text-dark-teal"
  //     )
  //   })

  //   it("merges custom className with style variant classes", () => {
  //     renderTypography({
  //       styleAs: "heading_1",
  //       className: "bg-red-500",
  //     })
  //     const element = screen.getByText("Test content")
  //     expect(element).toHaveClass(
  //       "bg-red-500",
  //       "text-4xl",
  //       "md:text-5xl",
  //       "lg:text-6xl",
  //       "font-semibold"
  //     )
  //   })
  // })

  // describe("Prop Combinations", () => {
  //   it("works with h1 element and heading_1 style", () => {
  //     renderTypography({
  //       as: "h1",
  //       styleAs: "heading_1",
  //     })
  //     const element = screen.getByText("Test content")
  //     expect(element.tagName).toBe("H1")
  //     expect(element).toHaveClass(
  //       "text-4xl",
  //       "md:text-5xl",
  //       "lg:text-6xl",
  //       "font-semibold"
  //     )
  //   })

  //   it("works with h2 element and body style", () => {
  //     renderTypography({
  //       as: "h2",
  //       styleAs: "body",
  //     })
  //     const element = screen.getByText("Test content")
  //     expect(element.tagName).toBe("H2")
  //     expect(element).toHaveClass("text-xs", "md:text-sm", "lg:text-base")
  //   })

  //   it("works with paragraph element and heading style", () => {
  //     renderTypography({
  //       as: "p",
  //       styleAs: "heading_2",
  //     })
  //     const element = screen.getByText("Test content")
  //     expect(element.tagName).toBe("P")
  //     expect(element).toHaveClass("text-2xl", "md:text-3xl", "lg:text-3xl")
  //   })
  // })

  // describe("Accessibility", () => {
  //   it("maintains semantic meaning with heading elements", () => {
  //     renderTypography({
  //       as: "h1",
  //       children: "Main Title",
  //     })
  //     const heading = screen.getByRole("heading", { level: 1 })
  //     expect(heading).toBeInTheDocument()
  //     expect(heading).toHaveTextContent("Main Title")
  //   })

  //   it("maintains semantic meaning with h2", () => {
  //     renderTypography({
  //       as: "h2",
  //       children: "Section Title",
  //     })
  //     const heading = screen.getByRole("heading", { level: 2 })
  //     expect(heading).toBeInTheDocument()
  //     expect(heading).toHaveTextContent("Section Title")
  //   })

  //   it("works with aria attributes", () => {
  //     render(
  //       <Typography
  //         as="p"
  //         styleAs="body"
  //         className="custom"
  //         aria-label="Custom label"
  //       >
  //         Content
  //       </Typography>
  //     )
  //     const element = screen.getByLabelText("Custom label")
  //     expect(element).toBeInTheDocument()
  //   })
  // })

  // describe("Edge Cases", () => {
  //   it("handles empty children", () => {
  //     renderTypography({ children: "" })
  //     const element = screen.getByText("")
  //     expect(element).toBeInTheDocument()
  //   })

  //   it("handles numeric children", () => {
  //     renderTypography({ children: 123 })
  //     expect(screen.getByText("123")).toBeInTheDocument()
  //   })

  //   it("handles null className", () => {
  //     renderTypography({ className: undefined })
  //     const element = screen.getByText("Test content")
  //     expect(element).toHaveClass("font-normal", "text-dark-teal")
  //   })

  //   it("handles empty className", () => {
  //     renderTypography({ className: "" })
  //     const element = screen.getByText("Test content")
  //     expect(element).toHaveClass("font-normal", "text-dark-teal")
  //   })
  // })
})
