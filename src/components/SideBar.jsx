import  React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
function SideBar() {
  const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    };
    
    const handleClick = (index) => {
        setOpen(false)
        if (index == 0) {
          navigate("/upload-post")
        } else if (index == 1) {
            navigate("/my-posts");
        } else {
            authService.logout().then(() => {
              dispatch(logout());
              navigate('/')
              navigate(0)
            });
      }
  }

  

  return (
    <div>
      <React.Fragment>
        <Button
          className="p-1 hover:bg-gray-200 hover:rounded-full"
          onClick={toggleDrawer(true)}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            className=" text-slate-600 size-10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              strokeLinecap="round"
              strokemterlimit="10"
              strokeWidth="48"
              d="M88 152h336M88 256h336M88 360h336"
            ></path>
          </svg>
        </Button>
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
          <List>
            {["Add Swap", "My Swaps", "Log out"].map((text, index) => (
              <ListItem key={text} disablePadding>
                    <ListItemButton onClick={() => { toggleDrawer(false); handleClick(index)}}>
                  <ListItemIcon>
                    {index == 0 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        strokeWidth={10}
                        fill="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                        className="size-8   "
                      >
                        <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z"></path>
                      </svg>
                    )}
                    {index == 1 && (
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                        className="size-7 "
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M4 3H17L20.7071 6.70711C20.8946 6.89464 21 7.149 21 7.41421V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM12 18C13.6569 18 15 16.6569 15 15C15 13.3431 13.6569 12 12 12C10.3431 12 9 13.3431 9 15C9 16.6569 10.3431 18 12 18ZM5 5V9H15V5H5Z"></path>
                      </svg>
                    )}
                    {index == 2 && (
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        className="size-10 "
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M160 240h160V96a16 16 0 0 0-16-16H64a16 16 0 0 0-16 16v320a16 16 0 0 0 16 16h240a16 16 0 0 0 16-16V272H160zm299.31 4.69L368 153.37 345.37 176l64 64H320v32h89.37l-64 64L368 358.63l91.31-91.32a16 16 0 0 0 0-22.62z"></path>
                      </svg>
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default SideBar;
