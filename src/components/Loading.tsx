import { Box, Grid, keyframes, styled } from "@mui/material";
import { ReactElement } from "react";

// Enhanced Shimmer Animation
const shimmerAnimation = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const ShimmerBox = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[800]
      : theme.palette.grey[300],
  borderRadius: theme.shape.borderRadius,
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(
      90deg,
      transparent,
      ${
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,0.1)"
          : "rgba(255,255,255,0.4)"
      },
      transparent
    )`,
    animation: `${shimmerAnimation} 1.5s infinite`,
  },
}));

// Enhanced Shimmer Component
const LoadingShimmer = ({
  height = 200,
  width = "100%",
  variant = "rect",
}: {
  height?: number | string;
  width?: number | string;
  variant?: "rect" | "circle";
}) => (
  <ShimmerBox
    sx={{
      width,
      height,
      borderRadius: variant === "circle" ? "50%" : 2,
      boxShadow: 1,
      ...(variant === "rect" && {
        border: "1px solid",
        borderColor: "divider",
      }),
    }}
  />
);

// Enhanced Grid Loader
const LoadingGrid = () => {
  return (
    <Grid container spacing={3}>
      {[1, 2, 3].map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item}>
          <Box
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              p: 2,
              backgroundColor: "background.paper",
              boxShadow: 1,
            }}
          >
            <LoadingShimmer height={200} width="100%" />
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <LoadingShimmer height={20} width="80%" />
              <LoadingShimmer height={20} width="60%" />
              <LoadingShimmer height={20} width="70%" />
            </Box>
            <Box
              sx={{
                mt: 2,
                display: "flex",
                gap: 2,
                "& > *": { flex: 1 },
              }}
            >
              <LoadingShimmer height={40} variant="rect" />
              <LoadingShimmer height={40} variant="rect" />
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

// Enhanced Shimmer Variant
const EnhancedShimmer = () => (
  <Box
    sx={{
      maxWidth: 800,
      margin: "0 auto",
      p: 3,
      border: "1px solid",
      borderColor: "divider",
      borderRadius: 2,
      backgroundColor: "background.paper",
    }}
  >
    <LoadingShimmer height={300} />
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      <LoadingShimmer height={40} width={120} />
      <LoadingShimmer height={40} width={120} />
    </Box>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {[1, 2, 3].map((item) => (
        <LoadingShimmer key={item} height={20} width={`${80 - item * 10}%`} />
      ))}
    </Box>
  </Box>
);

// Main Component
interface LoadingComponentProps {
  variant?: "shimmer" | "grid";
}

const Loading = ({
  variant = "shimmer",
}: LoadingComponentProps): ReactElement => {
  return variant === "grid" ? <LoadingGrid /> : <EnhancedShimmer />;
};

export default Loading;
