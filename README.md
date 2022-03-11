# House of Athlete Shared Components

Component library for House of Athlete sites.

## Installation

This shared library is intended to be used by copying the contents into the project that will use
the components. The sync can be automated like adding code like this to the `package.json` file in
the app project:

```json
  "scripts": {
    "sync": "rsync -avuc --delete ../hoa/src/hoa src/vendor",
    "watch_sync": "fswatch ../hoa/src/hoa | (while read; do rsync -avuc --delete ../hoa/src/hoa src/vendor; done)",
    ...
  },
```

We keep Github Actions workflows ([like
this](https://github.com/house-of-athlete/hoa_gatsby/blob/99bc81002b70cc184a664737815a4b7394cb36ac/.github/workflows/check_shared_lib.yml))
in the app projects in order to ensure that everything is kept in sync properly.

### Why not use an NPM package

I tried this briefly in https://github.com/house-of-athlete/house-of-components but I wasn't happy
with the resulting productivity. This is certainly a valid option if one wants to take this route.

### Why not use https://bit.dev/

I tried Bit briefly (https://github.com/house-of-athlete/components) and it resulted in terrible
productivity. The process of exporting a Bit component, installing it in the app project, and
restarting the app's development server took several minutes.

## Global CSS

### CSS Classes

The following CSS classes can be used to customize styles:

- `hoa-button` and `hoa-button--<variant>` - Style for buttons
- `hoa-title` - Style for title text.

### CSS Variables

- `--hoa-footer-color`
- `--hoa-mobile-nav-border`
- `--hoa-mobile-nav-item-height`
- `--hoa-mobile-nav-side-padding`
- `--hoa-mobile-nav-social-font-weight`
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

Configuration must be provided for `CMSLink` using `CMSLinkConfigProvider`. Here is an example that configures internal links to be rendered using Gatsby's `Link` component:

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
