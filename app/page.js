'use client'
import React, { useEffect, useState } from 'react';
import styles from '@/styles/app.module.css';
import '@/styles/global.css';

import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import ContrastIcon from '@mui/icons-material/Contrast';
import SettingsIcon from '@mui/icons-material/Settings';
import ThemePage from '@/components/themePage';
import ProfilePage from '@/components/profilePage';
import AnalyticPage from '@/components/analyticPage';
import OtherPage from '@/components/otherPage';

function App() {
    const [foreground, setForeground] = useState(() => {
        return document.documentElement.style.getPropertyValue('--foreground-color');
    });

    const [activePage, setActivePage] = useState('home');

    useEffect(() => {
        const root = document.documentElement;
        const observer = new MutationObserver(() => {
          const newColor = root.style.getPropertyValue('--foreground-color');
          setForeground(newColor);
        });
    
        observer.observe(root, { attributes: true, attributeFilter: ['style'] });
    
        return () => observer.disconnect();
      }, []);

    // Conditional rendering for the ProfilePage
    if (activePage === 'profile') {
        return <ProfilePage setActivePage={setActivePage} />;
    }

    // Default rendering for other pages
    return (
        <div className={styles.app_container}>
            {
                (activePage !== 'profile' && activePage !== 'analytics') && 
                <div className={`${styles.left_container} ${foreground === '#FFFFFF' ? styles.dark_background : ''}`}>
                    <div className={styles.logo}>
                        Logo Here
                    </div>

                    <div className={styles.menu}>
                        <span className={styles.menu_span}>Menu</span>
                        <ul>
                            <li onClick={() => setActivePage('home')}><SpaceDashboardIcon /> Home</li>
                            <li onClick={() => setActivePage('schedule')}><CalendarTodayIcon /> Schedule</li>
                            <li onClick={() => setActivePage('recommendation')}><AssignmentIcon /> Recommendation</li>
                            <li onClick={() => setActivePage('analytics')}><AnalyticsIcon /> Analytics</li>
                            <li onClick={() => setActivePage('profile')}><PersonIcon /> Profile</li>
                            <li onClick={() => setActivePage('inbox')}><MailIcon /> Inbox</li>
                            <li onClick={() => setActivePage('themes')}><ContrastIcon /> Themes</li>
                        </ul>

                        <span className={styles.account_span}>Account</span>

                        <ul>
                            <li onClick={() => setActivePage('settings')}><SettingsIcon /> Settings</li>
                        </ul>
                    </div>
                </div>
            }

            <div className={styles.right_container}>
                {activePage === 'analytics' && <AnalyticPage />}
                {activePage === 'themes' && <ThemePage />}
                {(activePage !== 'profile' && activePage !== 'analytics' && activePage !== 'themes') && (
                    <OtherPage name={activePage} />
                )}
            </div>
        </div>
    );
}

export default App;
