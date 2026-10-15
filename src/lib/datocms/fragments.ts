export const responsiveImageFragment = /* GraphQL */ `
  fragment ResponsiveImageParts on ResponsiveImage {
    src
    srcSet
    webpSrcSet
    sizes
    width
    height
    aspectRatio
    alt
    title
    base64
  }
`;

/**
 * Full-width imagery: post covers, body images, gallery photos.
 * Declared on the interface because uploads are typed FileField or
 * AltFileField depending on the field.
 */
export const imageFragment = /* GraphQL */ `
  fragment ImageParts on FileFieldInterface {
    alt
    title
    width
    height
    url
    focalPoint {
      x
      y
    }
    responsiveImage(
      imgixParams: { auto: format, fit: max, w: 1600 }
      sizes: "(min-width: 1024px) 66vw, 100vw"
    ) {
      ...ResponsiveImageParts
    }
  }
  ${responsiveImageFragment}
`;
