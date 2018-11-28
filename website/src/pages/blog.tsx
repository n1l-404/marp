import { Link, graphql } from 'gatsby'
import React from 'react'
import { BlogExcerpted } from '../components/blog'
import Contents from '../components/contents'
import Layout from '../components/layout'

const blog = ({
  location,
  data: {
    allMarkdownRemark: { edges },
  },
}) => (
  <Layout location={location.pathname} title="Blog">
    {edges.map(({ node }) => (
      <BlogExcerpted {...node} key={node.id} />
    ))}
  </Layout>
)

export default blog

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 10
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          fields {
            path
          }
          frontmatter {
            author
            date(formatString: "YYYY-MM-DD")
            github
            title
          }
        }
      }
    }
  }
`