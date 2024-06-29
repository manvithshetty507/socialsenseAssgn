import React, { useEffect, useState } from 'react'
import styles from '@/styles/theme.module.css';
import { useScrollTrigger } from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';

function ThemePage() {

    const [foreground, setForeground] = useState('');

    useEffect(() => {
        const root = document.documentElement;
        const color = root.style.getPropertyValue('--foreground-color');
        setForeground(color);
    }, []);


    const [name, setName] = useState('Kushagra singh');

    const setTheme = (type, value) => {
        if (type === 'solid') {
            document.documentElement.style.setProperty('--background-solid-color', value);
            document.documentElement.style.setProperty('--background-type', value);
        } else if (type === 'linear') {
            document.documentElement.style.setProperty('--linear-grad', value);
            document.documentElement.style.setProperty('--background-type', value);
        } else if (type === 'radial') {
            document.documentElement.style.setProperty('--radial-grad', value);
            document.documentElement.style.setProperty('--background-type', value);
        } else if (type === 'foreground') {
            document.documentElement.style.setProperty('--foreground-color', value);
            setForeground(value);
        }
    };
    

  return (
    <>
        <div className={styles.name_container}>
            {name}
            <img className={styles.image_container} src='https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'/>
        </div>

        <div className={styles.button_container}>
            <h3>Theme</h3>
            <div className={styles.custom_container}>
                <p>Apply a skin to your profile</p>
                <div className={styles.button_group}>
                    <button className={styles.custom_button}> + Custom</button>
                    <button className={styles.save_button}>Save</button>
                </div>
            </div>
        </div>

        <div className={styles.body_conatiner}>

        <div className={styles.theme_container}>
            <div className={styles.option_group}>
                <p>Solid Colors:</p>
                <div className={styles.color_options}>
                    <div className={styles.theme_option} style={{ backgroundColor: '#FF5733' }} onClick={() => setTheme('solid', '#FF5733')}></div>
                    <div className={styles.theme_option} style={{ backgroundColor: '#33FF57' }} onClick={() => setTheme('solid', '#33FF57')}></div>
                    <div className={styles.theme_option} style={{ backgroundColor: '#FFFFFF' }} onClick={() => setTheme('solid', '#FFFFFF')}></div>
                    <div className={styles.theme_option} style={{ backgroundColor: '#FFFF33' }} onClick={() => setTheme('solid', '#FFFF33')}></div>
                    <div className={styles.theme_option} style={{ backgroundColor: '#33FFFF' }} onClick={() => setTheme('solid', '#33FFFF')}></div>
                    <div className={styles.theme_option} style={{ backgroundColor: '#FF33FF' }} onClick={() => setTheme('solid', '#FF33FF')}></div>
                    <div className={styles.theme_option} style={{ backgroundColor: '#333333' }} onClick={() => setTheme('solid', '#333333')}></div>
                </div>
            </div>

            <div className={styles.option_group}>
                <p>Linear Gradients:</p>
                <div className={styles.gradient_options}>
                    <div className={styles.theme_option} style={{ backgroundImage: 'linear-gradient(to right, #FF5733, #33FF57)' }} onClick={() => setTheme('linear', 'linear-gradient(to right, #FF5733, #33FF57)')}></div>
                    <div className={styles.theme_option} style={{ backgroundImage: 'linear-gradient(to right, #5733FF, #FFFF33)' }} onClick={() => setTheme('linear', 'linear-gradient(to right, #5733FF, #FFFF33)')}></div>
                    <div className={styles.theme_option} style={{ backgroundImage: 'linear-gradient(to right, #33FFFF, #FF33FF)' }} onClick={() => setTheme('linear', 'linear-gradient(to right, #33FFFF, #FF33FF)')}></div>
                </div>
            </div>

            <div className={styles.option_group}>
                <p>Radial Gradients:</p>
                <div className={styles.gradient_options}>
                    <div className={styles.theme_option} style={{ backgroundImage: 'radial-gradient(circle, #FF5733, #33FF57)' }} onClick={() => setTheme('radial', 'radial-gradient(circle, #FF5733, #33FF57)')}></div>
                    <div className={styles.theme_option} style={{ backgroundImage: 'radial-gradient(circle, #5733FF, #FFFF33)' }} onClick={() => setTheme('radial', 'radial-gradient(circle, #5733FF, #FFFF33)')}></div>
                    <div className={styles.theme_option} style={{ backgroundImage: 'radial-gradient(circle, #33FFFF, #FF33FF)' }} onClick={() => setTheme('radial', 'radial-gradient(circle, #33FFFF, #FF33FF)')}></div>
                </div>
            </div>

            <div className={styles.option_group}>
                <p>Foreground Color:</p>
                <div className={styles.color_options}>
                    <div className={styles.theme_option} style={{ backgroundColor: '#FFFFFF' }} onClick={() => setTheme('foreground', '#FFFFFF')}></div>
                    <div className={styles.theme_option} style={{ backgroundColor: '#000000' }} onClick={() => setTheme('foreground', '#000000')}></div>
                </div>
            </div>
        </div>

        <div className={styles.profile_container}>
            <div className={styles.header}>
                <div className={styles.profile_pic_container}>
                    <img className={styles.profile_pic} src="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg" alt="Profile Pic" />
                </div>
                <div className={styles.background_image}></div>
            </div>
            <div className={`${styles.profile_info} ${foreground === '#FFFFFF' ? styles.dark_background : ''}`}>
                <div className={styles.details}>
                    <h1 className={styles.name}>Kushagra Singh</h1>
                    <p className={styles.job_title}>Software Engineer</p>
                    <p className={styles.location_paar}><LocationOnIcon /> <span>Address</span></p>
                    <p className={styles.description}>
                        Experienced Software Engineer with a demonstrated history of working in the information technology and services industry. Skilled in various technologies and frameworks.
                    </p>
                </div>
            </div>
        </div>

        </div>
    </>
  )
}

export default ThemePage