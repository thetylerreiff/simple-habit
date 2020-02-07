/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <div style={{
        position: 'absolute',
        minWidth: '100vw',
        minHeight: '100vh',
        backgroundColor: '#5D70A8',
        color: 'white'
      }}>
        <div
          style={{
            margin: '100px auto',
            maxWidth: 500,
            minHeight: 500,
            padding: `0 1.0875rem 1.45rem`,
          }}
        >
          <div>{children}</div>
          <footer style={{
            position: 'absolute',
            bottom: 0,
            left: 0
          }}>
            © {new Date().getFullYear()}, Build by
            {` `}
            <a href="https://reifflabs.com/">Tyler J. Reiff</a>            
          </footer>
        </div>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
