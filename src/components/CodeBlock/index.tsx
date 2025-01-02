import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrowNightBright, kimbieLight, gruvboxLight } from 'react-syntax-highlighter/dist/esm/styles/hljs'

interface Props {
  value: {
    code: string
    language: string
  }
}

const CodeBlock = ({ value }: Props) => {
  const { code, language } = value
  return (
    <SyntaxHighlighter
      showLineNumbers={true}
      showInlineLineNumbers={true}
      language={language}
      style={gruvboxLight}
      customStyle={{
        padding: '1em',
        margin: '2em 0',
        fontSize: "16px"
      }}
    >
      {code}
    </SyntaxHighlighter>
  )
}

export default CodeBlock