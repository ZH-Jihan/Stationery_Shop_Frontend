import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { useUpdateProfileMutation } from "@/redux/features/user/userApi";
import { Edit } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface UserData {
  name: string;
  email: string;
  role: string;
  phone: string;
  address: string;
  city: string;
  image: string;
  status: string;
}

const UpdateProfileInfo = () => {
  const [updateProfile] = useUpdateProfileMutation();
  const { data: userData } = useGetMeQuery(undefined);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState<UserData>({
    name: "",
    email: "",
    role: "",
    phone: "",
    address: "",
    city: "",
    image: "",
    status: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  useEffect(() => {
    if (userData?.data) {
      const user = userData.data;
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        city: user.city,
        image: user.image,
        status: user.status,
      });
      // Set profile image if exists
      if (user.image) {
        setProfileImage(user.image);
      }
    }
  }, [userData]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
          setProfileImageFile(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const tostId = toast.loading("Please wait for Update...");
      const dataToSend = new FormData();

      // Append image file if exists
      if (profileImageFile) {
        dataToSend.append("file", profileImageFile);
        delete formData.image;
      }

      // Append other form data
      dataToSend.append(
        "data",
        JSON.stringify({
          ...formData,
        })
      );
      // for (const pair of dataToSend.entries()) {
      //   console.log(pair[0], pair[1]);
      // }
      const data = { email: formData.email, data: dataToSend };
      const res = await updateProfile(data).unwrap();
      if (res.statusCode === 200) {
        toast.success(res.message, { id: tostId });
        navigate(location.state?.from || `/${formData.role}/profile`, {
          replace: true,
        });
      }

      setSnackbar({
        open: true,
        message: "Profile updated successfully!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error updating profile",
        severity: "error",
      });
    }
  };

  return (
    <div>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ mb: 4, fontWeight: "bold" }}
          >
            Account Management
          </Typography>

          {/* Profile Information Section */}
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Profile Information
              </Typography>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="profile-photo"
                type="file"
                onChange={handleImageUpload}
              />
              <label htmlFor="profile-photo">
                <IconButton component="span" sx={{ position: "relative" }}>
                  <Avatar
                    src={profileImage || ""}
                    sx={{
                      width: 120,
                      height: 120,
                      bgcolor: "primary.main",
                      fontSize: "2rem",
                    }}
                  >
                    {!profileImage && "GR"}
                  </Avatar>
                  <Edit
                    sx={{
                      position: "absolute",
                      bottom: 8,
                      right: 8,
                      backgroundColor: "white",
                      borderRadius: "50%",
                      p: 0.5,
                    }}
                  />
                </IconButton>
              </label>
            </Grid>

            <Grid item xs={12} md={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Role"
                    name="role"
                    fullWidth
                    value={formData.role}
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Status"
                    fullWidth
                    name="status"
                    value={formData.status}
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Name"
                    name="name"
                    fullWidth
                    value={formData.name}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    name="email"
                    fullWidth
                    value={formData.email}
                    disabled
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Contact Information Section */}
          <Typography variant="h6" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
            Contact Info
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Contact Number"
                name="phone"
                fullWidth
                required
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="City Name"
                name="city"
                fullWidth
                value={formData.city}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Address"
                name="address"
                fullWidth
                value={formData.address}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
          </Grid>

          {/* Change Password Section */}
          {/* <Typography variant="h6" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
            Change Password
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Old Password"
                name="oldPassword"
                fullWidth
                type={showPassword ? "text" : "password"}
                value={formData.oldPassword}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="New Password"
                name="newPassword"
                fullWidth
                type={showPassword ? "text" : "password"}
                value={formData.newPassword}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid> */}

          {/* About User Section */}
          {/* <Typography variant="h6" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
            About the User
          </Typography> */}
          {/* <TextField
            label="Biographical info"
            name="bio"
            fullWidth
            multiline
            rows={4}
            value={formData.bio}
            onChange={handleChange}
            variant="outlined"
          /> */}

          {/* Submit Button */}
          <Button
            variant="contained"
            size="large"
            sx={{ mt: 4, px: 6, py: 1.5, borderRadius: 2 }}
            onClick={handleSubmit}
          >
            Update Profile
          </Button>
        </Paper>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default UpdateProfileInfo;
