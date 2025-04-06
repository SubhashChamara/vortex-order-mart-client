import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import EdgeButton from "../@edgevantage/core/EdgeButton/EdgeButton";
import EdgeSvgIcon from "../@core/ui/EdgeSvgIcon";

type PageBreadCrumb = {
  name: string;
  url: string;
};

type EdgeSimplePageProps = {
  mainBreadCrumb: PageBreadCrumb;
  subBreadCrumbs: PageBreadCrumb[];
  title: string 
  content: ReactNode;
  headerContent?:ReactNode;
  icon: string
};

const EdgeSimplePage: FC<EdgeSimplePageProps> = (props) => {
  const { mainBreadCrumb, subBreadCrumbs, title, content,headerContent, icon } = props;
  return (
    <div className="flex flex-col p-12 gap-24 w-full">
      <div className="flex justify-between items-center">
        <div className="flex flex-col space-y-8 sm:space-y-0">
        <motion.span
          className="flex items-end"
          initial={{ x: -20 }}
          animate={{
            x: 0,
            transition: { delay: 0.4 },
          }}
        >
          <img src={icon} className='w-36 h-36' alt='icon' />
          <h1 className="flex text-16 font-bold tracking-tight text-secondary pl-12">
            {title}
          </h1>
        </motion.span>

        <motion.span
          className="flex items-end pt-6"
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.4 } }}
        >
          {subBreadCrumbs?.length > 0 && (
            <Breadcrumbs
              aria-label="breadcrumb"
              className="items-center"
              separator={<NavigateNextIcon fontSize="small" />}
            >
              <EdgeSvgIcon
                className="icon-size-10 cursor-pointer mr-3 text-primary"
                color="error"
              >
                feather:home
              </EdgeSvgIcon>
              <Typography className="font-bold text-gray" key={mainBreadCrumb.name}>{mainBreadCrumb.name}</Typography>
              {subBreadCrumbs.map((item, index) =>
                index + 1 === subBreadCrumbs.length ? (
                  <Typography className="font-bold text-gray" key={index}>{item.name}</Typography>
                ) : (
                  <Link key={index} color="text-secondary text-gray" to={item.url}>
                    <span className="font-bold">{item.name}</span>
                  </Link>
                )
              )}
            </Breadcrumbs>
          )}
        </motion.span>
        </div>
        <motion.div
         initial={{ x: -20 }}
         animate={{ x: 0, transition: { delay: 0.4 } }}
         >
          {headerContent && headerContent}
        
        </motion.div>
      </div>
      <div className="overflow-auto max-h-screen">{content}</div>
    </div>
  );
};

export default EdgeSimplePage;
