export const computeGridSizesAttr = (breakpoints, { containerWidth } = {}) => {
  const breakpointQueries = breakpoints.map(({ columns, min }) =>
    min ? `(min-width: ${min}px) ${100 / columns}vw` : `${100 / columns}vw`
  )

  const containerBreakpoints = containerWidth
    ? [`(min-width: ${containerWidth}px) ${containerWidth}px`]
    : []

  return [...containerBreakpoints, ...breakpointQueries].join(", ")
}
