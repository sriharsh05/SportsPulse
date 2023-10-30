import { ArticlePreview } from "../../context/articles/types";
import { Link } from "react-router-dom";

const ArticleCard = (props: ArticlePreview) => {
  return (
    <div
      key={props.id}
      className="flex flex-col border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
    >
      <Link to={`/articles/${props.id}`}>
        <div className="flex flex-row">
          <img
            className="w-36 rounded-l-lg h-auto object-cover"
            src={props.thumbnail}
            alt={props.title}
          />
          <div className="flex flex-col justify-start p-5">
            <p className="text-s text-neutral-600"> {props.sport.name}</p>
            <h2 className="text-xl mt-2 font-semibold">{props.title}</h2>
            <p className="text-l text-gray-500">{props.summary}</p>
            <p className="flex text-sm text-gray-500 mt-3">
              {new Date(props.date).toDateString()}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
