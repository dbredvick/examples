export { default } from '@company/pages/about'
// `getStaticProps` and other data fetching methods are not imported from the page
// to make sure dead code elimination works. This way `getStaticProps` will only be
// included in the server build
export { getStaticProps } from '@company/pages/get-static-props'