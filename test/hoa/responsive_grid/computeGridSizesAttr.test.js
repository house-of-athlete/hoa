import { computeGridSizesAttr } from "../../../src/hoa/responsive_grid/computeGridSizesAttr"

test("computeGridSizesAttr", () => {
  expect(
    computeGridSizesAttr([
      {
        columns: 4,
        min: 1000,
      },
      {
        columns: 2,
        min: 700,
      },
      {
        columns: 1,
      },
    ])
  ).toEqual(`(min-width: 1000px) 25vw, (min-width: 700px) 50vw, 100vw`)

  expect(
    computeGridSizesAttr(
      [
        {
          columns: 4,
          min: 1000,
        },
        {
          columns: 2,
          min: 700,
        },
        {
          columns: 1,
        },
      ],
      { containerWidth: 1280 }
    )
  ).toEqual(
    `(min-width: 1280px) 1280px, (min-width: 1000px) 25vw, (min-width: 700px) 50vw, 100vw`
  )
})
