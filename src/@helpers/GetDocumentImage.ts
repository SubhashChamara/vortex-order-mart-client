const GetDocumentImage = (fileType: string): string => {
  switch (fileType) {
    case "pdf":
      return "assets/icons/document/pdf.png";
    case "doc":
    case "docx":
      return "assets/icons/document/word.png";
    case "xls":
    case "xlsx":
      return "assets/icons/document/xlsx.png";
    case "png":
      return "assets/icons/document/png.png";
    case "jpg":
    case "jpeg":
      return "assets/icons/document/jpg.png";
    case "xml":
      return "assets/icons/document/xml.png"
    case "txt":
      return "assets/icons/document/txt.png"
    default:
      return "assets/icons/document/jpg.png"; // Default image for unknown types
  }
};

export default GetDocumentImage;
