import { Link } from 'react-router-dom';
import withobjectData from '../../../HOC/withObjectInfo';
import LoadingAnimation from '../../Animations/Loading';
import { TimeBetween } from '../../../utils/DateUtils';
import ShowAppMenu from '../../AppMenus/defaultMenu';
import { useEffect } from 'react';
import { do_action } from '../../../services/userServices';

const ShowAnnounces = ({ objectData }) => {
    useEffect(() => {
        if (objectData?.objectAnnounces) {
            do_action("view_announces", { announces: objectData.objectAnnounces });
        }
    }, [objectData?.objectAnnounces]);

    if (!objectData) {
        return <LoadingAnimation />;
    }

    // Стилове за JSX
    const styles = {
        container: {
            maxWidth: '800px',
            margin: '0 auto',
            padding: '20px'
        },
        header: {
            position: 'sticky',
            top: 0,
            zIndex: 10,
            background: '#fff',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            padding: '15px 0'
        },
        headerContent: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 20px'
        },
        backButton: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#f5f5f5',
            marginRight: '15px'
        },
        title: {
            margin: 0,
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#333'
        },
        searchBox: {
            margin: '20px 0',
            position: 'relative'
        },
        searchInput: {
            width: '100%',
            padding: '12px 20px 12px 45px',
            borderRadius: '25px',
            border: '1px solid #e0e0e0',
            fontSize: '1rem',
            outline: 'none',
            transition: 'all 0.3s',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
        },
        searchIcon: {
            position: 'absolute',
            left: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#7D8FAB'
        },
        newsList: {
            listStyle: 'none',
            padding: 0,
            margin: 0
        },
        newsItem: {
            marginBottom: '25px',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease'
        },
        newsLink: {
            display: 'flex',
            textDecoration: 'none',
            color: 'inherit'
        },
        newsImage: {
            width: '120px',
            height: '120px',
            objectFit: 'cover',
            borderRadius: '12px 0 0 12px'
        },
        newsContent: {
            flex: 1,
            padding: '15px',
            background: '#fff'
        },
        newsTitle: {
            margin: '0 0 8px 0',
            fontSize: '1.1rem',
            fontWeight: 600,
            color: '#333'
        },
        newsExcerpt: {
            margin: '0 0 10px 0',
            fontSize: '0.9rem',
            color: '#666',
            lineHeight: '1.4',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
        },
        newsMeta: {
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.8rem',
            color: '#888'
        },
        metaSeparator: {
            width: '4px',
            height: '4px',
            background: '#888',
            borderRadius: '50%',
            margin: '0 8px'
        },
        emptyState: {
            textAlign: 'center',
            padding: '40px 0',
            color: '#888'
        }
    };

    return (
        <div style={{ background: '#f9f9f9', minHeight: '100vh' }}>
            <header style={styles.header}>
                <div style={styles.headerContent}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Link to="/" style={styles.backButton}>
                            <svg height="24" viewBox="0 0 486.65 486.65" width="24">
                                <path d="m202.114 444.648c-8.01-.114-15.65-3.388-21.257-9.11l-171.875-171.572c-11.907-11.81-11.986-31.037-.176-42.945.058-.059.117-.118.176-.176l171.876-171.571c12.738-10.909 31.908-9.426 42.817 3.313 9.736 11.369 9.736 28.136 0 39.504l-150.315 150.315 151.833 150.315c11.774 11.844 11.774 30.973 0 42.817-6.045 6.184-14.439 9.498-23.079 9.11z" />
                                <path d="m456.283 272.773h-425.133c-16.771 0-30.367-13.596-30.367-30.367s13.596-30.367 30.367-30.367h425.133c16.771 0 30.367 13.596 30.367 30.367s-13.596 30.367-30.367 30.367z" />
                            </svg>
                        </Link>
                        <h1 style={styles.title}>Новини</h1>
                    </div>
                </div>
            </header>

            <main style={styles.container}>
                <div style={styles.searchBox}>
                    <input 
                        type="search" 
                        placeholder="Търсене в новини..." 
                        style={styles.searchInput}
                    />
                    <div style={styles.searchIcon}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M10.9395 1.9313C5.98074 1.9313 1.94141 5.97063 1.94141 10.9294C1.94141 15.8881 5.98074 19.9353 10.9395 19.9353C13.0575 19.9353 15.0054 19.193 16.5449 17.9606L20.293 21.7067C20.4821 21.888 20.7347 21.988 20.9967 21.9854C21.2587 21.9827 21.5093 21.8775 21.6947 21.6924C21.8801 21.5073 21.9856 21.2569 21.9886 20.9949C21.9917 20.7329 21.892 20.4802 21.7109 20.2908L17.9629 16.5427C19.1963 15.0008 19.9395 13.0498 19.9395 10.9294C19.9395 5.97063 15.8982 1.9313 10.9395 1.9313ZM10.9395 3.93134C14.8173 3.93134 17.9375 7.05153 17.9375 10.9294C17.9375 14.8072 14.8173 17.9352 10.9395 17.9352C7.06162 17.9352 3.94141 14.8072 3.94141 10.9294C3.94141 7.05153 7.06162 3.93134 10.9395 3.93134Z" fill="currentColor" />
                        </svg>
                    </div>
                </div>

                {objectData.objectAnnounces?.length > 0 ? (
                    <ul style={styles.newsList}>
                        {objectData.objectAnnounces.map((announce, index) => (
                            <li key={index} style={styles.newsItem}>
                                <Link 
                                    to={`/announces/${announce.entry_id}`} 
                                    style={styles.newsLink}
                                    onMouseEnter={e => e.currentTarget.parentElement.style.transform = 'translateY(-3px)'}
                                    onMouseLeave={e => e.currentTarget.parentElement.style.transform = ''}
                                >
                                    <img 
                                        src={`https://v-menu.eu/uploads/${announce?.entry_image}`} 
                                        alt={announce?.entry_headline} 
                                        style={styles.newsImage}
                                    />
                                    <div style={styles.newsContent}>
                                        <h3 style={styles.newsTitle}>{announce?.entry_headline}</h3>
                                        <p style={styles.newsExcerpt}>{announce?.entry_thumbnail_text}</p>
                                        <div style={styles.newsMeta}>
                                            <span>{TimeBetween(announce?.['createdAt'], new Date())}</span>
                                            <span style={styles.metaSeparator}></span>
                                            <span>Качено от {announce?.announced_by.first_name}</span>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div style={styles.emptyState}>
                        <p>Няма налични новини в момента</p>
                    </div>
                )}
            </main>

            <ShowAppMenu />
        </div>
    );
};

const Announces = withobjectData(ShowAnnounces);
export default Announces;