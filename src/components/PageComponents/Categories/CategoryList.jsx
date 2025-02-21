import { Link } from "react-router-dom";
import withObjectData from "../../../HOC/withObjectInfo";
import "../../Styles/happy-icons.min.css";
import "../../Styles/elegant-icons.min.css";
import "../../Styles/feather-icons.min.css";
import "../../Styles/foundation-icons.min.css";
import "../../Styles/open-iconic.min.css";
import "../../Styles/tabler-icons.min.css";
import GeneratePrefix from "../../../utils/categoryPrefix";
import { getEnv } from "../../../utils/appData";
import ShowAppMenu from "../../AppMenus/defaultMenu";


const ShowCategoryList = ({ objectData }) => {
  return (
    <>
      <header className="header">
        <div className="main-bar">
          <div className="container">
            <div className="header-content">
              <div className="left-content">
                <Link to="/" className="back-btn">
                  <svg height="512" viewBox="0 0 486.65 486.65" width="512">
                    <path d="m202.114 444.648c-8.01-.114-15.65-3.388-21.257-9.11l-171.875-171.572c-11.907-11.81-11.986-31.037-.176-42.945.058-.059.117-.118.176-.176l171.876-171.571c12.738-10.909 31.908-9.426 42.817 3.313 9.736 11.369 9.736 28.136 0 39.504l-150.315 150.315 151.833 150.315c11.774 11.844 11.774 30.973 0 42.817-6.045 6.184-14.439 9.498-23.079 9.11z" />
                    <path d="m456.283 272.773h-425.133c-16.771 0-30.367-13.596-30.367-30.367s13.596-30.367 30.367-30.367h425.133c16.771 0 30.367 13.596 30.367 30.367s-13.596 30.367-30.367 30.367z" />
                  </svg>
                </Link>
                <h5 className="title mb-0 text-nowrap">Категории</h5>
              </div>
              <div className="mid-content"></div>
              <div className="right-content"></div>
            </div>
          </div>
        </div>
      </header>
      <div className="page-content">
        <div className="container">
          <div className="dz-list style-2">
            <ul className="categore-list">
              {objectData.categories.map((category, index) => (
                <li key={index}>
                  <Link
                    to={`/category/${category.entry_id}`}
                    className="categore-box box-lg"
                    style={{
                      backgroundImage: `url(${getEnv()}/uploads/${
                        category.category_background_image
                      })`,
                      position: "relative", // Ensure the overlay is positioned correctly
                    }}
                  >
                    {/* Overlay to make text readable */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent black overlay
                        zIndex: 1, // Ensure the overlay is above the background image
                      }}
                    ></div>
                    <i
                      className={category.category_mini_image}
                      style={{
                        marginBottom: "1px",
                        height: "48px",
                        width: "35px",
                        fontSize: "32px",
                        color: `${category.category_color}`,
                        position: "relative", // Ensure the icon is above the overlay
                        zIndex: 2,
                      }}
                    ></i>
                    <h5
                      className="text-white mb-0"
                      style={{ position: "relative", zIndex: 2 }}
                    >
                      {category.category_name}
                    </h5>
                    <span
                      className="font-18 text-white"
                      style={{ position: "relative", zIndex: 2 }}
                    >
                      {category.itemCount} {GeneratePrefix(category.itemCount)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <ShowAppMenu />
    </>
  );
};

const CategoryList = withObjectData(ShowCategoryList);

export default CategoryList;