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
import { useEffect, useState } from "react";
import { do_action } from "../../../services/userServices";
// VMENU_APP_PAGES_CATEGORIES 6.0.0 @VDEVSBG //
const ShowCategoryList = ({ objectData }) => {
  const [colorSchemeName,setColorSchemeName] = useState('');
  const [categoryMeta, setCategoryMeta] = useState({
    layout: { type: 'grid', columns: 3, spacing: 'medium', order: 'manual' },
    design: { colorScheme: 'default', cardStyle: 'rounded', animation: { hover: true, type: 'lift' } },
    content: { showBadges: true, showDescriptions: false, showCounts: true, showPrices: true },
    advanced: { lazyLoading: true, adaptiveColors: true, responsiveBreakpoints: { mobile: 1, tablet: 2, desktop: 3 } },
    themes: { modern: { showDiscountTags: true, showPopularityBadges: true, quickView: true }, grid: { iconSize: 'medium' }, list: { showDetails: false } },
    meta: { version: '2.0', lastUpdated: new Date().toISOString() }
  });

  useEffect(() => {
    const meta = objectData?.MODULES?.OBJECT_INFO?.LANDING_PAGE_SETTINGS?.CATEGORY_META?.settings;
    if (meta) {
      setCategoryMeta(meta);
    }
  }, [objectData]);

  useEffect(() => {
    do_action("click_button", { button_name: "Категории" });
  }, [objectData]);

const [aspectRatio, setAspectRatio] = useState('1/1');

useEffect(() => {
  /**
   * Update the aspect ratio of the category list based on the screen width and the number of columns.
   */
  const updateAspectRatio = () => {
    const width = window.innerWidth;


    if (categoryMeta.layout.columns === 1) {
      if (width < 768) {

        setAspectRatio('3/1');
      } else {

        setAspectRatio('5/1');
      }
    } else {

      setAspectRatio('1/1');
    }
  };

  updateAspectRatio();
  window.addEventListener('resize', updateAspectRatio); // Listen for resize

  return () => {
    window.removeEventListener('resize', updateAspectRatio);
  };
}, [categoryMeta.layout.columns]);


const getStyles = () => {
  const colorSchemes = {
    default: { bg: '#f5f5f5', card: '#fff', text: '#333', header: '#fff' },
    vibrant: { bg: '#fff5f5', card: '#fff', text: '#d63031', header: '#fff' },
    minimal: { 
      bg: '#f8f9fa', 
      card: '#ffffff', 
      text: '#5a5a5a', 
      header: '#ffffff',
      lightText: '#fbfaf4ff',
      accent: '#e8e8e8'
    },
    dark: { bg: '#121212', card: '#1e1e1e', text: '#e0e0e0', header: '#1e1e1e' }
  };

    const currentScheme = colorSchemes[categoryMeta.design.colorScheme] || colorSchemes.default;
    const cardStyle = categoryMeta.design.cardStyle;
    const animationType = categoryMeta.design.animation.type;
    const columns = Math.max(1, Math.min(5, categoryMeta.layout.columns));
    useEffect(() => {
      setColorSchemeName(categoryMeta.design.colorScheme);
    },[categoryMeta])
    console.log(colorSchemeName);
    
    let borderRadius;
    switch (cardStyle) {
      case 'rounded': borderRadius = '12px'; break;
      case 'slightly-rounded': borderRadius = '8px'; break;
      case 'square': borderRadius = '0'; break;
      default: borderRadius = '12px';
    }

    let hoverEffect = {};
    if (categoryMeta.design.animation.hover) {
      switch (animationType) {
        case 'lift': hoverEffect = { transform: 'translateY(-5px)', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }; break;
        case 'scale': hoverEffect = { transform: 'scale(1.03)' }; break;
        case 'shadow': hoverEffect = { boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }; break;
        default: hoverEffect = { transform: 'translateY(-5px)' };
      }
    }

    const gridColumns = {
      1: '1fr',
      2: 'repeat(2, 1fr)',
      3: 'repeat(3, 1fr)',
      4: 'repeat(4, 1fr)',
      5: 'repeat(5, 1fr)'
    };

const textContrastStyles = categoryMeta.design.colorScheme === 'minimal' 
  ? {
      color: colorSchemes.minimal.lightText,
      fontWeight: '500',
      letterSpacing: '0.5px'
    }
  : {
      color: '#fff',
      textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
      fontWeight: '600'
    };

    return {
      container: {
        minHeight: '100vh',
        backgroundColor: currentScheme.bg,
        paddingBottom: '80px'
      },
      header: {
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backgroundColor: currentScheme.header,
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
        transition: 'background-color 0.2s',
        backgroundColor: categoryMeta.design.colorScheme === 'dark' ? '#333' : '#f0f0f0'
      },
      title: {
        margin: 0,
        fontSize: '1.25rem',
        fontWeight: 600,
        color: currentScheme.text
      },
      gridContainer: {
        display: 'grid',
        gridTemplateColumns: gridColumns[columns] || 'repeat(3, 1fr)',
        gap: categoryMeta.layout.spacing === 'small' ? '8px' : 
             categoryMeta.layout.spacing === 'large' ? '24px' : '16px',
        maxWidth: '1200px',
        margin: '20px auto',
        padding: '0 16px',
        '@media (max-width: 768px)': {
          gridTemplateColumns: '1fr'
        }
      },
      categoryCard: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: aspectRatio,
        borderRadius: borderRadius,
        overflow: 'hidden',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: currentScheme.card
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
        backgroundColor: categoryMeta.design.colorScheme === 'minimal' ? '#602920' : 'rgba(0, 0, 0, 0.5)'
      },
      categoryIcon: {
        fontSize: categoryMeta.themes.grid.iconSize === 'small' ? '2rem' : 
                 categoryMeta.themes.grid.iconSize === 'large' ? '3rem' : '2.5rem',
        marginBottom: '12px',
        color: categoryMeta.design.colorScheme === 'minimal' ? '#D4AF37' : '#fff',
        visibility: objectData?.MODULES?.OBJECT_INFO?.LANDING_PAGE_SETTINGS?.CATEGORY_SETTINGS?.SHOW_PRODUCT_ICONS ? 'visible' : 'hidden'
      },
categoryName: {
  margin: '0 0 50px 0',
  fontSize: columns === 1 ? '1.5rem' : '1.1rem',
  fontWeight: categoryMeta.design.colorScheme === 'minimal' ? 500 : 700,
  ...textContrastStyles,
  transition: 'color 0.3s ease'
},
categoryCount: {
  fontSize: columns === 1 ? '1.1rem' : '0.9rem',
  ...textContrastStyles,
  display: categoryMeta.content.showCounts ? 'block' : 'none',
  opacity: categoryMeta.design.colorScheme === 'minimal' ? 0.8 : 1
},
      badgeContainer: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        display: 'flex',
        gap: '5px'
      },
      badge: {
        padding: '3px 8px',
        borderRadius: '12px',
        fontSize: '0.7rem',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#ff4757',
        textShadow: 'none'
      },
      hoverEffect: hoverEffect
    };
  };

  const styles = getStyles();

  
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <Link 
            to="/" 
            style={styles.backButton}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = categoryMeta.design.colorScheme === 'dark' ? '#444' : '#e0e0e0'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = styles.backButton.backgroundColor}
          >
            <svg height="24" viewBox="0 0 486.65 486.65" width="24" fill={categoryMeta.design.colorScheme === 'dark' ? '#fff' : '#333'}>
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
              backgroundImage: `linear-gradient(rgba(231, 228, 228, 0.6), rgba(0, 0, 0, 0.6)), url(${getEnv()}/uploads/${category.category_background_image})`
            }}
            onMouseEnter={e => Object.assign(e.currentTarget.style, styles.hoverEffect)}
            onMouseLeave={e => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = styles.categoryCard.boxShadow;
            }}
          >
            <div style={styles.cardContent}>
              <i
                className={category.category_mini_image}
                style={styles.categoryIcon}
              ></i>
              <h3 style={styles.categoryName}>{category.category_name}</h3>
              <span style={styles.categoryCount}>
                {category.itemCount} {GeneratePrefix(category.itemCount)}
              </span>
              
              {categoryMeta.themes.modern.showDiscountTags && category.discount && (
                <div style={styles.badgeContainer}>
                  <span style={styles.badge}>{category.discount}%</span>
                </div>
              )}
              
              {categoryMeta.themes.modern.showPopularityBadges && category.isPopular && (
                <div style={styles.badgeContainer}>
                  <span style={{...styles.badge, backgroundColor: '#2ed573'}}>Популярно</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
      
      {objectData.MODULES.OBJECT_INFO.COMPONENT_MANAGEMENT.FOOTER.PAGE_CATEGORIES && <ShowAppMenu />}
    </div>
  );
};

const CategoryList = withObjectData(ShowCategoryList);

export default CategoryList;