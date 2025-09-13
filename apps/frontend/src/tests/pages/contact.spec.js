import React from "react"
import { render } from "@testing-library/react"
import Contact from "../../pages/home/contact"

test("Displays the contact page", () => {
  const { getByTestId } = render(<Contact />)
  const contactPage = getByTestId("contact-page")

  expect(contactPage).not.toBeDisabled()
})

test("Displays header within contact page with 2 elements", () => {
  const { getByTestId } = render(<Contact />)

  const header = getByTestId("header")
  expect(header).not.toBeDisabled()

  const headerItems = getByTestId("header-items")
  expect(headerItems.children.length).toBe(2)
})

test("Contact page has 2 input fields and a button", () => {
  const { getByTestId } = render(<Contact />)

  const form = getByTestId("form-fields")
  expect(form).not.toBeDisabled()

  expect(form.children.length).toBe(3)
  expect(getByTestId("form-fields")).not.toBeDisabled()
})

test("Contact name and description field is shown", () => {
  const { getByTestId } = render(<Contact />)

  const nameField = getByTestId("name-field")
  const descriptionField = getByTestId("name-field")

  expect(nameField).not.toBeDisabled()
  expect(descriptionField).not.toBeDisabled()
})

test("Contact icons is shown", () => {
  const { getByTestId } = render(<Contact />)

  const icons = getByTestId("contact-icons")

  expect(icons.children.length).toBe(3)
})
