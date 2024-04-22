import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Box,
  VStack,
  Text,
  Link,
  Icon,
  Collapse,
  ListItem,
  UnorderedList,
  Badge,
  Button,
  Image,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RiDashboardLine } from "react-icons/ri";
import { TbBrandAsana } from "react-icons/tb";
import { BiCategory } from "react-icons/bi";
import { FaProductHunt, FaUsers, FaMotorcycle } from "react-icons/fa";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { PiShoppingCartFill } from "react-icons/pi";
import { MdMiscellaneousServices } from "react-icons/md";
import { LuBoxes } from "react-icons/lu";
import { FaStar } from "react-icons/fa6";

const NavItem = ({ icon, text, to, subItems }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation(); // Get the current location
  const isActive = location.pathname === to; // Check if the current location matches the 'to' prop

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Link
      as={RouterLink}
      to={to}
      onClick={subItems ? handleToggle : undefined}
      type="button"
      className={
        isActive
          ? "hover:bg-red-200 rounded-lg px-2 py-2"
          : "hover:bg-red-200 rounded-lg px-2 py-2"
      }
      style={{ textDecoration: "none" }}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row space-x-2 items-center">
          {icon && (
            <Icon as={icon} boxSize={5} color={isActive ? "red" : "gray.500"} />
          )}

          <Text
            fontSize="md"
            ml={2}
            fontWeight={subItems ? "normal" : "normal"}
            className={isActive ? "text-red-500" : ""}
          >
            {text}
          </Text>
        </div>

        {subItems && <Icon as={ChevronDownIcon} ml="auto" />}
      </div>

      {subItems && (
        <Collapse in={isOpen}>
          <UnorderedList ml={6} mt={2}>
            {subItems.map((subItem) => (
              <ListItem key={subItem.text}>
                <Link
                  as={RouterLink}
                  to={subItem.to}
                  fontSize="sm"
                  display="block"
                  py={1}
                >
                  {subItem.icon && (
                    <Icon as={subItem.icon} boxSize={4} mr={2} />
                  )}
                  {subItem.text}
                </Link>
              </ListItem>
            ))}
          </UnorderedList>
        </Collapse>
      )}
    </Link>
  );
};

const Sidebar = () => {
  const { alllistorders } = useSelector((state) => state.allOrders);
  const { allbookings } = useSelector((state) => state.allAppointment);
  // Calculate the total number of orders
  const totalOrdersCount = alllistorders?.length;
  const totalAppointmentsCount = allbookings?.length;

  const navItems = [
    { icon: RiDashboardLine, text: "Dashboard", to: "/dashboard" },
    { icon: FaUsers, text: "Users", to: "/admin/view/all/users" },
    { icon: LuBoxes, text: "Supplier", to: "/admin/view/all/suppliers" },
    {
      icon: FaMotorcycle,
      text: "Motorcycles",
      to: "/admin/view/all/motorcycles",
    },
    {
      icon: FaUsers,
      text: "Supplied Log",
      to: "/admin/supplied/product/history",
    },
    {
      icon: TbBrandAsana,
      text: "Brands",
      subItems: [
        { text: "All Brands", to: "/admin/view/all/brands" },
        { text: "Create Brand", to: "/add/brand/new" },
      ],
    },
    {
      icon: BiCategory,
      text: "Category",
      subItems: [
        { text: "All Category", to: "/admin/view/all/category" },
        { text: "Create Category", to: "/add/category/new" },
      ],
    },
    {
      icon: PiShoppingCartFill,
      text: (
        <>
          Orders{" "}
          <Badge colorScheme="red" variant="solid" ml={1}>
            {totalOrdersCount}
          </Badge>
        </>
      ),
      to: "/admin/orders",
    },
    {
      icon: FaProductHunt,
      text: "Products",
      subItems: [
        { text: "All Product", to: "/admin/view/all/products" },
        { text: "Create Product", to: "/add/product/new" },
        { text: "Product Stock", to: "/admin/view/all/product/stocks" },
        { text: "Stock Record Log", to: "/admin/stock/history/logs" },
        { text: "Price Record Log", to: "/admin/price/history/logs" },
      ],
    },
    {
      icon: MdMiscellaneousServices,
      text: "Services",
      subItems: [
        { text: "All Services", to: "/admin/view/all/services" },
        { text: "Create Service", to: "/add-service" },
      ],
    },
    {
      icon: PiShoppingCartFill,
      text: (
        <>
          Appointment{" "}
          <Badge colorScheme="red" variant="solid" ml={1}>
            {totalAppointmentsCount}
          </Badge>
        </>
      ),
      to: "/admin/appointment/list",
    },
    // { icon: FaUsers, text: 'Appointment', to: '/admin/appointment/list' },
    { icon: FaStar, text: "Product Reviews", to: "/admin/reviews" },
    {
      icon: FaStar,
      text: "Mechanic Reviews",
      to: "/admin/mechanic/list-reviews",
    },
  ];

  return (
    <Box
      bg="white"
      p={3}
      boxShadow="lg"
      w="200px"
      display={{ base: "none", md: "block" }}
      className="rounded-xl "
      style={{ position: "sticky", top: "20px", bottom: "0" }}
    >
      <div className="space-y-3">
        <div>
          <div className="flex justify-center p-2">
            <Image
              src={"/images/teampoor_logo.jpg"}
              className="h-20 rounded-full"
              alt="TeamPoor Logo"
            />
          </div>

          <div>
            <p className="text-center font-semibold text-lg">TeamPoor</p>
            <p className="text-center text-xs">Motorcycle Shop & Services</p>
          </div>
        </div>

        <hr />

        <VStack spacing={3} align="stretch">
          {navItems.map((item) => (
            <NavItem key={item.text} {...item} />
          ))}
        </VStack>
      </div>
    </Box>
  );
};

export default Sidebar;
