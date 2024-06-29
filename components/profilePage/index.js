import React, { useState, useCallback } from 'react';
import styles from '@/styles/profile.module.css';
import { Button, Modal, Stack, Slider } from '@mui/material';
import Cropper from 'react-easy-crop';

import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import SettingsIcon from '@mui/icons-material/Settings';

// Utility function to create the cropped image
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = url;
  });

const getCroppedImg = async (imageSrc, crop) => {
  const image = await createImage(URL.createObjectURL(imageSrc));
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const pixelRatio = window.devicePixelRatio;
  canvas.width = crop.width * pixelRatio;
  canvas.height = crop.height * pixelRatio;

  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Canvas is empty'));
        return;
      }
      blob.name = imageSrc.name;
      resolve(URL.createObjectURL(blob));
    }, 'image/jpeg');
  });
};

function ProfilePage({ setActivePage }) {
  const [profilePic, setProfilePic] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('employee'); // Default role set to 'employee'
  const [onboardingDate, setOnboardingDate] = useState('');
  const [currentStatus, setCurrentStatus] = useState(0); // Default status value
  const [toggleCheckboxes, setToggleCheckboxes] = useState({
    officeTour: false,
    managementIntro: false,
    workTools: false,
    meetColleagues: false,
    activityTracking: false,
    reqHandling: false,
    dutiesJournal: false
  });
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(4 / 3); // Aspect ratio for cropping
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    setProfilePic(file);
    setCropModalOpen(true); // Open cropping modal
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropComplete = async () => {
    try {
      const croppedImage = await getCroppedImg(profilePic, croppedAreaPixels);
      setCroppedImage(croppedImage);
      setCropModalOpen(false); // Close cropping modal after crop
    } catch (e) {
      console.error('Error cropping image:', e);
    }
  };

  const handleCropCancel = () => {
    setProfilePic(null); // Reset selected image if crop is canceled
    setCropModalOpen(false); // Close cropping modal
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', {
      firstName,
      lastName,
      email,
      phone,
      role,
      onboardingDate,
      currentStatus,
      toggleCheckboxes,
      croppedImage // Include cropped image in form submission
    });
    // Optionally, you can reset state or navigate to another page
  };

  return (
    <div className={styles.profile_container}>
      <div className={styles.top_container}>
        <button onClick={() => setActivePage('themes')}>Back to Themes</button>
      </div>

      <div className={styles.bottom_container}>
        <div className={styles.side_bar}>
          {/* Display small logos */}
          <div>
            <img
              alt="Logo"
              src="https://static.vecteezy.com/system/resources/thumbnails/004/702/848/small/abstract-letter-hr-logo-isolated-on-white-background-vector.jpg"
            />
          </div>
          <SupervisorAccountIcon />
          <SpeakerNotesIcon />
          <SettingsIcon />
        </div>

        <div className={styles.main_profile_container}>
          {/* Top Container */}

          <div className={styles.info_section}>
            <div className={styles.info}>
            {firstName && <p>{firstName}</p>}
            {croppedImage && (
                <div className={styles.profile_pic_top}>
                <img src={croppedImage} alt="Profile" />
                </div>
            )}
            </div>
            <div className={styles.bottom_container}>
                <button>Save</button>
            </div>
        </div>


          {/* Main Container with Three Columns */}
          <div className={styles.main_container}>
            {/* First Column: Profile Picture and Input Fields */}
            <div className={`${styles.column}`}>
              <div className={styles.profile_details}>
                <h2>Profile Picture</h2>
                <input type="file" onChange={handleProfilePicChange} />
                {/* Modal for cropping */}
                {profilePic &&
                    <Modal open={cropModalOpen} onClose={handleCropCancel}>
                    <div className={styles.crop_modal}>
                      <Cropper
                        image={URL.createObjectURL(profilePic)} // Use URL.createObjectURL to display the selected image
                        crop={crop}
                        zoom={zoom}
                        aspect={aspect}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                      />
                      <Stack spacing={2} direction="row">
                        <Slider
                          value={zoom}
                          min={1}
                          max={3}
                          step={0.1}
                          aria-labelledby="Zoom"
                          sx={{ width: 200 }}
                          onChange={(e, zoom) => setZoom(zoom)}
                        />
                      </Stack>
                      <Button onClick={handleCropCancel}>Cancel</Button>
                      <Button onClick={handleCropComplete}>Crop</Button>
                    </div>
                  </Modal>
                }
                {/* Display cropped image */}
                {croppedImage && (
                  <div className={styles.profile_pic}>
                    <img src={croppedImage} alt="Profile" />
                  </div>
                )}

                <h2>User Details</h2>

                <input
                  className={styles.input_field}
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  className={styles.input_field}
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <input
                  className={styles.input_field}
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className={styles.input_field}
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {/* Second Column: Role and Employee Details */}
            <div className={`${styles.column}`}>
              <div className={styles.role}>
                <h2>Role</h2>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={styles.input_field}
                >
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                </select>
              </div>

              <div className={styles.team_details}>
                <h2>Team Details</h2>
                <p>HR - John Doe</p>
                {/* Add more team details as needed */}
              </div>
            </div>

            {/* Third Column: Onboarding and Checkboxes */}
            <div className={`${styles.column}`}>
              <div className={styles.onboarding}>
                <h2>Onboarding</h2>
                <input
                  className={styles.input_field}
                  type="date"
                  value={onboardingDate}
                  onChange={(e) => setOnboardingDate(e.target.value)}
                />
                <input
                  className={styles.input_field}
                  type="range"
                  min="0"
                  max="100"
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value)}
                />
                <button onClick={() => console.log('View Answers')}>View Answers</button>
              </div>

              <div className={styles.checkboxes}>
                <h2>Checkboxes</h2>
                {Object.entries(toggleCheckboxes).map(([key, value]) => (
                  <label key={key}>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() =>
                        setToggleCheckboxes((prev) => ({
                          ...prev,
                          [key]: !prev[key],
                        }))
                      }
                    />
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
                      return str.toUpperCase();
                    })}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
