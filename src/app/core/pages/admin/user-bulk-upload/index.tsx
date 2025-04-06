import { FC, memo, useRef, useState } from "react";
import { Button, Paper, Avatar, Card } from "@mui/material";
import { Api } from "../../../../../api/Api";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import { toast } from "react-toastify";
import EdgeSimplePage from "../../../../../@layout/EdgeSimplePage";

// Types for bulk upload responses
type UserResponse = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  accountType: string;
  accountStatus: string;
};

type RoleAllocationResponse = {
  username: string;
  userRoleName: string;
};

type BulkUploadResponse<T> = {
  success: T[];
  errors: string[];
};

const BulkUpload: FC = () => {
  const [userFile, setUserFile] = useState<File | null>(null);
  const [allocationFile, setAllocationFile] = useState<File | null>(null);
  const [userUploadData, setUserUploadData] = useState<UserResponse[]>([]);
  const [roleUploadData, setRoleUploadData] = useState<
    RoleAllocationResponse[]
  >([]);

  const userRef = useRef<HTMLInputElement>(null);
  const allocationRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "user" | "allocation"
  ) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (type === "user") {
        setUserFile(file);
      } else {
        setAllocationFile(file);
      }
    }
  };

  const removeFile = (type: "user" | "allocation") => {
    if (type === "user") {
      if (userRef.current) {
        userRef.current.value = "";
      }
      setUserFile(null);
      setUserUploadData([]);
    } else {
      if (allocationRef.current) {
        allocationRef.current.value = "";
      }
      setAllocationFile(null);
      setRoleUploadData([]);
    }
  };

  const renderFileCard = (file: File | null, type: "user" | "allocation") =>
    file && (
      <Card className="py-4 px-10 text-start flex flex-row justify-between items-center mt-4 w-full max-w-3xl">
        <div className="flex flex-row gap-4 items-center">
          <EdgeSvgIcon size={28} className="text-primary">
            feather:file-text
          </EdgeSvgIcon>
          <span className="font-medium flex flex-col text-sm">
            <p className="font-normal">{file.name}</p>
            <p className="font-light text-[12px] text-gray-500">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </span>
        </div>
        <EdgeSvgIcon
          size={20}
          className="text-primary cursor-pointer"
          onClick={() => removeFile(type)}
        >
          feather:trash-2
        </EdgeSvgIcon>
      </Card>
    );

  const handleUpload = async (type: "user" | "allocation") => {
    const file = type === "user" ? userFile : allocationFile;
    if (!file) {
      toast.error("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const { data, err } = await Api.performRequest((r) =>
      type === "user"
        ? r.admin.bulkUserUpload(formData)
        : r.admin.bulkRoleAllocationUpload(formData)
    );

    console.log("Response data:", data);

    if (err === null) {
      if (typeof data[0] === "string") {
        // Display validation errors
        data.forEach((errMsg: string) => toast.error(errMsg));
      } else {
        // Handle successful data
        if (type === "user") {
          setUserUploadData(data);
          toast.success("Bulk user upload successful.");
        } else {
          setRoleUploadData(data);
          toast.success("Bulk role allocation upload successful.");
        }
      }
    } else {
      const { msg, detail, status, statusText } = err;

      if (Array.isArray(msg)) {
        msg.forEach((errMsg: string) => {
          if (errMsg.startsWith("Validation errors found:")) {
            const errorDetails = errMsg
              .replace("Validation errors found: ", "")
              .split(", Row ");
            errorDetails.forEach((errorMsg: string, index: number) => {
              if (index > 0) {
                errorMsg = `Row ${errorMsg}`;
              }
              toast.error(errorMsg.trim());
            });
          } else {
            toast.error(errMsg);
          }
        });
      } else if (typeof msg === "string") {
        if (msg.startsWith("Validation errors found:")) {
          const errorDetails = msg
            .replace("Validation errors found: ", "")
            .split(", Row ");
          errorDetails.forEach((errorMsg: string, index: number) => {
            if (index > 0) {
              errorMsg = `Row ${errorMsg}`;
            }
            toast.error(errorMsg.trim());
          });
        } else {
          toast.error(msg);
        }
      } else if (detail) {
        toast.error(detail);
      }
    }
  };

  return (
    <>
      <EdgeSimplePage
        title="User Creation and Role Allocation Bulk Upload"
        icon="/assets/icons/admin/admin-tool-icons/report-allocation.png"
        mainBreadCrumb={{ name: "Admin Tools", url: "/admin-tools" }}
        subBreadCrumbs={[
          { name: "User Bulk Upload", url: "/admin-tools/bulk-upload" },
        ]}
        content={
          <div className="grid grid-cols-2 gap-8">
            {/* Bulk User Upload Section */}
            <div className="p-2">
              <Paper className="px-12 h-full">
                <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
                  <h1 className="text-md font-600 text-left flex text-blue-gray-800">
                    <EdgeSvgIcon
                      className="icon-size-18 cursor-pointer mr-3"
                      color="error"
                    >
                      feather:upload-cloud
                    </EdgeSvgIcon>
                    Bulk User Upload
                  </h1>
                </div>
                <div className="flex flex-col items-start">
                  <label
                    htmlFor="user-upload"
                    className="flex flex-col items-center justify-center w-full h-72 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 mt-6"
                  >
                    <input
                      id="user-upload"
                      type="file"
                      className="hidden"
                      ref={userRef}
                      onChange={(e) => handleFileChange(e, "user")}
                    />
                    <div className="flex flex-col items-center justify-center py-6">
                      <svg
                        className="w-24 h-24 my-4 text-gray-500"
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
                        <span className="font-semibold">User upload</span>
                      </p>
                      <p className="text-xs text-gray-500 ">
                        CSV, EXCEL Files (MAX. 5 MB)
                      </p>
                    </div>
                  </label>
                  {renderFileCard(userFile, "user")}

                  <div className="flex justify-left my-6">
                    <Button
                      aria-label="Save"
                      onClick={() => handleUpload("user")}
                    >
                      <EdgeSvgIcon
                        className="icon-size-12 cursor-pointer text-white mr-3"
                        color="error"
                      >
                        feather:save
                      </EdgeSvgIcon>
                      Upload Users
                    </Button>
                  </div>
                </div>

                {/* User Upload Table */}
                {userUploadData?.length > 0 && (
                  <div className="mt-16 mb-8">
                    <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
                      <h1 className="text-md font-600 text-left flex text-blue-gray-800">
                        Uploaded Users
                      </h1>
                    </div>
                    <table id="my-table" className="w-full whitespace-no-wrap">
                      <thead>
                        <tr className="whitespace-nowrap divide-x-1">
                          <th className="p-6 text-left">Username</th>
                          <th className="p-6 text-left">First Name</th>
                          <th className="p-6 text-left">Last Name</th>
                          <th className="p-6 text-left">Email</th>
                          <th className="p-6 text-left">Account Type</th>
                          <th className="p-6 text-left">Account Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white whitespace-nowrap">
                        {userUploadData.map((user) => (
                          <tr
                            className="text-black h-full bg-white shadow-2"
                            key={user.username}
                          >
                            <td className="p-6 text-[12px] align-middle text-left">
                              {user.username}
                            </td>
                            <td className="p-6 text-[12px] align-middle text-left">
                              {user.firstName}
                            </td>
                            <td className="p-6 text-[12px] align-middle text-left">
                              {user.lastName}
                            </td>
                            <td className="p-6 text-[12px] align-middle text-left">
                              {user.email}
                            </td>
                            <td className="p-6 text-[12px] align-middle text-left">
                              {user.accountType}
                            </td>
                            <td className="p-6 text-[12px] align-middle text-left">
                              {user.accountStatus}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Paper>
            </div>

            {/* Bulk Role Allocation Upload Section */}
            <div className="p-2">
              <Paper className="px-12 h-full">
                <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
                  <h1 className="text-md font-600 text-left flex text-blue-gray-800">
                    <EdgeSvgIcon
                      className="icon-size-18 cursor-pointer mr-3"
                      color="error"
                    >
                      feather:upload-cloud
                    </EdgeSvgIcon>
                    Bulk Role Allocation Upload
                  </h1>
                </div>
                <div className="flex flex-col items-start">
                  <label
                    htmlFor="role-upload"
                    className="flex flex-col items-center justify-center w-full h-72 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <input
                      id="role-upload"
                      type="file"
                      className="hidden"
                      ref={allocationRef}
                      onChange={(e) => handleFileChange(e, "allocation")}
                    />
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
                        <span className="font-semibold">
                          User Allocation Upload
                        </span>
                      </p>
                      <p className="text-xs text-gray-500 ">
                        CSV, EXCEL Files (MAX. 5 MB)
                      </p>
                    </div>
                  </label>
                  {renderFileCard(allocationFile, "allocation")}
                  <div className="flex justify-left my-6">
                    <Button
                      aria-label="Save"
                      onClick={() => handleUpload("allocation")}
                    >
                      <EdgeSvgIcon
                        className="icon-size-12 cursor-pointer text-white mr-3"
                        color="error"
                      >
                        feather:save
                      </EdgeSvgIcon>
                      Upload Allocations
                    </Button>
                  </div>
                </div>

                {/* Role Allocation Table */}
                {roleUploadData?.length > 0 && (
                  <div className="mt-16 mb-8">
                    <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
                      <h1 className="text-md font-600 text-left flex text-blue-gray-800">
                        Uploaded Role Allocations
                      </h1>
                    </div>
                    <table id="my-table" className="w-full whitespace-no-wrap">
                      <thead>
                        <tr className="whitespace-nowrap divide-x-1">
                          <th className="p-6 text-left">Username</th>
                          <th className="p-6 text-left">User Role Name</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white whitespace-nowrap">
                        {roleUploadData.map((role) => (
                          <tr
                            className="text-black h-full bg-white shadow-2"
                            key={`${role.username}-${role.userRoleName}`}
                          >
                            <td className="p-6 text-[12px] align-middle text-left">
                              {role.username}
                            </td>
                            <td className="p-6 text-[12px] align-middle text-left">
                              {role.roleName}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Paper>
            </div>
          </div>
        }
      />
    </>
  );
};

export default BulkUpload;
