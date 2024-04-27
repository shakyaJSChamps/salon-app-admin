import { Paper } from "@mui/material";
import { IoMdNotifications } from "react-icons/io";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import CalendarNotification from "./CalendarNotification";
import { IoWalletOutline } from "react-icons/io5";
import { formatDistanceToNow } from 'date-fns';

const ReceiveNotification = () => {

  const notifications = [
    {
      id: 1,
      receivedAmount: 1000,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      timeAgo: new Date(),
      icon:<IoWalletOutline />
    },
    {
      id: 2,
      receivedAmount: 2000,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      timeAgo: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      icon:<IoWalletOutline />
    },
    {
      id: 3,
      receivedAmount: 3000,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      timeAgo: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      icon:<IoWalletOutline />
    },
    {
      id: 4,
      receivedAmount: 4000,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      timeAgo: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      icon:<IoWalletOutline />
    },
    {
      id: 5,
      receivedAmount: 5000,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      timeAgo: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      icon:<IoWalletOutline />
    },
    {
      id: 6,
      receivedAmount: 6000,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      timeAgo: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      icon:<IoWalletOutline />
    },
  ];

  return (
     <Paper className="send-Notifi-first-paper px-3 h-100 rounded" elevation={3}>
      <div className="d-flex align-items-center pt-2">
        <IoMdNotifications />
        <p className="ps-1 fw-bold mb-0">Receive Notification</p>
        <div className="d-flex flex-grow-1 justify-content-end align-items-center me-5 ">
          <p className="ps-1 fw-bold mb-0">Today</p>
          <CalendarNotification />
        </div>
      </div>
      <hr />

      {notifications.map((notification) => (
        <div key={notification.id} className="send-notification mt-3">
          <div>
            <div className="send-notification-icon mx-2">{notification.icon}</div>
          </div>
          <div className="send-notification-content ps-2">
            <p className="ps-1 pt-3  fw-bold mb-0">Received<span><MdOutlineCurrencyRupee />{notification.receivedAmount}</span></p>
            <p className="para-section">{notification.content}</p>
          </div>
          <span className="send-span fw-bold">{formatDistanceToNow(notification.timeAgo, { addSuffix: true })}</span>
        </div>
      ))}
    </Paper>
  )
};

export default ReceiveNotification;