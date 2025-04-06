import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import { FC } from "react";
import WfNumber from "./WfNumber";
import ReturnTaskCard from "./ReturnTaskCard";
import TopSellingItemsCard from "./TopSellingItemsCard";
import ExpensePieChart from "./ExpensePieChart";
import QuickActionButton from "../../../../../@context/QuickActionButton";

const SideBar: FC = () => {
 const expenseData = [
  { name: "Entertainment", value: 60, color: "#1f3fff" },
  { name: "Bill Expense", value: 15, color: "#ff00ff" },
  { name: "Investment", value: 5, color: "#2c2f4a"},
  { name: "Others", value: 20, color: "#ff8400" },
];
  
  return (
    <Card className="w-full hidden sm:block rounded shadow-2 mr-20 h-full">
      
      {/* <div className="border-b-1 border-b-grey-300 pb-12">
        <div className="m-0">
          <div className="p-6 font-bold text-9 text-gray-800">My Reports</div>

          <Stack direction="row" className="flex justify-start gap-9 p-9">
            {[1, 2, 3, 4].map((item, index) => (
              <div
                key={index}
                className="bg-grey-100 p-4 rounded hover:bg-grey-200 cursor-pointer w-1/4"
              >
                <img
                  src={`assets/icons/workflow/PF (${index + 1}).png`}
                  className="w-full p-3"
                  alt=""
                />
              </div>
            ))}
          </Stack>
        </div>
      </div> */}

      <div className="bg-white flex justify-center border-b-1 border-b-grey-300">
        <ExpensePieChart data={expenseData} />
      </div>

      <div className="flex flex-col gap-10 m-6 p-4">
      <TopSellingItemsCard
  items={[
    {
      image: "https://via.placeholder.com/60x60?text=Romper",
      title: "Crystal Ball",
      quantity: 16,
    },
    {
      image: "https://via.placeholder.com/60x60?text=Shirt",
      title: "Vaccum Flask",
      quantity: 12,
    },
    {
      image: "https://via.placeholder.com/60x60?text=Pants",
      title: "Digital Flask",
      quantity: 2,
    },
    {
      image: "https://via.placeholder.com/60x60?text=Box",
      title: "360 Laptop Stand",
      quantity: 2,
    },
  ]}
  filter="This Month"
  filterOptions={["This Month", "Last Month", "This Year"]}
  onFilterChange={(val) => console.log("Filter changed:", val)}
/>

      </div>
    </Card>
  );
};

export default SideBar;
