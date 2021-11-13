import React from "react"
import { render } from "@testing-library/react"
import { EventLink } from "../../../src/hoa/links/EventLink"

it("should render with the correct text", () => {
  const { getByText } = render(
    <EventLink
      onClick={() => {
        alert("✨")
      }}
    >
      Click me
    </EventLink>
  )
  const rendered = getByText("Click me")
  expect(rendered).toBeTruthy()
})
