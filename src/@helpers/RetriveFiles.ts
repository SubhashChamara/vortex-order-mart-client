const RetriveFile = (path: string) => {
  return `${import.meta.env.VITE_API_URL}/document/files/${path}`;
};

export const EncodeUrlPath = (path: string | undefined): string | undefined => {
  if (!path) {
    console.error("Path is undefined or null");
    return undefined;
  }

  const baseUrl: string = import.meta.env.VITE_API_URL;
  const modifiedPath = path.replace(/ /g, "%20");
  return `${baseUrl}/document/files/${modifiedPath}`;
};

export default RetriveFile;
