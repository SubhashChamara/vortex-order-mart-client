import { useCallback, useEffect, useState } from "react";
import { Api } from "../../../../../api/Api";
import Logger from "../../../../../@helpers/Logger";
import Ve3LoadingScreen from "../../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import CreateNewsTable from "./components/CreateNewsTable";
import { Pageable } from "../../../../../api/types/Pageable";
import { CreateNews } from "../../../../core/types/reports/CreateNews";
import { toast } from "react-toastify";
import CreateNewsComponent from "./components/CreateNewsComponent";


const CreateNewsPage = () => {

    const [page, setPage] = useState<number>(0);
    const [createNews, setCreateNews] = useState<Pageable<CreateNews | null> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [actionName, setActionName] = useState<string>("CREATE");
    const [formTitle, setFormTitle] = useState<string>("Create a News");
    const [newsForUpdate, setNewsForUpdate] = useState<CreateNews | null>(null);
    const [newsForDelete, setNewsForDelete] = useState<CreateNews | null>(null);


    const fetchCreatedNews = useCallback(async () => {
        setLoading(true);
        const { data, err } = await Api.performRequest((r) =>
            r.reports.getCreatedNews(
                10,
                page,
            )
        );
        Logger.debug(
            "(History Process List) => { DATA: " +
            JSON.stringify(data) +
            " , ERROR: " +
            JSON.stringify(err)
        );

        if (data !== null) {
            setCreateNews(data);
        }
        setLoading(false);
    }, [page]);

    useEffect(() => {
        fetchCreatedNews();
    }, [page]);


    const deleteNews = async () => {
        const { data, err } = await Api.performRequest((r) =>
            r.reports.deleteNews(newsForDelete?.id || 0)
        );

        if (err == null) {
            fetchCreatedNews();
            toast.success('News Deleted Successfully');
            formReset();
        } else {
            toast.error(err?.msg);
        }
    }

    const handlePageChange = (page: number) => {
        setPage(page - 1);
    }

    const selectedNews = (news: CreateNews | null) => {
        setActionName("UPDATE");
        setFormTitle("Update News");
        setNewsForUpdate(news);
    }

    const selectedNewsForDelete = (news: CreateNews | null) => {
        setNewsForDelete(news);
    }
    const formReset = () => {
        setActionName("CREATE");
        setFormTitle("Create News");
        setNewsForUpdate(null);
        setNewsForDelete(null);
    }

    useEffect(() => {
        if (newsForDelete !== null) {
            deleteNews();
        }
    }, [newsForDelete]);


    return (
        <div className="px-12 pb-12">
            <CreateNewsComponent
                // handlePassFilters={handlePassFilters}
                title={formTitle}
                actionName={actionName}
                newsForUpdate={newsForUpdate}
                formReset={formReset}
                fetchNewsList={fetchCreatedNews}
            />
            {loading ? (
                <Ve3LoadingScreen />
            ) : (
                <>
                    <CreateNewsTable
                        createNews={createNews}
                        setPage={handlePageChange}
                        page={page}
                        selectedNews={selectedNews}
                        selectedNewsForDelete={selectedNewsForDelete}
                    />
                </>
            )}

        </div>
    );
};

export default CreateNewsPage;
