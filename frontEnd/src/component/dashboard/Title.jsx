import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const TitleDashboard = ({icon, children}) => {
    return (
        <div className="flex gap-2 items-center p-5">
            <FontAwesomeIcon
                icon={icon}
                className="text-lg"
            ></FontAwesomeIcon>
            <p className="text-sm">{children}</p>
        </div>
    );
};

export default TitleDashboard;
