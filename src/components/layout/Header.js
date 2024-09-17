//** BEST of march 24 8:43pm  */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "../../actions/userActions";
import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Icon,
  Image,
  MenuGroup,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { FiHome, FiBell, FiLogOut, FiChevronDown } from "react-icons/fi";
import { FaShoppingCart, FaRegAddressBook, FaMotorcycle, FaRegListAlt } from "react-icons/fa";
import { CgProfile, CgShoppingCart } from "react-icons/cg";
import { RiDashboardLine } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { AiFillSchedule } from "react-icons/ai";
import { FaScrewdriverWrench } from "react-icons/fa6";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { FaBoxOpen } from "react-icons/fa";
import { updateNotifs } from "../../actions/userActions";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.authUser);
  const { cartItems } = useSelector((state) => state.cart);
  const { alllistorders } = useSelector((state) => state.allOrders);
  const [newOrders, setNewOrders] = useState([]); // State for new orders
  const [showModal, setShowModal] = useState(false); // State for showing/hiding modal
  const [showModalNotif, setShowModalNotif] = useState(false); // State for showing/hiding modal
  const [clickedNotifications, setClickedNotifications] = useState([]);
  const { unreadNotifications } = useSelector((state) => state.allNotifications);
  const [clickedUnreadNotifications, setClickedUnreadNotifications] = useState([]);

  useEffect(() => {

    if (alllistorders) {
      const today = new Date();
      const todayOrders = alllistorders.filter((order) => {
        const orderDate = new Date(order.dateOrdered);
        return (
          orderDate.getDate() === today.getDate() &&
          orderDate.getMonth() === today.getMonth() &&
          orderDate.getFullYear() === today.getFullYear()
        );
      });

      const todayClickedNotifications = clickedNotifications.filter(orderId => {
        return todayOrders.some(order => order._id === orderId);
      });
      setNewOrders(todayOrders);
      setClickedNotifications(todayClickedNotifications);
    }
  }, [alllistorders, clickedNotifications]);

  useEffect(() => {

    const clickedNotificationsFromStorage = localStorage.getItem("saveNotif");
    if (clickedNotificationsFromStorage) {
      const parsedClickedNotifications = JSON.parse(clickedNotificationsFromStorage);
      const todayClickedNotifications = parsedClickedNotifications.filter(orderId => {
        return newOrders.some(order => order._id === orderId);
      });
      setClickedNotifications(todayClickedNotifications);
    }
  }, [newOrders]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModalNotif = () => {
    setShowModalNotif(false);
  };

  const handleShowModalNotif = () => {
    setShowModalNotif(true);
  };

  const LogoutHandler = () => {
    dispatch(Logout());
    navigate("/");
  };

  const ProfileHandler = () => {
    navigate("/profile");
  };

  const myOrderHandler = () => {
    navigate("/orders/me");
  };

  const DashboardHandler = () => {
    navigate("/dashboard");
  };

  const CartHandler = () => {
    navigate("/cart");
  };

  const secretaryHandler = () => {
    navigate("/secretary/orders");
  };

  const mechanicHandler = () => {
    navigate("/mechanics/task");
  };

  const myMotorHandler = () => {
    navigate("/my-motorcycles");
  };

  const myFuelHandler = () => {
    navigate("/my-fuels");
  };

  const myAddressesHandler = () => {
    navigate("/my-addresses");
  };

  const myAppointmentHandler = () => {
    navigate("/appointment/list");
  };
  const listsecappointmentsHandler = () => {
    navigate("/secretary/appointment/list");
  };

  const handleNotificationClick = (orderId) => {
    // Update state
    setClickedNotifications([...clickedNotifications, orderId]);
    // Update local storage
    localStorage.setItem(
      "saveNotif",
      JSON.stringify([...clickedNotifications, orderId])
    );
  };

  const isNotificationClicked = (orderId) => {
    // Check if orderId exists in clickedNotifications state
    return clickedNotifications.includes(orderId);
  };

  const notificationCardStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    marginBottom: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const notificationContentStyle = {
    display: "flex",
    alignItems: "center",
  };

  const notificationTextContainer = {
    marginLeft: "10px",
  };

  const notificationText = {
    fontWeight: "bold",
    fontSize: "1rem",
    marginBottom: "5px",
    color: "#333",
  };

  const dateOrderedStyle = {
    color: "#666",
    fontSize: "0.8rem",
    opacity: 0.8, // Default opacity
  };

  const formatElapsedTime = (dateOrdered) => {
    const currentTime = new Date();
    const orderTime = new Date(dateOrdered);
    const timeDifference = Math.abs(currentTime - orderTime);

    const minuteInMilliseconds = 60 * 1000;
    const hourInMilliseconds = 60 * minuteInMilliseconds;

    if (timeDifference < minuteInMilliseconds) {
      return "Just now";
    } else if (timeDifference < hourInMilliseconds) {
      const minutes = Math.floor(timeDifference / minuteInMilliseconds);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else {
      const hours = Math.floor(timeDifference / hourInMilliseconds);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    }
  };

  const handleUnreadNotificationClick = (notificationId) => {
    dispatch(updateNotifs(notificationId))
    // Update state with the clicked notification ID
    setClickedUnreadNotifications([...clickedUnreadNotifications, notificationId]);
    // Update local storage
    localStorage.setItem(
      "clickedUnreadNotifications",
      JSON.stringify([...clickedUnreadNotifications, notificationId])
    );
  };

  // Function to check if a notification is clicked
  const isUnreadNotificationClicked = (notificationId) => {
    return clickedUnreadNotifications.includes(notificationId);
  };

  return (
    <Box className="flex bg-white shadow-sm sm:px-20 px-5">
      {/* Header content */}
      <div className="flex flex-1 items-center">
        {/* Menu button for mobile */}
        <div className="md:hidden">
          <Menu>
            <MenuButton as={Button} colorScheme="red">
              <Bars3Icon className="block h-6 w-6" color="#fecaca" />
            </MenuButton>
            <MenuList>
              <Link to="/" className="text-black">
                <MenuItem>Home</MenuItem>
              </Link>
              <Link to="/products" className="text-black">
                <MenuItem>Products</MenuItem>
              </Link>
              <Link to="/" className="text-black">
                <MenuItem>Services</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </div>

        {/* Main content */}
        <div className="flex flex-1 h-16 justify-between items-center space-x-4 p-3 ">
          {/* Logo and site name */}
          <Link to="/">
            <div className="flex flex-row space-x-2 items-center">
              <Image
                src={"/images/teampoor_logo.jpg"}
                className="h-10 rounded-full"
                alt="TeamPoor Logo"
              />
              <div className=" hidden sm:block">
                <div className="flex flex-row">
                  <p className="font-extrabold text-black text-xl">Team</p>
                  <p className="font-extrabold text-red-500 text-xl">Poor</p>
                </div>
                <p className="text-xs text-black font-semibold ">
                  Motorcycle Shop & Services
                </p>
              </div>
            </div>
          </Link>

          {/* Navigation links */}
          <Box className="space-x-4 hidden md:block">
            <Link to="/" className="text-black font-semibold">
              HOME
            </Link>
            <Link to="/products" className="text-black font-semibold">
              PRODUCTS
            </Link>
            <Link to="/services" className="text-black font-semibold">
              SERVICES
            </Link>
            <Link to="/booking" className="text-black font-semibold">
              BOOK APPOINTMENT
            </Link>
          </Box>

          {/* User actions */}
          <Box className="flex flex-row space-x-5 items-center">
            {/* Cart button */}
              <Button
                className="relative p-2 bg-red-200 rounded-full"
                colorScheme="#b91c1c"
                onClick={CartHandler}
              >
                <CgShoppingCart color="#b91c1c" />
                {cartItems.length > 0 && (
                  <Box
                    className="absolute -top-1 -right-1 bg-red-500 rounded-full px-1  h-5 w-5 items-center justify-center flex"
                    id="cart_count"
                    color="red"
                  >
                    <p className="text-white text-xs">{cartItems.length}</p>
                  </Box>
                )}
              </Button>

            {/* Bell icon with notification badge */}
            {user && user.role === "admin" && (
              <Button onClick={handleShowModal}>
                <FiBell boxSize={6} color="gray.600" />
                {newOrders.length > 0 && (
                  <Badge colorScheme="red" variant="solid" ml={1}>
                    {newOrders.filter(order => !isNotificationClicked(order._id)).length}
                  </Badge>
                )}
              </Button>
            )}

            {user && user.role === "user" && (
              <Button onClick={handleShowModalNotif}>
                <FiBell boxSize={6} color="gray.600" />
                <Badge colorScheme="red" variant="solid" ml={1}>
                  {unreadNotifications.filter(unreadNotification => !isUnreadNotificationClicked(unreadNotification._id)).length}
                </Badge>
              </Button>
            )}

            <Flex alignItems="center">
              <Stack direction="row" spacing={7} alignItems="center">
                {user ? (
                  <Menu>
                    <MenuButton colorScheme="pink">
                      <div className="flex flex-row items-center space-x-2">
                        <Avatar
                          size="sm"
                          src={user.avatar && user.avatar.url}
                        />
                        <Text className="text-black font-semibold hidden sm:block">
                          {user.firstname} {user.lastname}
                        </Text>
                        <BiChevronDown />
                      </div>
                    </MenuButton>
                    <MenuList>
                      <MenuGroup title="Profile">
                        <MenuItem onClick={ProfileHandler}>
                          <Box as={CgProfile} mr="3" />
                          Profile
                        </MenuItem>

                        {user && user.role === "admin" && (
                          <MenuItem onClick={DashboardHandler}>
                            <Box as={RiDashboardLine} mr="3" />
                            Dashboard
                          </MenuItem>
                        )}

                        {user && user.role === "user" && (
                          <>
                            <MenuItem onClick={myMotorHandler}>
                              <Box as={FaMotorcycle} mr="3" />
                              My Motorcycles
                            </MenuItem>
                            <MenuItem onClick={myAddressesHandler}>
                              <Box as={FaRegAddressBook} mr="3" />
                              My Address
                            </MenuItem>
                            <MenuItem onClick={myFuelHandler}>
                              <Box as={BsFillFuelPumpFill} mr="3" />
                              Fuel logs
                            </MenuItem>
                            <MenuItem onClick={myOrderHandler}>
                              <Box as={FaRegListAlt} mr="3" />
                              My Orders
                            </MenuItem>
                            <MenuItem onClick={myAppointmentHandler}>
                              <Box as={AiFillSchedule} mr="3" />
                              My appointment
                            </MenuItem>
                          </>
                        )}

                        {user && user.role === "secretary" && (
                          <>
                            <MenuItem onClick={secretaryHandler}>
                              <Box as={FaRegListAlt} mr="3" />
                              List orders
                            </MenuItem>
                            <MenuItem onClick={listsecappointmentsHandler}>
                              <Box as={FaRegListAlt} mr="3" />
                              List appointments
                            </MenuItem>
                          </>
                        )}

                        {user && user.role === "mechanic" && (
                          <MenuItem onClick={mechanicHandler}>
                            <Box as={FaScrewdriverWrench} mr="3" />
                            My Task
                          </MenuItem>
                        )}
                      </MenuGroup>
                      <MenuDivider />
                      <MenuGroup title="Action">
                        <MenuItem onClick={LogoutHandler}>
                          {" "}
                          <Box as={FiLogOut} mr="3" />
                          Logout
                        </MenuItem>
                        {/* <MenuItem>FAQ</MenuItem> */}
                      </MenuGroup>
                    </MenuList>
                  </Menu>
                ) : (
                  <Link to="/login" className="text-black font-semibold">
                    LOGIN
                  </Link>
                )}
              </Stack>
            </Flex>
          </Box>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notification for orders</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {newOrders.length > 0 && (
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', alignItems: 'center' }}>
                <hr style={{ width: '40%', border: '1px solid #000', marginRight: '10px' }} />
                <div style={{ fontWeight: 'bold', textAlign: 'center', width: '80%' }}>Newest</div>
                <hr style={{ width: '40%', border: '1px solid #000', marginLeft: '10px' }} />
              </div>
            )}

            <div>
              {newOrders.length > 0 ? (
                <div>
                  <ul>
                    {newOrders
                      .filter(order => !isNotificationClicked(order._id))
                      .map((order) => (
                        <li key={order._id}>
                          <Link
                            to={`/admin/order/${order._id}`}
                            onClick={() => {
                              handleNotificationClick(order._id);
                              handleCloseModal();
                            }}
                          >
                            <div
                              style={{
                                ...notificationCardStyle,
                                opacity: isNotificationClicked(order._id) ? 0.5 : 1,
                              }}
                            >
                              <div style={notificationContentStyle}>
                                <FaBoxOpen size={24} color="#00D100" />
                                <div style={notificationTextContainer}>
                                  <p style={notificationText}>New Order Arrived</p>
                                  <Badge
                                    colorScheme="blue"
                                    variant="subtle"
                                    rounded="full"
                                    style={dateOrderedStyle}
                                  >
                                    {formatElapsedTime(order.dateOrdered)}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <FaBoxOpen size={24} color="#FF0000" />
                  <div style={{ marginLeft: '10px' }}>
                    <p style={{ fontWeight: 'bold' }}>No New Orders</p>
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', alignItems: 'center' }}>
              <hr style={{ width: '40%', border: '1px solid #000', marginRight: '10px' }} />
              <div style={{ fontWeight: 'bold', textAlign: 'center', width: '80%' }}>Last Read</div>
              <hr style={{ width: '40%', border: '1px solid #000', marginLeft: '10px' }} />
            </div>

            <div>
              {clickedNotifications.length > 0 && (
                <div>
                  <ul>
                    {newOrders
                      .filter(order => isNotificationClicked(order._id))
                      .map((order) => (
                        <li key={order._id}>
                          <Link
                            to={`/admin/order/${order._id}`}
                            onClick={() => {
                              handleNotificationClick(order._id);
                              handleCloseModal();
                            }}
                          >
                            <div
                              style={{
                                ...notificationCardStyle,
                                opacity: isNotificationClicked(order._id) ? 0.5 : 1,
                              }}
                            >
                              <div style={notificationContentStyle}>
                                <FaBoxOpen size={24} color="#00D100" />
                                <div style={notificationTextContainer}>
                                  <p style={notificationText}>New Order Arrived</p>
                                  <Badge
                                    colorScheme="blue"
                                    variant="subtle"
                                    rounded="full"
                                    style={dateOrderedStyle}
                                  >
                                    {formatElapsedTime(order.dateOrdered)}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={showModalNotif} onClose={handleCloseModalNotif}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notification alert</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Check if there are unread notifications for the current user */}
            {unreadNotifications && unreadNotifications.length > 0 ? (
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', alignItems: 'center' }}>
                <hr style={{ width: '40%', border: '1px solid #000', marginRight: '10px' }} />
                <div style={{ fontWeight: 'bold', textAlign: 'center', width: '80%' }}>Newest</div>
                <hr style={{ width: '40%', border: '1px solid #000', marginLeft: '10px' }} />
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <FiBell size={24} color="#FF0000" />
                <div style={{ marginLeft: '10px' }}>
                  <p style={{ fontWeight: 'bold' }}>No New Notifications</p>
                </div>
              </div>
            )}

            {/* Render notifications only if there are unread notifications */}
            <div>
              {unreadNotifications && unreadNotifications.length > 0 && (
                <div>
                  <ul>
                    {/* Map over unread notifications */}
                    {unreadNotifications.map((unreadItem) => (
                      <li key={unreadItem._id}>
                        <Link
                          to={unreadItem.link}
                          onClick={() => {
                            handleUnreadNotificationClick(unreadItem._id);
                            handleCloseModalNotif();
                          }}
                        >
                          {/* Apply styling based on whether the notification is clicked or not */}
                          <div
                            style={{
                              ...notificationCardStyle,
                              opacity: isUnreadNotificationClicked(unreadItem._id) ? 0.5 : 1,
                            }}
                          >
                            <div style={notificationContentStyle}>
                              <FiBell size={24} color="#00D100" />
                              <div style={notificationTextContainer}>
                                <p style={notificationText}>Your {unreadItem.message}</p>
                                <Badge
                                  colorScheme="blue"
                                  variant="subtle"
                                  rounded="full"
                                  style={dateOrderedStyle}
                                >
                                  {formatElapsedTime(unreadItem.createdAt)}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleCloseModalNotif}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Box>
  );
};

export default Header;