import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Button, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import TvIcon from "@mui/icons-material/Tv";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import ArrowIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { ContextState } from "../Context";
import ArrayList from "../config/ArrayList";
let drawerWidth = 240;

const Sidebar = () => {
  const { active, setActive } = ContextState();
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        color: "white",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "black",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Button
        variant="contained"
        size="small"
        sx={{
          margin: "10px auto",
          borderRadius: "2px",
          fontSize: "1.6rem",
          padding: "0px 15px",
          backgroundColor: "white",
          color: "blueviolet",
          fontWeight: "900",
          marginBottom: "40px",
        }}
        endIcon={<PlayArrowIcon sx={{ fontSize: "30px !important" }} />}
      >
        ERP
      </Button>
      <Typography
        sx={{
          color: "pink",
          display: "inherit",
          marginLeft: "8px",
          fontSize: "0.8rem",
          textTransform: "uppercase",
        }}
      >
        Dashboard
      </Typography>
      <ListItem
        sx={{
          color: "white",
          paddingTop: "0px",
          paddingBottom: "0px",
          mb: "10px",
        }}
      >
        <ListItemButton sx={{ paddingLeft: 0 }}>
          <ListItemIcon sx={{ color: "whitesmoke" }}>
            <TvIcon />
          </ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItemButton>
      </ListItem>
      <Typography
        sx={{
          color: "pink",
          display: "inherit",
          marginLeft: "8px",
          fontSize: "0.8rem",
          textTransform: "uppercase",
        }}
      >
        Applications
      </Typography>
      <List sx={{ color: "white" }}>
        {ArrayList.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              sx={{ paddingTop: 0, paddingBottom: 0 }}
              onClick={() => setActive(index)}
            >
              <ListItemIcon
                sx={{ color: index === active ? "violet" : "whitesmoke" }}
              >
                <ViewInArIcon />
              </ListItemIcon>
              <ListItemText
                primary={text}
                sx={{ color: index === active ? "violet" : "whitesmoke" }}
              />
              {(index === 0 || index === 4 || index === 7) && (
                <ListItemIcon sx={{ color: "whitesmoke" }}>
                  <ArrowIcon sx={{ fontSize: "10px", marginLeft: "25px" }} />
                </ListItemIcon>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
export default Sidebar;
