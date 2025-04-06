import { zodResolver } from "@hookform/resolvers/zod";
import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { ChangeEvent, FC, memo, useEffect, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";

import dayjs, { Dayjs } from "dayjs";
import { useNavbarState } from "../../../../../@context/NavbarProvider";
import Logger from "../../../../../@helpers/Logger";
import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
import { CLIProcessCheckListInfo } from "../../../../core/types/creditlimitIincreaseProcess/CLIProcessCheckListInfo";
import { CliInfo } from "../../types/CliInfo";
// import { Title } from "@mui/icons-material";

// type Type = {

//   cribNicNumber: string;
//   contactNumber:string;
//   cribAccountNumber:string;
//   customer: string;
//   employment: string;
//   yearMonth: Dayjs|null;
//   relationshipDuration:string;
// Form

//   // newNicNumber: string;
//   // passport: string;
//   // title: DropDownItem|null;
//   // firstName:string;
//   // lastName:string;
//   // addressLine1:string;
//   // addressLine2:string;
//   // addressLine3:string;
//   // city:string;
//   // country:string;

//   // cardNumber:string;
//   // presentLimit: string;
//   // requestedLimit:string;
//   // reason:string;
//   // cardType:DropDownItem|null;
//   // upgradeRequire:boolean;
//   // enhancementType:DropDownItem|null;
//   // upgradeTo:DropDownItem|null;
//   // requestedMode:DropDownItem|null;
//   // cribJustificationAttached:boolean;
//   // cribAttached:boolean;

// };

// const defaultValues: FormType = {
//   cribNicNumber: "",
//   contactNumber:"",
//   cribAccountNumber:"",
//   customer:"",
//   employment:"",
//   yearMonth:null,
//   relationshipDuration:""
// };

// const schema = z.object({
//   cribNicNumber: z.string().refine(value => {
//     return value.trim() === "" || /^[0-9]{9}[vVxX]$/.test(value) || /^[0-9]{9}[XxVv]$/.test(value);
//   }, {
//     message: "Old NIC must Invalid",
//   }).optional(),

//   cribAccountNumber: z.string().refine(value => {
//     return value.trim() === "" || /^\d{11}$/.test(value);
//   }, {
//     message: "Account number must be 11 digits.",
//   }).optional(),
//   contactNumber: z.string().min(1, "Please enter reason for enhancement."),
//   customer: z.string().min(1, "Please enter customer Name."),
//   employment: z.string().min(1, "Please enter employment."),
//   yearMonth: z.instanceof(dayjs).nullable().refine((val) => val !== null, {
//       message: "Please select year and month",
//     }),

//   relationshipDuration: z.string().min(1, "Please enter employment."),
// });

type UserFormProps = {
  task: TaskDetailInfo;
  cliProcessData: CliInfo | null;
  pendReasonList: CLIProcessCheckListInfo[];
  setPendReasonList: (pendReasonList: CLIProcessCheckListInfo[]) => void;
};

const UserForm: FC<UserFormProps> = (props) => {
  const { task, cliProcessData, pendReasonList, setPendReasonList } = props;

  //masters
  // const [titleList, setTitleList] = useState<DropDownItem[]>([]);
  // const [cardTypeList, setCardTypeList] = useState<DropDownItem[]>([]);
  // const [upgradeCardTypeList, setupgradeCardTypeList] = useState<DropDownItem[]>([]);
  // const [enhancementTypeList, setEnhancementTypeList] = useState<DropDownItem[]>([]);
  // const [pendReasonList, setpendReasonList] = useState<CLIProcessCheckListInfo[]>([]);
  const [reasonFirstHalf, setReasonFirstHalf] = useState<
    CLIProcessCheckListInfo[]
  >([]);
  const [reasonSecondHalf, setReasonSecondHalf] = useState<
    CLIProcessCheckListInfo[]
  >([]);
  const [midIndex, setMidIndex] = useState<number>(0);

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  // const titleList:Title[]=[
  //   {
  //     id:'Mr',
  //     name:'Mr'
  //   },
  //   {
  //     id:'Ms.',
  //     name:'Ms.'
  //   },
  //   {
  //     id:'Mrs.',
  //     name:'Mrs.'
  //   },
  // ]

  // const cardTypeList:CardType[]=[
  //   {
  //     id:'mastersilver',
  //     name:'Master Silver'
  //   },
  //   {
  //     id:'platinum',
  //     name:'Platinum'
  //   },
  //   {
  //     id:'gold',
  //     name:'Gold'
  //   },
  // ]

  // const enhancementTypeList:EnhancementType[]=[
  //   {
  //     id:'permanent',
  //     name:'Permananet'
  //   },
  //   {
  //     id:'temporaly',
  //     name:'Temporaly'
  //   },
  //   {
  //     id:'gold',
  //     name:'Gold'
  //   },
  // ]

  // const requestModesList:DropDownItem[]=[
  //   {
  //     id:'email',
  //     name:'Email'
  //   },
  //   {
  //     id:'call',
  //     name:'Call'
  //   },
  //   {
  //     id:'web',
  //     name:'Web Site'
  //   },
  // ]

  // const pendReasonList = [
  //   { name: 'Cash', type: 'txt' },
  //   { name: 'QCA', type: 'txt' },
  //   { name: 'RIS', type: 'txt' },
  //   { name: 'HOT LIST', type: 'chk' },
  //   { name: 'EXISTIG CARD', type: 'txt' },
  //   { name: 'EXISTIG LOANS', type: 'txt' },
  //   { name: 'CARD STATUS ACTIVE', type: 'chk' },
  // ];
  // const selectionCriteriaList = [
  //   { name: 'Is the B Score', type: 'chk' },
  //   { name: 'Account at current status', type: 'chk' },
  //   { name: 'Crib Policy Clearance', type: 'chk' },
  //   { name: 'Payment ratio', type: 'chk' },
  //   { name: 'Utilization', type: 'chk' },
  //   { name: 'No 30 Dpd', type: 'chk' },
  //   { name: 'Age below 65', type: 'chk' },
  //   { name: 'Is active', type: 'chk' },
  // ];

  const fetchMasterData = () => {
    // fetchPersonalTitleMasterData();
    // fetchCardTypeMasterData();
    // fetchUpgradeCardTypeMasterData();
    // fetchEnhancementTypeMasterData();
    // fetchRequestModeMasterData();
  };

  // const fetchPersonalTitleMasterData = async () => {
  //   try {
  //     const { data, err } = await Api.performRequest((r) =>
  //       r.creditCard.getPersonalTitles()
  //     );

  //     Logger.debug(
  //       "(Personal Titles) => { DATA: " +
  //         JSON.stringify(data) +
  //         " , ERROR: " +
  //         JSON.stringify(err)
  //     );

  //     if (data !== null) {
  //       setTitleList(data);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const fetchCardTypeMasterData = async () => {
  //   try {
  //     const { data, err } = await Api.performRequest((r) =>
  //       r.creditCard.getCardTypes()
  //     );

  //     Logger.debug(
  //       "(Card Types) => { DATA: " +
  //         JSON.stringify(data) +
  //         " , ERROR: " +
  //         JSON.stringify(err)
  //     );

  //     if (data !== null) {
  //       setCardTypeList(data);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const fetchUpgradeCardTypeMasterData = async () => {
  //   try {
  //     const { data, err } = await Api.performRequest((r) =>
  //       r.creditCard.getUpgradeCardTypes()
  //     );

  //     Logger.debug(
  //       "(Card Types) => { DATA: " +
  //         JSON.stringify(data) +
  //         " , ERROR: " +
  //         JSON.stringify(err)
  //     );

  //     if (data !== null) {
  //       setupgradeCardTypeList(data);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const fetchEnhancementTypeMasterData = async () => {
  //   try {
  //     const { data, err } = await Api.performRequest((r) =>
  //       r.creditCard.getEnhancementTypes()
  //     );

  //     Logger.debug(
  //       "(Card Types) => { DATA: " +
  //         JSON.stringify(data) +
  //         " , ERROR: " +
  //         JSON.stringify(err)
  //     );

  //     if (data !== null) {
  //       setEnhancementTypeList(data);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const fetchRequestModeMasterData = async () => {
  //   try {
  //     const { data, err } = await Api.performRequest((r) =>
  //       r.creditCard.getRequestMode()
  //     );

  //     Logger.debug(
  //       "(Card Types) => { DATA: " +
  //         JSON.stringify(data) +
  //         " , ERROR: " +
  //         JSON.stringify(err)
  //     );

  //     if (data !== null) {
  //       setRequestModesList(data);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const methods =
  //   useForm<FormType>({
  //     mode: "onChange",
  //     defaultValues,
  //     resolver: zodResolver(schema),
  //   });

  //   const { control, handleSubmit, formState, setError, setValue,watch,getValues}=methods;

  const methods = useFormContext();
  const {
    control,
    handleSubmit,
    formState,
    setError,
    setValue,
    watch,
    getValues,
  } = methods;

  const { errors } = formState;

  // const { errors } = formState;
  // console.log(errors);
  // console.log(watch());
  // const handleFetchUserRoles = async () => {
  //   try {
  //     const { data, err } = await Api.performRequest((r) =>
  //       r.admin.userRoleInfoList()
  //     );

  //     Logger.debug(
  //       "(User Role) => { DATA: " +
  //         JSON.stringify(data) +
  //         " , ERROR: " +
  //         JSON.stringify(err)
  //     );

  //     if (data !== null) {
  //       setRoleList(data);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  function getMonthAndYear(yearMonth: Dayjs | null): {
    month: number | null;
    year: number | null;
  } {
    if (yearMonth) {
      return {
        month: yearMonth.month() + 1,
        year: yearMonth.year(),
      };
    } else {
      return {
        month: null,
        year: null,
      };
    }
  }

  const tableSeperate = () => {
    const midIndex = Math.ceil(pendReasonList.length / 2);
    setMidIndex(midIndex);
    // Split the list into two halves
    setReasonFirstHalf(pendReasonList.slice(0, midIndex));
    setReasonSecondHalf(pendReasonList.slice(midIndex));
  };

  useEffect(() => {
    tableSeperate();
  }, [pendReasonList]);

  // useEffect(()=>{
  //   if(task){
  //     fetchSystemCheckListItems();
  //     fetchSelectionCheckListItems();
  //   }
  // },[task])

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s+/g, "")
      .replace(/(\d{4})(?=\d)/g, "$1 ")
      .trim();
  };

  const formatCurrency = (value: String) => {
    if (!value) return value;
    let cleanedValue = value.replace(/[^0-9.]/g, "");
    if (cleanedValue.includes(".")) {
      const [integer, decimal] = cleanedValue.split(".");
      cleanedValue = `${integer}.${decimal.slice(0, 2)}`;
    }
    const formattedValue = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${formattedValue}`;
  };

  const handleSytemCheckboxChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newpendReasonList = [...pendReasonList];
    newpendReasonList[index].itemCheckValue = event.target.checked;
    setPendReasonList(newpendReasonList);
  };

  const handleSystemTextFieldChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newpendReasonList = [...pendReasonList];
    newpendReasonList[index].itemTxtValue = event.target.value;
    setPendReasonList(newpendReasonList);
  };

  // const handleSystemTextFieldChange = (index: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const newpendReasonList = [...pendReasonList];
  //   newpendReasonList[index].itemTxtValue = event.target.value;
  //   setpendReasonList(newpendReasonList);
  // };

  // const handleSelectionCheckboxChange = (index: number, valueIndex: number, event: ChangeEvent<HTMLInputElement>) => {
  //   const newSelectionCriteriaList = [...selectionCriteriaList];
  //   if (valueIndex === 1) {
  //     newSelectionCriteriaList[index].itemCheckValue = event.target.checked;
  //   } else if (valueIndex === 2) {
  //     newSelectionCriteriaList[index].itemCheckValue = event.target.checked;
  //   }
  //   setSelectionCriteriaList(newSelectionCriteriaList);
  // };

  // const handleSelectionChange = (index: number, value: boolean) => {
  //   const updatedList = [...selectionCriteriaList];
  //   updatedList[index].itemCheckValue = value;
  //   setSelectionCriteriaList(updatedList);
  // };

  // const clearUpgradeType =()=>{
  //   setValue("upgradeTo",null);
  // }

  // useEffect(() => {
  //   if (user !== null) {
  //     setValue("firstName", user.firstName);
  //     setValue("lastName", user.lastName);
  //     setValue("username", user.username);
  //     setValue("email", user.email);
  //     setValue("userRole", user.userRole);
  //     setValue("contactNo", user.telephone);
  //     setValue("designation", user.designation);
  //   }
  // }, [user]);

  const updateDuration = (value: Dayjs | null) => {
    if (!value) {
      alert("No date selected");
      return;
    }

    const now = dayjs();
    if (value.isAfter(now)) {
      alert("Selected date is in the future. Please select a valid date.");
      setValue("yearMonth", null);
      setValue("relationshipDuration", "");
      return;
    }
    const diffYears = now.diff(value, "year");
    const diffMonths = now.diff(value, "month") % 12;

    let durationString = "";
    if (diffYears > 0)
      durationString += `${diffYears} year${diffYears > 1 ? "s" : ""} `;
    if (diffMonths > 0)
      durationString += `${diffMonths} month${diffMonths > 1 ? "s" : ""}`;

    setValue(
      "relationshipDuration",
      durationString.trim() || "Less than a month"
    );
  };

  // console.log(errors);

  // useEffect(() => {
  //   if (cliProcessData !== null) {
  //     const title:DropDownItem = titleList.find(title => title.name === cliProcessData.title)!;
  //     const cardType:DropDownItem = cardTypeList.find(card => card.name === cliProcessData.cardType)!;
  //     const enhancement:DropDownItem = enhancementTypeList.find(enhancement => enhancement.name === cliProcessData.enhancementType)!;
  //     const upgradeTo:DropDownItem|null = cliProcessData.isUpgradeRequired? cardTypeList.find(card => card.name === cliProcessData.upgradeTo)!:null;
  //     const modeType:DropDownItem = requestModesList.find(card => card.name === cliProcessData.modeType)!;
  //     setValue("cribNicNumber", cliProcessData.cribNicNumber);
  //     setValue("newNicNumber", cliProcessData.newNicNumber);
  //     setValue("passport", cliProcessData.passport);
  //     // setValue("title", cliProcessData.title);
  //     setValue("title", title );
  //     setValue("firstName", cliProcessData.firstName);
  //     setValue("lastName", cliProcessData.lastName);
  //     setValue("addressLine1", cliProcessData.addressLine1);
  //     setValue("addressLine2", cliProcessData.addressLine2);
  //     setValue("addressLine3", cliProcessData.addressLine3);
  //     setValue("city", cliProcessData.city);
  //     setValue("country", cliProcessData.country);
  //     setValue("cribAccountNumber", cliProcessData.cribAccountNumber);
  //     setValue("cardNumber", formatCardNumber(cliProcessData.cardNumber));
  //     setValue("presentLimit", formatCurrency((String)(cliProcessData.presentLimit)));
  //     setValue("requestedLimit", formatCurrency((String)(cliProcessData.newLimit)));
  //     setValue("reason", cliProcessData.reasonForEnhancement);
  //     setValue("cardType", cardType);
  //     setValue("enhancementType", enhancement);
  //     setValue("upgradeRequire", cliProcessData.isUpgradeRequired);
  //     setValue("upgradeTo", upgradeTo);
  //     setValue("requestedMode", modeType);
  //     setValue("cribJustificationAttached", cliProcessData.isCribJustificationAttached);
  //   }
  // }, [cliProcessData]);

  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="px-4 pb-10">
        {/* <div className="text-center mb-16 border-b-1 border-b-gray-400 py-6">
        <h1 className="text-xsm font-600 text-left flex text-blue-gray-800">
          <div>
            <EdgeSvgIcon
              className="icon-size-14 cursor-pointer mr-3"
              color="error"
            >
              feather:check-circle
            </EdgeSvgIcon>
          </div>
          <div>System Checks</div>
        </h1>
      </div> */}
        <div className="flex gap-4 ">
          <TableContainer component={Paper} className="max-w-screen-md">
            <Table className="max-w-screen-md">
              <TableHead>
                <TableRow>
                  <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                    Check Criteria
                  </TableCell>
                  <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6">
                    Value
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reasonFirstHalf.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="border border-gray-300">
                      {item.itemName}
                    </TableCell>
                    <TableCell className="border border-gray-300 pb-0 pt-0 w-1">
                      {item.itemType === "chk" ? (
                        <Checkbox
                          checked={item.itemCheckValue}
                          onChange={(event) =>
                            handleSytemCheckboxChange(index, event)
                          }
                        />
                      ) : item.itemType === "txt" ? (
                        <TextField
                          variant="outlined"
                          size="small"
                          value={item.itemTxtValue}
                          onChange={(event) =>
                            handleSystemTextFieldChange(index, event)
                          }
                        />
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Second half table */}
          <TableContainer component={Paper} className="max-w-screen-md">
            <Table className="max-w-screen-md">
              <TableHead>
                <TableRow>
                  <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                    Check Criteria
                  </TableCell>
                  <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6">
                    Value
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reasonSecondHalf.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="border border-gray-300 flex gap-10 items-center">
                      {item.itemName}
                      {item.itemType == "txt" && (
                        <TextField
                          variant="outlined"
                          size="small"
                          value={item.itemTxtValue}
                          onChange={(event) =>
                            handleSystemTextFieldChange(index + midIndex, event)
                          }
                        />
                      )}
                    </TableCell>
                    {item.itemType === "chk" && (
                      <TableCell className="border border-gray-300 pb-0 pt-0 w-1">
                        {item.itemType === "chk" ? (
                          <Checkbox
                            checked={item.itemCheckValue}
                            onChange={(event) =>
                              handleSytemCheckboxChange(index + midIndex, event)
                            }
                          />
                        ) : null}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default memo(UserForm);
