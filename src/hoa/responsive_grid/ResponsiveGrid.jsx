import PropTypes from "prop-types"
import React, { useContext } from "react"
import styled from "@emotion/styled"
import { computeGridSizesAttr } from "./compute_grid_sizes_attr"
import { MaxWidthContext, SizesContext } from "@hoa/hoa.ui.use_full_width_sizes"

export const tabletMin = 768 // Tailwind "md"
export const desktopMin = 1024 // Tailwind "lg"

const Styled = styled.div`
  --grid-columns: ${({ $columns }) => $columns};

  @media (min-width: ${tabletMin}px) {
    --grid-columns: ${({ $tabletColumns }) => $tabletColumns};
  }

  @media (min-width: ${desktopMin}px) {
    --grid-columns: ${({ $desktopColumns }) => $desktopColumns};
  }
`

/**
 * For generating responsive grid of images. Sets a CSS variable named `--grid-columns`. The
 * caller is responsible for using this variable to create the grid. `children` must be a render
 * prop (https://reactjs.org/docs/render-props.html). This render prop will be passed a `sizes`
 * attribute that can be used to optimize images rendered within the grid. This sizes attribute
 * doesn't take into account margins and gaps.
 */
export const ResponsiveGrid = ({
  children,
  className,
  columns,
  desktopColumns,
  tabletColumns,
}) => {
  tabletColumns ||= columns
  desktopColumns ||= tabletColumns

  const containerWidth = useContext(MaxWidthContext)

  const sizes = computeGridSizesAttr(
    [
      { columns: desktopColumns, min: desktopMin },
      { columns: tabletColumns, min: tabletMin },
      { columns: columns },
    ],
    { containerWidth }
  )

  return (
    <SizesContext.Provider value={sizes}>
      <Styled
        className={className}
        $columns={columns}
        $desktopColumns={desktopColumns}
        $tabletColumns={tabletColumns}
      >
        {children}
      </Styled>
    </SizesContext.Provider>
  )
}

ResponsiveGrid.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  columns: PropTypes.number.isRequired,
  desktopColumns: PropTypes.number,
  tabletColumns: PropTypes.number,
}
