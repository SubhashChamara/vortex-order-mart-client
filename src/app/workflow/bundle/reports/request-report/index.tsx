import { useCallback, useEffect, useState } from "react";
import { Api } from "../../../../../api/Api";
import moment from "moment";
import { Pageable } from "../../../../../api/types/Pageable";
import Logger from "../../../../../@helpers/Logger";
import Ve3LoadingScreen from "../../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import { BundledRequestReportIf } from "../../../../core/types/reports/BundledRequestReport";
import BundledRequestReportTable from "./components/BundleRequestReportTable";
import Filters, { ReportFilters } from "./components/ReportFilters";
import { DropDownItem } from "../../../../core/types/DropDown";
import { DBRUser } from "../../../../core/types/DBRUser";
import { UWApprover } from "../../../../core/types/UWApproverUser";

const BundledRequestReport = () => {
    // const { mobileOpen } = useNavbarState();

    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(20);
    const [loading, setLoading] = useState<boolean>(true);
    const [bundledRequestReportList, setBundledRequestReportList] = useState<Pageable<BundledRequestReportIf> | null>(null);
    const [sourceTypeDropdowns, setSourceTypeDropdowns] = useState<DropDownItem[]>([]);
    const [cardTypeDropdowns, setCardTypeDropdowns] = useState<DropDownItem[]>([]);
    const [flowTypeDropdowns, setFlowTypeDropdowns] = useState<DropDownItem[]>([]);
    const [categoryTypeDropdowns, setCategoryTypeDropdowns] = useState<DropDownItem[]>([]);
    const [statusDropdowns, setStatusDropdowns] = useState<DropDownItem[]>([]);
    const [dbrUserDropdowns, setDBRUserDropdowns] = useState<DBRUser[]>([]);
    const [branchManagersDropdowns, setBranchManagersDropdowns] = useState<UWApprover[]>([]);

    // Common method for fetching dropdown data
    const getDropdownData = async (
        dropdownType: string,
        setState: React.Dispatch<React.SetStateAction<DropDownItem[]>>) => {
        const { data, err } = await Api.performRequest((r) =>
            r.creditCard.getBundledDropdownData(dropdownType)
        );

        if (data !== null) {
            setState(data);
        } else {
            console.log(err);
        }
    };

    // get DBR Users
    const getDBRUsers = async () => {
        const { data, err } = await Api.performRequest((r) =>
            r.creditCard.getDBRUsers()
        );

        if (data !== null) {
            setDBRUserDropdowns(data);
        } else {
            console.log(err?.msg);
        }
    };

    //get Approvers
    const getApprovers = async () => {
        const { data, err } = await Api.performRequest((r) =>
            r.creditCard.getUWApprovers()
        );
        if (data !== null) {
            setBranchManagersDropdowns(data);
        } else {
            console.log(err);
        }
    }


    useEffect(() => {
        getDropdownData("customer-source-type", setSourceTypeDropdowns);
        getDropdownData("card-type", setCardTypeDropdowns);
        getDropdownData("category-type", setCategoryTypeDropdowns);
        getDropdownData("flow-type", setFlowTypeDropdowns);
        getDropdownData("status", setStatusDropdowns);
        getDBRUsers();
        getApprovers();
    }, []);



    const defaultFilter: ReportFilters = {
        categoryType: null,
        flowType: null,
        nicPPNumber: null,
        fromDate: moment().startOf("month").toDate(),
        toDate: moment().toDate(),
        status: null,
        cardType: null,
        sourceType: null,
        approver: null,
        dsr: null,

    };

    const [filter, setFilter] = useState<ReportFilters | null>(defaultFilter);

    const handlePassFilters = (filters: ReportFilters) => {
        setFilter(filters);
    };

    const nicPPNumber = filter?.nicPPNumber ? filter?.nicPPNumber?.replace(/\s+/g, '') : null
    const startDate = filter?.fromDate
        ? moment(filter.fromDate).format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD");
    const endDate = filter?.toDate
        ? moment(filter.toDate).format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD");
    const status = filter?.status ? filter?.status?.id : null;
    const cardType = filter?.cardType ? filter?.cardType?.id : null;
    const sourceType = filter?.sourceType ? filter?.sourceType?.id : null;
    const approver = filter?.approver ? filter?.approver?.userId : null;
    const dsr = filter?.dsr ? filter?.dsr?.id : null


    const handleFetchBundledRequestReportList = useCallback(async () => {

        Logger.debug(
            `nicPPNumber:  ${nicPPNumber}` +
            `, startDate: ${startDate}` +
            `, endDate: ${endDate}` +
            `, status: ${status}` +
            `, cardType: ${cardType}` +
            `, sourceType: ${sourceType}` +
            `, approver: ${approver}` +
            `, dsr: ${dsr}`);

        setLoading(true);
        const { data, err } = await Api.performRequest((r) =>
            r.reports.getBundledRequestReport(
                size,
                page,
                nicPPNumber,
                startDate,
                endDate,
                status,
                cardType,
                sourceType,
                approver,
                dsr
            )
        );
        Logger.debug(
            "(History Process List) => { DATA: " +
            JSON.stringify(data) +
            " , ERROR: " +
            JSON.stringify(err)
        );

        if (data !== null) {
            setBundledRequestReportList(data);
        }
        setLoading(false);
    }, [size, page, filter]);

    useEffect(() => {
        handleFetchBundledRequestReportList();
    }, [page, handleFetchBundledRequestReportList]);


    return (
        <div className="px-12 pb-12">
            <Filters
                title="Bundle Request"
                categoryTypeDropdowns={categoryTypeDropdowns}
                flowTypeDropdowns={flowTypeDropdowns}
                statusDropdown={statusDropdowns}
                sourceTypeDropdowns={sourceTypeDropdowns}
                cardTypeDropdowns={cardTypeDropdowns}
                branchManagersDropdowns={branchManagersDropdowns}
                dbrUserDropdowns={dbrUserDropdowns}
                handlePassFilters={handlePassFilters}
            />
            {loading ? (
                <Ve3LoadingScreen />
            ) : (
                <>
                    <BundledRequestReportTable
                        bundledRequestReportList={bundledRequestReportList}
                        setPage={setPage}
                        page={page}
                    />
                </>
            )}

        </div>
    );
};

export default BundledRequestReport;
