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
import { useEffect } from "react";
import { do_action } from "../../../services/userServices";

const ShowCategoryList = ({ objectData }) => {
  useEffect(() => {
    do_action("click_button", { button_name: "Категории" });
  }, [objectData]);

  // Inline styles object
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      paddingBottom: '80px'
    },
    header: {
      position: 'sticky',
      top: 0,
      zIndex: 10,
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      padding: '12px 0'
    },
    headerContent: {
      display: 'flex',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 16px'
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      marginRight: '16px',
      transition: 'background-color 0.2s'
    },
    backButtonHover: {
      backgroundColor: '#f0f0f0'
    },
    title: {
      margin: 0,
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#333333'
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px',
      maxWidth: '1200px',
      margin: '20px auto',
      padding: '0 16px'
    },
    categoryCard: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      aspectRatio: '1/1',
      borderRadius: '12px',
      overflow: 'hidden',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      textDecoration: 'none',
      transition: 'transform 0.2s, box-shadow 0.2s',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    },
    cardContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      textAlign: 'center',
      zIndex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    categoryIcon: {
      fontSize: '2.5rem',
      marginBottom: '12px'
    },
    categoryName: {
      margin: '0 0 4px 0',
      fontSize: '1.1rem',
      fontWeight: 600,
      color: 'white',
      textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
    },
    categoryCount: {
      fontSize: '0.9rem',
      color: 'rgba(255, 255, 255, 0.9)',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <Link 
            to="/" 
            style={styles.backButton}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = styles.backButtonHover.backgroundColor}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = ''}
          >
            <svg height="24" viewBox="0 0 486.65 486.65" width="24">
              <path d="m202.114 444.648c-8.01-.114-15.65-3.388-21.257-9.11l-171.875-171.572c-11.907-11.81-11.986-31.037-.176-42.945.058-.059.117-.118.176-.176l171.876-171.571c12.738-10.909 31.908-9.426 42.817 3.313 9.736 11.369 9.736 28.136 0 39.504l-150.315 150.315 151.833 150.315c11.774 11.844 11.774 30.973 0 42.817-6.045 6.184-14.439 9.498-23.079 9.11z" />
              <path d="m456.283 272.773h-425.133c-16.771 0-30.367-13.596-30.367-30.367s13.596-30.367 30.367-30.367h425.133c16.771 0 30.367 13.596 30.367 30.367s-13.596 30.367-30.367 30.367z" />
            </svg>
          </Link>
          <h5 style={styles.title}>Категории</h5>
        </div>
      </header>
      
      <div style={styles.gridContainer}>
        {objectData.categories.map((category, index) => (
          <Link
            key={index}
            to={`/category/${category.entry_id}`}
            style={{
              ...styles.categoryCard,
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${getEnv()}/uploads/${category.category_background_image})`
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = ''}
          >
            <div style={styles.cardContent}>
              <i
                className={category.category_mini_image}
                style={{
                  ...styles.categoryIcon,
                  color: category.category_color
                }}
              ></i>
              <h3 style={styles.categoryName}>{category.category_name}</h3>
              <span style={styles.categoryCount}>
                {category.itemCount} {GeneratePrefix(category.itemCount)}
              </span>
            </div>
          </Link>
        ))}
      </div>
      
      <ShowAppMenu />
    </div>
  );
};

const CategoryList = withObjectData(ShowCategoryList);

export default CategoryList;