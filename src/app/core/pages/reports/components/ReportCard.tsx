import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  icon: string;
  title: string;
  link: string;
}

const ReportCard: FC<CategoryCardProps> = (props) => {
  const { icon, title, link } = props;

  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(link);
  };

  return (
    <div
      className={`flex justify-start items-center bg-white shadow-md hover:shadow-lg p-12 rounded hover:bg-slate-300 hover:cursor-pointer border-b-4 border-primary `}
      onClick={() => handleOnClick()}
    >
      <div className="flex flex-col gap-6 justify-start">
        <img src={icon} className="w-36 h-36" alt="icon" />
        <span className="font-bold text-10 text-center text-secondary">
          {title}
        </span>
      </div>
    </div>
  );
};

export default ReportCard;
