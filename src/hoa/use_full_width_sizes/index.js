import { createContext, useContext } from "react"

export const MaxWidthContext = createContext()
export const SizesContext = createContext()

export const useFullWidthSizes = () => {
  const sizes = useContext(SizesContext)
  const maxContainerWidth = useContext(MaxWidthContext)

  if (sizes) {
    return sizes
  }

  if (maxContainerWidth) {
    return `(max-width: ${maxContainerWidth}px) 100vw, ${maxContainerWidth}px`
  }

  return `100vw`
}
