import withObjectData from "../../../HOC/withObjectInfo"
import LoadingAnimation from "../../Animations/Loading";

const ShowDetails = ({objectData}) => {

    if(!objectData){
        return <LoadingAnimation/>;
    }
}


const AnnounceDetails = withObjectData(ShowDetails);

export default AnnounceDetails;