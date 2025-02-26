import { TUser, useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 800,
  margin: "2rem auto",
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4],
}));

const StyledAvatar = styled(Avatar)({
  width: 120,
  height: 120,
  margin: "-60px auto 0",
  border: "4px solid white",
});

const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const token = useAppSelector(useCurrentToken);
    let user;
    if (token) {
      user = verifyToken(token) as TUser;
    }

  const [emailError, setEmailError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(emailRegex.test(value) ? "" : "Invalid email address");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (emailError) return;
    setIsEditMode(false);
    // Add your save logic here (API call, etc.)
  };

  const handleCancel = () => {
    setIsEditMode(false);
    // Reset form data if needed
  };

  return (
    <StyledCard>
      <CardHeader
        title="User Profile"
        action={
          !isEditMode && (
            <IconButton onClick={() => setIsEditMode(true)}>
              <EditIcon />
            </IconButton>
          )
        }
        sx={{ bgcolor: "primary.main", color: "white" }}
      />

      <CardContent>
        <Box sx={{ position: "relative", textAlign: "center" }}>
          <StyledAvatar src={profileImage || "/default-avatar.png"} />
          {isEditMode && (
            <Button
              variant="contained"
              component="label"
              size="small"
              sx={{ mt: 1 }}
            >
              Upload Photo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>
          )}
        </Box>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            {isEditMode ? (
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={user?.name}
                onChange={handleInputChange}
                required
              />
            ) : (
              <ProfileField label="Name" value={user?.name as string} />
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            {isEditMode ? (
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={user?.email}
                onChange={handleInputChange}
                error={!!emailError}
                helperText={emailError}
                required
              />
            ) : (
              <ProfileField
                label="Email"
                value={user?.email as string}
                verified={true}
              />
            )}
          </Grid>



          <Grid item xs={12}>
            {isEditMode ? (
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Bio"
                name="bio"
                value={"Demonstration"}
                onChange={handleInputChange}
              />
            ) : (
              <ProfileField label="Bio" value={"Demonstration"} />
            )}
          </Grid>
        </Grid>

        {isEditMode && (
          <Box
            sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}
          >
            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              startIcon={<CheckCircleIcon />}
              onClick={handleSave}
              disabled={!!emailError}
            >
              Save Changes
            </Button>
          </Box>
        )}
      </CardContent>
    </StyledCard>
  );
};

const ProfileField = ({
  label,
  value,
  verified,
}: {
  label: string;
  value: string;
  verified?: boolean;
}) => (
  <Box sx={{ py: 1 }}>
    <Typography variant="subtitle2" color="textSecondary">
      {label}
    </Typography>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography variant="body1">{value}</Typography>
      {verified && <CheckCircleIcon fontSize="small" color="success" />}
    </Box>
  </Box>
);

export default Profile;
