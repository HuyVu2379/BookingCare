import MarkdownEditor from "@uiw/react-markdown-editor";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useState } from "react";
import 'Markdown.scss';

const code = `# title\n\nHello World!\n\n`;

export default function Markdown() {
    const [markdownVal, setMarkdownVal] = useState(code);

    return (
        <div>
            <h3>Auto</h3>
            <div className="container">
                <div className="editor">
                    <MarkdownEditor
                        value={markdownVal}
                        onChange={(value) => setMarkdownVal(value)}
                    />
                </div>
                <div className="preview">
                    <MarkdownPreview source={markdownVal} />
                </div>
            </div>
        </div>
    );
}
