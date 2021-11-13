import React from "react"
import { render } from "@testing-library/react"
import { CMSLink } from "../../../src/hoa/links"

CMSLink.getInternalLink = document => [
  props => <a {...props} />,
  { href: document.path.current, children: "Internal Link" },
]

it("should render CMSLink with internal link", () => {
  const { getByText } = render(
    <CMSLink
      link={{
        _key: "d3d49d559627",
        _type: "internalLink",
        document: {
          _type: "collection",
          path: { _type: "slug", current: "/apparel" },
        },
      }}
    >
      Internal Link
    </CMSLink>
  )
  const rendered = getByText("Internal Link")

  expect(rendered).toBeTruthy()
  expect(rendered.tagName).toEqual("A")
  expect(rendered.href).toEqual("http://localhost/apparel")
  expect(rendered.rel).toEqual("")
  expect(rendered.target).toEqual("")
})

it("should render optional link", () => {
  const { getByText } = render(<CMSLink isOptional>Optional Link</CMSLink>)
  const rendered = getByText("Optional Link")

  expect(rendered).toBeTruthy()
  expect(rendered.tagName).toEqual("SPAN")
  expect(rendered.href).toBeUndefined()
})

it("should render link with custom CSS class", () => {
  const { baseElement } = render(
    <CMSLink className="my-class" isOptional>
      Optional Link
    </CMSLink>
  )
  const rendered = baseElement.querySelector(".my-class")

  expect(rendered).toBeTruthy()
  expect(rendered.tagName).toEqual("SPAN")
  expect(rendered.href).toBeUndefined()
})

it("should render BasicVideoModalLink", () => {
  const { getByText } = render(
    <CMSLink
      link={{
        _type: "videoModalLink",
        video: {
          _type: "mux.videoAsset",
          data: { aspect_ratio: "1024:473" },
          playbackId: "GM01ihvcrnrjUx02dcVYe26vLDWuWUN00f9dhOGo6Pg00vY",
          thumbTime: 4.621051,
        },
      }}
    >
      Video Link
    </CMSLink>
  )

  const rendered = getByText("Video Link")

  expect(rendered).toBeTruthy()
  expect(rendered.tagName).toEqual("A")
  expect(rendered.href).toEqual("http://localhost/#")
})
