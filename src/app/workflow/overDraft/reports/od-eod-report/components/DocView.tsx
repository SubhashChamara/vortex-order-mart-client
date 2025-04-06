import { FC } from 'react'

type DocViewProps = {
    docUrl: Blob | null;
}
const DocView: FC<DocViewProps> = (props) => {
    const { docUrl } = props;

    return (
        <div>
            {docUrl ? (
                <div className="w-full flex items-center justify-center">
                    <iframe
                        src={window.URL.createObjectURL(docUrl)}
                        className="border-none"
                        width="100%"
                        height="500px"
                        title="Document Viewer"
                    />
                </div>
            ) : (
                <div className="w-full flex items-center justify-center">
                    <p>No Document Found.</p>
                </div>
            )}
        </div>
    );
}

export default DocView
