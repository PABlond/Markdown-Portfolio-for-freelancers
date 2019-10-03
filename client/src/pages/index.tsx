import React, { useEffect } from "react"
import { graphql } from "gatsby"
import { connect } from "react-redux"
import { dispatchContent } from "./../config/constants"
import { Container, Row, Col } from "react-bootstrap"
import Header from "./../components/Header"
import About from "./../components/About"
import Skills from "./../components/Skills"
import Certifications from "./../components/Certifications"
import Works from "./../components/Works"
import Contact from "./../components/Contact"

const Home = ({ data, dispatchFullContent }: any) => {
  useEffect(() => {
    const header = data.allMarkdownRemark.edges
      .map((mod: any) =>
        mod.node.frontmatter.title == "header" ? mod.node.html : null
      )
      .filter(Boolean)[0]
    console.log(data)
    const about = data.allMarkdownRemark.edges
      .map((mod: any) => {
        return mod.node.frontmatter.title == "about" ? mod.node.html : null
      })
      .filter(Boolean)[0]
    const works = {
      __html: data.allMarkdownRemark.edges
        .map((mod: any) => {
          return mod.node.frontmatter.title == "works" ? mod.node.html : null
        })
        .filter(Boolean)[0],
    }
    const certifications = data.allFile.edges.map((certification: any) => {
      return certification.node.childImageSharp
    })
    dispatchFullContent({ header, about, certifications, works })
  }, [])
  return (
    <>
      <Header />
      <section id="about">
        <About />
        <Container fluid>
          <Row id="about-bottom">
            <Col md={6} id="skills">
              {typeof window !== "undefined" && <Skills />}
            </Col>
            <Col md={6} id="certifications">
              <Certifications />
            </Col>
          </Row>
        </Container>
      </section>
      <section id="works">
        <Works />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </>
  )
}

export const query = graphql`
  query HomeData {
    allMarkdownRemark {
      edges {
        node {
          html
          frontmatter {
            title
          }
        }
      }
    }
    allFile(filter: { sourceInstanceName: { eq: "certifications" } }) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

const mapDispatchToProps = (dispatch: any) => ({
  dispatchFullContent: (payload: any) =>
    dispatch({ type: dispatchContent, payload }),
})

export default connect(
  null,
  mapDispatchToProps
)(Home)
