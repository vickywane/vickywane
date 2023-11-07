import Head from "next/head"

interface NextHeaderProps {
  name: string
}

const NextHeader = ({ name }: NextHeaderProps) => {
  return (
    <Head>
      <title>{name}</title>
      <meta lang="sv" />
      {/* <meta
        name="facebook-domain-verification"
        content="uk6uft9l6iy45y6t4or431u0efz3qe"
      /> */}
      {/* <link
        rel="icon"
        href={`/${process.env.siteNamespace}-favicon.ico`}
        sizes="any"
      />
      <meta
        name="google-site-verification"
        content="Z1id8OU_2v8mykb-ElgLFCVAqt22-xVElKYlz60Hbes"
      /> */}
    </Head>
  )
}

export default NextHeader
