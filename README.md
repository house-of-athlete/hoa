# House of Athlete Shared Components

Component library for House of Athlete sites.

## Global CSS

### CSS Classes

The following CSS classes can be used to customize styles:

- `hoa-button` and `hoa-button--<variant>` - Style for buttons
- `hoa-title` - Style for title text.

### CSS Variables

- `--hoa-grid-column-gap` and `--hoa-grid-row-gap`: Grid gaps
- `--hoa-grid-overlay-font-weight`: Font weight to use in grid overlay
- `--hoa-nav-button-color`: Color used for navigation icons (left/right chevron, close button)

## Components

### `CMSLink`

Component that renders links from the CMS. Supported link types are:

- `externalLink`: External links.
- `internalLink`: Internal links. Can be configured to render a custom component such as Gatsby's `Link` component.
- `actionLink`: A link that performs and action.
- `videoModalLink`: A link that opens a modal containing a video player.

Configuration must be provided for `CMSLink` using ``. Here is an example that configures internal links to be rendered using Gatsby's `Link` component:

```javascript
import { CMSLinkConfigProvider } from "../../vendor/hoa/links"
import { Link } from "gatsby"
import internalLinkPath from "../internalLinkPath"

const getInternalLink = document => [Link, { to: internalLinkPath(document) }]

const performAction = action => {
  switch (action) {
    case "bookingDialog":
      store.modalStore.showBookingModal()
      break

    default:
      break
  }
}

// ...

  <CMSLinkConfigProvider
    getInternalLink={getInternalLink}
    performAction={performAction}
  >
    {element}
  </CMSLinkConfigProvider>
```
