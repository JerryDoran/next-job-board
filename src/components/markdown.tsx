import ReactMarkdown from "react-markdown";

type MarkdownProps = {
  children: string;
};

export default function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      className="space-y-3"
      components={{
        ul: (props) => <ul className="list-inside list-disc" {...props} />,
        h1: (props) => <h1 className="text-3xl font-bold" {...props} />,
        h2: (props) => <h3 className="text-2xl font-bold" {...props} />,
        a: (props) => (
          <a
            {...props}
            className="text-blue-500 hover:underline"
            target="_blank"
          />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
