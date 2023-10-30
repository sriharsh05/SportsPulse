import React, { useEffect } from "react";
import { getMatch } from "../../utils/api";
import { MatchPreview } from "../../context/liveMatches/types";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const FavouritesCard = (props: MatchPreview) => {
  const [location, setLocation] = React.useState("");
  const [date, setDate] = React.useState("");

  useEffect(() => {
    const fetchMatch = async () => {
      const response = await getMatch(props.id);
      if (response.location) {
        setLocation(response.location);
      }
      if (response.startsAt) {
        setDate(response.startsAt);
      }
    };
    fetchMatch();
  }, [props.id]);

  return (
    <Link
      className="block p-5 w-full rounded-lg hover:shadow-xl transition duration-300 border-2 border-teal-200"
      to={`/favorites/${props.id}`}
    >
      <p className="text-sm mb-1">{props.name}</p>
      <p className="text-gray-600 text-sm mb-1">
        {date && format(new Date(date), "yyyy-MM-dd")}
      </p>
      <p className="text-xs text-gray-600">{location}</p>
    </Link>
  );
};

export default FavouritesCard;
