import { useNavbarState } from ".././../../../../@context/NavbarProvider";
import CategoryCard from "./components/CategoryCard";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import { Paper } from "@mui/material";

type Category = {
  icon: string;
  title: string;
  link: string;
};

const categoryList: Category[] = [
  {
    icon: "/assets/icons/admin/admin-tool-icons/roll.png",
    title: "User Role",
    link: "/admin-tools/user-role",
  },
  {
    icon: "/assets/icons/admin/admin-tool-icons/user.png",
    title: "User Management",
    link: "/admin-tools/user-management",
  },
  {
    icon: "/assets/icons/admin/admin-tool-icons/process.png",
    title: "Process",
    link: "/admin-tools/process",
  },
  {
    icon: "/assets/icons/admin/admin-tool-icons/group.png",
    title: "Group",
    link: "/admin-tools/group",
  },
  {
    icon: "/assets/icons/admin/admin-tool-icons/process-allocation.png",
    title: "Process Allocation",
    link: "/admin-tools/process-allocation",
  }, ,
  {
    icon: "/assets/icons/admin/admin-tool-icons/report-allocation.png",
    title: "Report Allocation",
    link: "/admin-tools/report-allocation",
  },
  {
    icon: "/assets/icons/admin/admin-tool-icons/add-report.png",
    title: "Add Report",
    link: "/admin-tools/add-report",
  },
  {
    icon: "/assets/icons/admin/admin-tool-icons/bulk-upload.png",
    title: "User Bulk Upload",
    link: "/admin-tools/bulk-upload",
  },
].filter(Boolean) as Category[];

const AdminTools = () => {
  const { mobileOpen } = useNavbarState();
  return (
    <>
      <Paper className="my-12 p-6 mx-12">
        <div className="flex ">
          <EdgeSvgIcon
            className="icon-size-28 cursor-pointer text-red-600"
            color="error"
          >
            material-solid:admin_panel_settings
          </EdgeSvgIcon>
          <div className="text-red-600 font-bold flex-col pl-6">
            <div>Admin Tools</div>
            <div className="text-[12px] text-gray">
              Master data configuration panels.
            </div>
          </div>
        </div>
      </Paper>
      <div
        className={`grid grid-cols-1  md:grid-cols-5 gap-12 px-12 ${mobileOpen
          ? "sm:grid-cols-1 md:grid-cols-3"
          : "sm:grid-cols-2 md:grid-cols-2"
          }`}
      >
        {categoryList.map((category, index) => (
          <CategoryCard
            title={category.title}
            icon={category.icon}
            link={category.link}
            key={index}
          />
        ))}
      </div>
    </>
  );
};

export default AdminTools;
