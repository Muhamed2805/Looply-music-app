import React, { useState, useEffect } from "react";
import styles from "./EditProfile.module.css";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt, FaRegEnvelope, FaLastfm } from "react-icons/fa";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    lastfm_username: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [settings, setSettings] = useState({
    publicProfile: true,
    showActivity: true,
    emailNotifications: false,
  });

  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get("/users/me");
      setFormData((prev) => ({
        ...prev,
        username: res.data.username || "",
        email: res.data.email || "",
        lastfm_username: res.data.lastfm_username || "",
      }));
      setProfileImageUrl(res.data.profile_image || "");
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggle = (name) => {
    setSettings((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setMessage("New password and confirmation do not match.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("lastfm_username", formData.lastfm_username);

      if (formData.currentPassword && formData.newPassword) {
        formDataToSend.append("oldPassword", formData.currentPassword);
        formDataToSend.append("newPassword", formData.newPassword);
      }

      if (profileImage) {
        formDataToSend.append("profileImage", profileImage);
      }

      const res = await axiosInstance.put("/users/me", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(res.data.message || "Profile updated successfully.");

      await fetchUser();

      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setProfileImage(null);
    } catch (err) {
      const errorMsg = err.response?.data?.error || "An error occurred.";
      setMessage(errorMsg);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div className={`${styles.card} ${styles.fullWidthCard}`}>
            <h4>Profile Preview</h4>
            <div className={styles.preview}>
              <div className={styles.avatar}>
                {profileImage ? (
                  <img src={URL.createObjectURL(profileImage)} alt="Avatar Preview" />
                ) : profileImageUrl ? (
                  <img src={profileImageUrl} alt="Avatar" />
                ) : (
                  <span>{formData.username?.charAt(0)?.toUpperCase()}</span>
                )}
              </div>
              <div className={styles.profileInfo}>
                <h3>{formData.username ? formData.username : "Loading..."}</h3>
                {formData.username && <p>@{formData.username}</p>}
                {formData.email && <p>{formData.email}</p>}
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <h4>Basic Information</h4>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="username">Username</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>@</span>
                <input
                  id="username"
                  className={`${styles.formInput} ${styles.formInputWithIcon}`}
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="email">Email Address</label>
              <div className={styles.inputWrapper}>
                <FaRegEnvelope className={styles.inputIcon} />
                <input
                  id="email"
                  className={`${styles.formInput} ${styles.formInputWithIcon}`}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="lastfm_username">Last.fm Username</label>
              <div className={styles.inputWrapper}>
                <FaLastfm className={styles.inputIcon} />
                <input
                  id="lastfm_username"
                  className={`${styles.formInput} ${styles.formInputWithIcon}`}
                  type="text"
                  name="lastfm_username"
                  value={formData.lastfm_username}
                  onChange={handleChange}
                />
              </div>
              <p className={styles.helperText}>
                Connect your Last.fm account to sync your listening history.
              </p>
            </div>
          </div>

          <div className={styles.card}>
            <h4>Password Settings</h4>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="currentPassword">Current Password</label>
              <input
                id="currentPassword"
                className={styles.formInput}
                type="password"
                name="currentPassword"
                placeholder="Enter your current password"
                value={formData.currentPassword}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="newPassword">New Password</label>
              <input
                id="newPassword"
                className={styles.formInput}
                type="password"
                name="newPassword"
                placeholder="Enter your new password"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="confirmPassword">Confirm New Password</label>
              <input
                id="confirmPassword"
                className={styles.formInput}
                type="password"
                name="confirmPassword"
                placeholder="Confirm your new password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.card}>
            <h4>Profile Image</h4>
            <label htmlFor="file-upload" className={styles.uploadBox}>
              <FaCloudUploadAlt className={styles.uploadIcon} />
              <p>Click to upload or drag and drop</p>
              <small>JPG, PNG or GIF (max 5MB)</small>
            </label>
            <input
              id="file-upload"
              className={styles.hiddenInput}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className={styles.card}>
            <h4>Account Settings</h4>
            {[
              { key: "publicProfile", label: "Public Profile", description: "Allow others to view your profile" },
              { key: "showActivity", label: "Show Listening Activity", description: "Display your recently played songs" },
              { key: "emailNotifications", label: "Email Notifications", description: "Receive updates about new features" },
            ].map((item) => (
              <div className={styles.toggleContainer} key={item.key}>
                <div className={styles.toggleInfo}>
                  <span className={styles.toggleLabel}>{item.label}</span>
                  <span className={styles.toggleDescription}>{item.description}</span>
                </div>
                <label className={styles.toggleSwitch}>
                  <input
                    type="checkbox"
                    checked={settings[item.key]}
                    onChange={() => handleToggle(item.key)}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
            ))}
          </div>

          <div className={`${styles.danger} ${styles.fullWidthCard}`}>
            <h4>Danger Zone</h4>
            <p>This action cannot be undone. All your data will be permanently deleted.</p>
            <button
            type="button"
            className={styles.deleteBtn}
            onClick={async () => {
              if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                try {
                  await axiosInstance.delete("/users/me");
                  localStorage.removeItem("token");
                  window.location.href = "/";
                } catch (err) {
                  alert("An error occurred while deleting the account.");
                }
              }
            }}
>
  Delete Account
</button>
          </div>
        </div>

        {message && <p className={styles.message}>{message}</p>}

        <div className={styles.actions}>
          <button type="button" className={styles.cancelBtn} onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" className={styles.saveBtn}>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
