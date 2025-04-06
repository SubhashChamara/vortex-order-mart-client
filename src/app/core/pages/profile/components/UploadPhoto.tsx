import { ChangeEvent, FC, memo } from "react";
import { Avatar, Paper } from "@mui/material";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
type ProfilePictureFormProps = {
    file: File | null;
    setFile: (file: File) => void;
    isUploading: boolean;
    setIsUploading: (isUploading: boolean) => void;
};

const UploadPhoto: FC<ProfilePictureFormProps> = (props) => {
    const { file, setFile, isUploading, setIsUploading } = props;


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            setIsUploading(false);
        }
    };

    return (
        <Paper className="px-12 pb-10 ">
            <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
                <h1 className="text-12 font-600 text-left flex text-blue-gray-800">
                    <div>
                        <EdgeSvgIcon
                            className="icon-size-18 cursor-pointer mr-3"
                            color="error"
                        >
                            feather:upload-cloud
                        </EdgeSvgIcon>
                    </div>
                    <div>Upload Photo</div>
                </h1>
            </div>
            <div className="flex items-center justify-center w-full">
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-72 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                    <div className="flex flex-col items-center justify-center py-6">
                        <svg
                            className="w-24 h-24 my-4 text-gray-500 "
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="mb-3 text-sm text-gray-500 ">
                            <span className="font-semibold">Click to upload</span>
                        </p>
                        <p className="text-xs text-gray-500 ">SVG, PNG, JPG (MAX. 2 MB)</p>
                    </div>
                    <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileChange(e)}
                    />
                </label>
            </div>

            {file && (
                <div className="my-9 flex justify-center">
                    <Avatar
                        alt="uploaded-img"
                        src={URL.createObjectURL(file)}
                        sx={{ width: 128, height: 128 }}
                    />
                </div>
            )}

        </Paper>
    );
};

export default memo(UploadPhoto);
