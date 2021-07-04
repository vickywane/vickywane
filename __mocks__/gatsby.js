const React = require("react")
const gatsby = jest.requireActual("gatsby")
const Router = jest.requireActual("@reach/router")

module.exports = {
    ...Router,
    useLocation: jest.fn(),
    ...gatsby,
    graphql: jest.fn(),
    Link: jest.fn().mockImplementation(
        // these props are invalid for an `a` tag
        ({
             activeClassName,
             activeStyle,
             getProps,
             innerRef,
             partiallyActive,
             ref,
             replace,
             to,
             ...rest
         }) =>
            React.createElement("a", {
                ...rest,
                href: to,
            })
    ),
    StaticQuery: jest.fn(),
    useStaticQuery: jest.fn().mockReturnValue({
        site: {
            siteMetadata: {
                title : '',
                description : '',
                author : '',
            }
        }}),
}