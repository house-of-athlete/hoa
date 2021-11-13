import React from "react"
import { render } from "@testing-library/react"
import {
  MaxWidthContext,
  SizesContext,
  useFullWidthSizes,
} from "../src/hoa/use_full_width_sizes"

const PrintSizes = () => <pre>{useFullWidthSizes()}</pre>

export const SizesInFullWidthContainer = () => <PrintSizes />

export const SizesIn800pxContainer = () => {
  return (
    <MaxWidthContext.Provider value={800}>
      <PrintSizes />
    </MaxWidthContext.Provider>
  )
}

export const SizesWithProvidedSizes = () => (
  <SizesContext.Provider value="(max-width: 1023px) 33.3336vw, (max-width: 1280px) 25vw, 320px">
    <PrintSizes />
  </SizesContext.Provider>
)

it("renders SizesInFullWidthContainer", () => {
  const { baseElement } = render(<SizesInFullWidthContainer />)

  expect(baseElement.querySelector("pre").innerHTML).toEqual("100vw")
})

it("renders SizesIn800pxContainer", () => {
  const { baseElement } = render(<SizesIn800pxContainer />)

  expect(baseElement.querySelector("pre").innerHTML).toEqual(
    "(max-width: 800px) 100vw, 800px"
  )
})

it("renders SizesWithProvidedSizes", () => {
  const { baseElement } = render(<SizesWithProvidedSizes />)

  expect(baseElement.querySelector("pre").innerHTML).toEqual(
    "(max-width: 1023px) 33.3336vw, (max-width: 1280px) 25vw, 320px"
  )
})
