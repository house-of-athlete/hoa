import React from "react"
import { render } from "@testing-library/react"
import { ExternalLink } from "../../../src/hoa/links"

it("should render with the correct text", () => {
  const { getByText } = render(
    <ExternalLink href="http://example.com/">Hello</ExternalLink>
  )
  const rendered = getByText("Hello")
  expect(rendered).toBeTruthy()
})
