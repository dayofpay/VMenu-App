import { Link, useParams } from "react-router-dom";
import withObjectData from "../../../../../HOC/withObjectInfo";
import { useEffect, useState } from "react";
import { getProductsByCategory } from "../../../../../services/productServices"
import { ProductHasDiscount } from "../../../../../utils/DateUtils";
import LoadingAnimation from "../../../../Animations/Loading";
import { do_action } from "../../../../../services/userServices";

const ShowCategoryData = ({ objectData }) => {
    const { id } = useParams();
    const [categoryData, setCategoryData] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    
    useEffect(() => {
        const getData = async () => {
            const productData = await getProductsByCategory(id);
            setCategoryData(productData.categoryData[0]);
            setCategoryName(productData.categoryData[1].categoryName);
            do_action("view_category", { 
                category_name: productData.categoryData[1].categoryName,
                category_id: productData.categoryData[1].category_id 
            });
        };

        getData();
    }, [objectData, id]);

    if (!objectData.objectInformation || !categoryData || !categoryName) {
        return <LoadingAnimation />;
    }

    // Inline styles
    const styles = {
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '16px'
        },
        header: {
            position: 'sticky',
            top: 0,
            zIndex: 10,
            backgroundColor: '#fff',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
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
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            marginRight: '12px',
            backgroundColor: '#f5f5f5'
        },
        title: {
            margin: 0,
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#333'
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
            padding: '20px 0'
        },
        productCard: {
            background: '#fff',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease',
            position: 'relative'
        },
        productImage: {
            width: '100%',
            height: '180px',
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
        },
        productContent: {
            padding: '16px'
        },
        productName: {
            fontSize: '1rem',
            fontWeight: 600,
            margin: '0 0 8px 0',
            color: '#333'
        },
        priceSection: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        currentPrice: {
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#ff6b00'
        },
        originalPrice: {
            fontSize: '0.9rem',
            color: '#999',
            textDecoration: 'line-through'
        },
        discountBadge: {
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: '#ffeb3b',
            color: '#c79100',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.8rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        },
        vegBadge: {
            position: 'absolute',
            top: '12px',
            left: '12px',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: '#4caf50',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold'
        },
  promotedTag: {
        position: 'absolute',
        top: '12px',
        left: '12px',
        background: 'linear-gradient(135deg, #ff5e62, #ff9966)',
        color: 'white',
        padding: '4px 10px',
        borderRadius: '4px',
        fontSize: '0.75rem',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        zIndex: 2,
        animation: 'pulse 2s infinite'
    },

    promotedTagWithIcon: {
        // extends promotedTag
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '4px 8px 4px 6px',
        '&::before': {
            content: '"★"',
            fontSize: '0.9rem'
        }
    },


    '@keyframes pulse': {
        '0%': {
            boxShadow: '0 0 0 0 rgba(255, 94, 98, 0.7)'
        },
        '70%': {
            boxShadow: '0 0 0 8px rgba(255, 94, 98, 0)'
        },
        '100%': {
            boxShadow: '0 0 0 0 rgba(255, 94, 98, 0)'
        }
    },
        popularTag: {
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: '#ff4081',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.7rem',
            fontWeight: 'bold',
            textTransform: 'uppercase'
        }
        
    };

    return (
        <div>
            <header style={styles.header}>
                <div style={styles.headerContent}>
                    <Link 
                        to="/categories" 
                        style={styles.backButton}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eee'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                    >
                        <svg height="24" viewBox="0 0 486.65 486.65" width="24">
                            <path d="m202.114 444.648c-8.01-.114-15.65-3.388-21.257-9.11l-171.875-171.572c-11.907-11.81-11.986-31.037-.176-42.945.058-.059.117-.118.176-.176l171.876-171.571c12.738-10.909 31.908-9.426 42.817 3.313 9.736 11.369 9.736 28.136 0 39.504l-150.315 150.315 151.833 150.315c11.774 11.844 11.774 30.973 0 42.817-6.045 6.184-14.439 9.498-23.079 9.11z" />
                            <path d="m456.283 272.773h-425.133c-16.771 0-30.367-13.596-30.367-30.367s13.596-30.367 30.367-30.367h425.133c16.771 0 30.367 13.596 30.367 30.367s-13.596 30.367-30.367 30.367z" />
                        </svg>
                    </Link>
                    <h5 style={styles.title}>{categoryName}</h5>
                </div>
            </header>

            <div style={styles.container}>
                <div style={styles.grid}>
                    {categoryData.map((product, index) => (
                        <div 
                            key={index} 
                            style={styles.productCard}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.12)';
                                e.currentTarget.querySelector('img').style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = '';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                                e.currentTarget.querySelector('img').style.transform = '';
                            }}
                        >
                            <Link to={`/products/${product.item_id}`}>
                                <img 
                                    src={`https://v-menu.eu/uploads/${JSON.parse(product.item_images)[0]}`} 
                                    alt={product.item_name}
                                    style={styles.productImage}
                                />
                            </Link>
                            
                            {/* Пример за Vegetarian badge (може да се добави логика) */}
                            {JSON.parse(product.settings).VISUAL_SETTINGS.SHOW_BADGES.PROMO && (
    <div style={{...styles.promotedTag, ...styles.promotedTagWithIcon}}>Промотирано</div>
                            )}
                            
                            {/* Пример за Popular tag (може да се добави логика) */}
                            {product.product_views >= 200 && (
                                <div style={styles.popularTag}>Популярно</div>
                            )}
                            
                            <div style={styles.productContent}>
                                <h5 style={styles.productName}>
                                    <Link to={`/products/${product.item_id}`} style={{color: 'inherit', textDecoration: 'none'}}>
                                        {product.item_name}
                                    </Link>
                                </h5>
                                <div style={styles.priceSection}>
                                    {product.discount_percentage > 0 && ProductHasDiscount(product.discount_expires) ? (
                                        <>
                                            <span style={styles.currentPrice}>
                                                BGN {(product.item_price - (product.discount_percentage * product.item_price) / 100).toFixed(2)}
                                            </span>
                                            <span style={styles.originalPrice}>
                                                BGN {Number(product.item_price).toFixed(2)}
                                            </span>
                                        </>
                                    ) : (
                                        <span style={{...styles.currentPrice, color: '#333'}}>
                                            BGN {Number(product.item_price).toFixed(2)}
                                        </span>
                                    )}
                                </div>
                                
                                {product.discount_percentage > 0 && ProductHasDiscount(product.discount_expires) && (
                                    <div style={styles.discountBadge}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M14.6666 0.000106812H9.12485C8.75825 0.000106812 8.24587 0.212488 7.98685 0.471314L0.389089 8.06903C-0.129696 8.58723 -0.129696 9.43684 0.389089 9.95441L6.04624 15.6114C6.56385 16.1296 7.41263 16.1296 7.93103 15.6108L15.5288 8.01423C15.7876 7.75544 16 7.24224 16 6.87642V1.3335C16 0.600298 15.3998 0.000106812 14.6666 0.000106812ZM11.9998 5.33347C11.2634 5.33347 10.6664 4.73585 10.6664 4.00008C10.6664 3.26309 11.2634 2.66669 11.9998 2.66669C12.7362 2.66669 13.3334 3.26309 13.3334 4.00008C13.3334 4.73585 12.7362 5.33347 11.9998 5.33347Z" fill="#c79100" />
                                        </svg>
                                        <span>-{product.discount_percentage}%</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const CategoryDetailsModern = withObjectData(ShowCategoryData);
export default CategoryDetailsModern;