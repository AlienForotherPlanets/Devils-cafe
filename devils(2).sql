-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 01, 2023 at 03:49 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `devils`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin-panel`
--

CREATE TABLE `admin-panel` (
  `admin_id` int(11) NOT NULL,
  `admin_option` varchar(100) NOT NULL,
  `admin_data` varchar(1000) NOT NULL,
  `admin_data_time` varchar(100) NOT NULL,
  `admin_device_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin-panel`
--

INSERT INTO `admin-panel` (`admin_id`, `admin_option`, `admin_data`, `admin_data_time`, `admin_device_id`) VALUES
(1, 'Password', '$2y$10$qiDxXh4vhb10tg3OfL6aXOpNi20irsVXKVQm51DKWOVMyjhEcn..2', '-', '-'),
(2, 'Update-password-info', 'Device name', 'Update password time', 'Device id '),
(5, 'Update-password-info', 'Redmi note 11', '2023-02-15 10:23:19', '12.0.01'),
(6, 'Addmin-login', '', '2023-02-15 10:39:02', '12.0.0.01'),
(7, 'Addmin-login', 'Redmin note 11', '2023-02-15 10:39:16', '12.0.0.01'),
(10, 'Update-password-info', 'Redmi note 11', '2023-02-19 10:05:27', '12.0.01'),
(11, 'Update-password-info', 'Redmi Note 11', '2023-02-19 10:09:35', 'SKQ1.211103.001 test-keys'),
(12, 'Delete-category', 'Category-name', 'Time', 'Device-name'),
(13, 'Update-password-info', 'Redmi Note 11', '2023-02-20 20:47:35', 'SKQ1.211103.001 test-keys'),
(14, 'Addmin-login', 'Redmi Note 11', '2023-02-20 20:47:47', 'SKQ1.211103.001 test-keys'),
(15, 'Addmin-login', 'Redmi Note 11', '2023-02-20 20:48:06', 'SKQ1.211103.001 test-keys'),
(16, 'Addmin-login', 'Redmi Note 11', '2023-02-20 20:48:22', 'SKQ1.211103.001 test-keys'),
(17, 'Addmin-login', 'Redmi Note 11', '2023-02-20 20:49:23', 'SKQ1.211103.001 test-keys'),
(18, 'Delete-category', 'Updtae-name142490Bbz**category-kxzwhmjvnu', '2023-02-20 22:11:22', 'Redmi Note 11**SKQ1.211103.001 test-keys'),
(19, 'Delete-category', 'Brithday cake121**category-nvqtolyfhi', '2023-02-20 22:12:04', 'Redmi Note 11**SKQ1.211103.001 test-keys'),
(20, 'Delete-category', 'Brithday cake12**category-wqjvxdirta', '2023-02-20 22:12:54', 'Redmi Note 11**SKQ1.211103.001 test-keys'),
(21, 'Delete-category', 'Kids cake **category-vgsytxejqp', '2023-02-24 14:39:46', 'Redmi Note 11**SKQ1.211103.001 test-keys'),
(22, 'Addmin-login', 'Redmi Note 11', '2023-02-24 16:27:03', 'SKQ1.211103.001 test-keys'),
(23, 'Delete-latest-product', '-', '2023-02-24 16:42:25', ''),
(24, 'Delete-category', 'Cake1290**category-qatdkgmcjn', '2023-03-01 14:53:36', 'Redmi Note 11**SKQ1.211103.001 test-keys'),
(25, 'Delete-latest-product', '-', '2023-03-01 15:07:14', ''),
(26, 'Delete-latest-product', '-', '2023-03-01 15:07:15', ''),
(27, 'Delete-latest-product', '-', '2023-03-01 15:07:18', ''),
(28, 'Delete-latest-product', '-', '2023-03-01 15:21:36', ''),
(29, 'Delete-latest-product', '-', '2023-03-01 15:21:38', ''),
(30, 'Delete-latest-product', '-', '2023-03-01 15:25:29', ''),
(31, 'Delete-latest-product', '-', '2023-03-01 15:25:30', ''),
(32, 'Delete-latest-product', '-', '2023-03-01 15:25:49', ''),
(33, 'Delete-latest-product', '-', '2023-03-01 15:25:50', ''),
(34, 'Delete-latest-product', '-', '2023-03-01 15:28:43', ''),
(35, 'Delete-latest-product', '-', '2023-03-01 15:28:44', ''),
(36, 'Delete-latest-product', '-', '2023-03-01 15:29:27', ''),
(37, 'Delete-latest-product', '-', '2023-03-01 15:29:30', ''),
(38, 'Admin-mobile-number', '6354757251', '', ''),
(39, 'Admin-mobile-number', '9909093846', '', ''),
(40, 'Admin-mobile-number', '6354757251', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `banner_data`
--

CREATE TABLE `banner_data` (
  `Banner_id` int(11) NOT NULL,
  `Banner_image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `banner_data`
--

INSERT INTO `banner_data` (`Banner_id`, `Banner_image`) VALUES
(2, 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677171772/Banner/gygk272lkbypgk6mmwy8.jpg'),
(4, 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677171935/Banner/voc9d4ugdkln7btkp0rq.jpg'),
(15, 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677663363/Banner/qv4qgrndraxruvuzfm7o.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `Category_key` int(11) NOT NULL,
  `Category_image` varchar(1000) NOT NULL,
  `Category_name` varchar(100) NOT NULL,
  `Category_primary` varchar(10) NOT NULL,
  `Category_data` varchar(100) NOT NULL,
  `Category_description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`Category_key`, `Category_image`, `Category_name`, `Category_primary`, `Category_data`, `Category_description`) VALUES
(12, 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677169824/Category/r16uknspiq7siwfduzan.jpg', 'Birthday cake', '0', 'category-xczdaewuhp', 'Staring from 399/-'),
(13, 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677169946/Category/ivootgyfueup6c3aqtwb.jpg', 'Anniversary cake ', '0', 'category-pvuladfoqb', 'Starting from 599/-'),
(14, 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677170115/Category/asvy4xmsmce3qak2wisp.jpg', 'Weeding cake ', '0', 'category-sqbnhltefv', 'Stating from 799/-'),
(15, 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677170260/Category/mnwwii2eavhxd25a3vsz.jpg', 'New year cake', '0', 'category-uxfblksacm', 'Starting from 599/-'),
(16, 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677170348/Category/bjmlgatsqkahzfebirsr.jpg', 'Babby shower cake ', '0', 'category-flebtoyuic', 'Starting from 799/-'),
(17, 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677170771/Category/tjfmvfq8myemz5act2a7.jpg', 'Valentines cake', '0', 'category-wuzdpvkcth', 'Starting from 599/-'),
(18, 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677170883/Category/yoewmkteyl38wmd2s1lf.jpg', 'Customized cake', '0', 'category-ohjzwflcyt', 'Starting from 999/-'),
(20, 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677254769/Category/wyomibeolokz00prycxw.jpg', 'Premium cake ', '0', 'category-moxdtalnrz', 'Starting from 699/-');

-- --------------------------------------------------------

--
-- Table structure for table `category-flebtoyuic`
--

CREATE TABLE `category-flebtoyuic` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_discount_price` varchar(30) DEFAULT NULL,
  `Product_flavour` varchar(100) DEFAULT NULL,
  `Product_bread` varchar(100) DEFAULT NULL,
  `Product_cream` varchar(100) DEFAULT NULL,
  `Product_time` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category-moxdtalnrz`
--

CREATE TABLE `category-moxdtalnrz` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_discount_price` varchar(30) DEFAULT NULL,
  `Product_flavour` varchar(100) DEFAULT NULL,
  `Product_bread` varchar(100) DEFAULT NULL,
  `Product_cream` varchar(100) DEFAULT NULL,
  `Product_time` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category-ohjzwflcyt`
--

CREATE TABLE `category-ohjzwflcyt` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_discount_price` varchar(30) DEFAULT NULL,
  `Product_flavour` varchar(100) DEFAULT NULL,
  `Product_bread` varchar(100) DEFAULT NULL,
  `Product_cream` varchar(100) DEFAULT NULL,
  `Product_time` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category-pvuladfoqb`
--

CREATE TABLE `category-pvuladfoqb` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_discount_price` varchar(30) DEFAULT NULL,
  `Product_flavour` varchar(100) DEFAULT NULL,
  `Product_bread` varchar(100) DEFAULT NULL,
  `Product_cream` varchar(100) DEFAULT NULL,
  `Product_time` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category-qatdkgmcjn`
--

CREATE TABLE `category-qatdkgmcjn` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_discount_price` varchar(30) DEFAULT NULL,
  `Product_flavour` varchar(100) DEFAULT NULL,
  `Product_bread` varchar(100) DEFAULT NULL,
  `Product_cream` varchar(100) DEFAULT NULL,
  `Product_time` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category-sqbnhltefv`
--

CREATE TABLE `category-sqbnhltefv` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_discount_price` varchar(30) DEFAULT NULL,
  `Product_flavour` varchar(100) DEFAULT NULL,
  `Product_bread` varchar(100) DEFAULT NULL,
  `Product_cream` varchar(100) DEFAULT NULL,
  `Product_time` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category-uxfblksacm`
--

CREATE TABLE `category-uxfblksacm` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_discount_price` varchar(30) DEFAULT NULL,
  `Product_flavour` varchar(100) DEFAULT NULL,
  `Product_bread` varchar(100) DEFAULT NULL,
  `Product_cream` varchar(100) DEFAULT NULL,
  `Product_time` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category-vgsytxejqp`
--

CREATE TABLE `category-vgsytxejqp` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_discount_price` varchar(30) DEFAULT NULL,
  `Product_flavour` varchar(100) DEFAULT NULL,
  `Product_bread` varchar(100) DEFAULT NULL,
  `Product_cream` varchar(100) DEFAULT NULL,
  `Product_time` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category-wuzdpvkcth`
--

CREATE TABLE `category-wuzdpvkcth` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_discount_price` varchar(30) DEFAULT NULL,
  `Product_flavour` varchar(100) DEFAULT NULL,
  `Product_bread` varchar(100) DEFAULT NULL,
  `Product_cream` varchar(100) DEFAULT NULL,
  `Product_time` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category-wuzdpvkcth`
--

INSERT INTO `category-wuzdpvkcth` (`Product_key`, `Product_id`, `Product_information`, `Product_image1`, `Product_image2`, `Product_image3`, `Product_retail_price`, `Product_discount_price`, `Product_flavour`, `Product_bread`, `Product_cream`, `Product_time`) VALUES
(1, 'cmqzdavyip', 'Chocolate cake', '', 'None', 'None', '500', '400', 'Chocolate', 'Chocolate', 'Chocolate', '2023-02-24 14:56:23');

-- --------------------------------------------------------

--
-- Table structure for table `category-xczdaewuhp`
--

CREATE TABLE `category-xczdaewuhp` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_discount_price` varchar(30) DEFAULT NULL,
  `Product_flavour` varchar(100) DEFAULT NULL,
  `Product_bread` varchar(100) DEFAULT NULL,
  `Product_cream` varchar(100) DEFAULT NULL,
  `Product_time` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category-xczdaewuhp`
--

INSERT INTO `category-xczdaewuhp` (`Product_key`, `Product_id`, `Product_information`, `Product_image1`, `Product_image2`, `Product_image3`, `Product_retail_price`, `Product_discount_price`, `Product_flavour`, `Product_bread`, `Product_cream`, `Product_time`) VALUES
(13, 'uxispkdlqy', 'Chocolate cake ', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', 'None', 'None', '500', '400', 'Chocolate', 'Chocolate', 'Chocolate', '2023-02-24 16:04:08');

-- --------------------------------------------------------

--
-- Table structure for table `custom-cake-order`
--

CREATE TABLE `custom-cake-order` (
  `Custom-cake-id` int(11) NOT NULL,
  `Custom-cake-image1` varchar(1000) NOT NULL,
  `Custom-cake-image2` varchar(1000) NOT NULL,
  `Custom-cake-image3` varchar(1000) NOT NULL,
  `Custom-cake-information` varchar(1000) NOT NULL,
  `Custom-cake-weight` varchar(100) NOT NULL,
  `Custom-cake-top-name` varchar(100) NOT NULL,
  `Custom_cake_flavour` varchar(100) NOT NULL,
  `Custom_cake_color` varchar(100) NOT NULL,
  `Custom_cake_orderid` varchar(100) NOT NULL,
  `Order_delivery_date` varchar(100) NOT NULL,
  `Order_cancel_reason` varchar(100) NOT NULL,
  `Username` varchar(100) NOT NULL,
  `Userdata` varchar(500) NOT NULL,
  `Mobilenumber` varchar(40) NOT NULL,
  `Street_address` varchar(100) NOT NULL,
  `Area` varchar(40) NOT NULL,
  `Order_date` varchar(100) NOT NULL,
  `City` varchar(100) NOT NULL,
  `Pincode` varchar(100) NOT NULL,
  `Order_status` varchar(100) NOT NULL,
  `Order_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `custom-cake-order`
--

INSERT INTO `custom-cake-order` (`Custom-cake-id`, `Custom-cake-image1`, `Custom-cake-image2`, `Custom-cake-image3`, `Custom-cake-information`, `Custom-cake-weight`, `Custom-cake-top-name`, `Custom_cake_flavour`, `Custom_cake_color`, `Custom_cake_orderid`, `Order_delivery_date`, `Order_cancel_reason`, `Username`, `Userdata`, `Mobilenumber`, `Street_address`, `Area`, `Order_date`, `City`, `Pincode`, `Order_status`, `Order_id`) VALUES
(17, 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677139051/Custom_order/gysnmninhi0vormywg7d.jpg', 'None', 'None', 'Gryth', '500gm', 'Gfdh', 'Chocolate', 'Single', 'exyhvoilan', '2023-03-01', '', 'Keyru', 'user-miuglbwfaonr', '6354757251', 'Dhdg', 'Eheh', '2023-02-23 13:50:29', 'Shsg', '', 'Complete', 'nlacwhfqug'),
(18, 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677139051/Custom_order/gysnmninhi0vormywg7d.jpg', 'None', 'None', 'Gryth', '500gm', 'Gfdh', 'Chocolate', 'Single', 'wrjvbiouns', '2023-03-01', '', 'Keyru', 'user-miuglbwfaonr', '6354757251', 'Dhdg', 'Eheh', '2023-02-23 13:50:33', 'Shsg', '394101', 'Complete', 'nlacwhfqug'),
(19, 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677515572/Custom_order/v89ri1znwvhbt1rdlsp5.jpg', 'None', 'None', 'Keyur', '2Kg', 'Ke', 'Vanila', 'Multiple', 'gicxelobnu', '-', 'Cancel reason1', 'Keyur', 'user-miuglbwfaonr', '6354757251', 'Cuccuc', 'B h h', '2023-02-27 22:18:27', 'Surat', '394101', 'Cancel', ''),
(20, 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677515572/Custom_order/v89ri1znwvhbt1rdlsp5.jpg', 'None', 'None', 'Keyur', '2Kg', 'Ke', 'Vanila', 'Multiple', 'hflzbajmrt', '-', 'Cancel reason1', 'Keyur', 'user-miuglbwfaonr', '6354757251', 'Cuccuc', 'B h h', '2023-02-27 22:18:51', 'Surat', '394101', 'Cancel', '');

-- --------------------------------------------------------

--
-- Table structure for table `delivery_location`
--

CREATE TABLE `delivery_location` (
  `Delivery_location_key` int(11) NOT NULL,
  `Delivery_location_name` varchar(100) NOT NULL,
  `Delivery_location_pincode` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `delivery_location`
--

INSERT INTO `delivery_location` (`Delivery_location_key`, `Delivery_location_name`, `Delivery_location_pincode`) VALUES
(1, 'Mota varachha', '394101'),
(2, 'Location-name', 'Location-pincode');

-- --------------------------------------------------------

--
-- Table structure for table `delivery_location_suggesstion`
--

CREATE TABLE `delivery_location_suggesstion` (
  `Suesstion_key` int(11) NOT NULL,
  `Delivery_location_pincode` varchar(100) NOT NULL,
  `Delivery_location_name` varchar(100) NOT NULL,
  `Username` varchar(100) NOT NULL,
  `Mobilenumber` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `delivery_location_suggesstion`
--

INSERT INTO `delivery_location_suggesstion` (`Suesstion_key`, `Delivery_location_pincode`, `Delivery_location_name`, `Username`, `Mobilenumber`) VALUES
(1, 'Pincode', 'Area', 'Username', 'Mobilenumber'),
(2, '394105', 'Bbbb', 'Keyur', '6354757251'),
(3, '394105', 'Bbbb', 'Keyur', '6354757251'),
(4, '395006', 'Mota varachha ', 'Keyur ', '6354757251');

-- --------------------------------------------------------

--
-- Table structure for table `flmnavopxg`
--

CREATE TABLE `flmnavopxg` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_weight` varchar(100) DEFAULT NULL,
  `Product_type` varchar(30) DEFAULT NULL,
  `Product_size` varchar(30) DEFAULT NULL,
  `Product_discount_price` varchar(100) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_tag_number` varchar(100) DEFAULT NULL,
  `Product_sold_status` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jraifgcpoutevmn`
--

CREATE TABLE `jraifgcpoutevmn` (
  `User_key` int(11) NOT NULL,
  `Option` varchar(100) DEFAULT NULL,
  `Data1` varchar(200) DEFAULT NULL,
  `Data2` varchar(200) DEFAULT NULL,
  `Data3` varchar(200) DEFAULT NULL,
  `Data4` varchar(200) DEFAULT NULL,
  `Data5` varchar(200) DEFAULT NULL,
  `Data6` varchar(200) DEFAULT NULL,
  `Data7` varchar(200) DEFAULT NULL,
  `Data8` varchar(200) DEFAULT NULL,
  `Data9` varchar(200) DEFAULT NULL,
  `Data10` varchar(100) DEFAULT NULL,
  `Data11` varchar(100) DEFAULT NULL,
  `Data12` varchar(100) DEFAULT NULL,
  `Data13` varchar(100) DEFAULT NULL,
  `Data14` varchar(100) DEFAULT NULL,
  `Data15` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jraifgcpoutevmn`
--

INSERT INTO `jraifgcpoutevmn` (`User_key`, `Option`, `Data1`, `Data2`, `Data3`, `Data4`, `Data5`, `Data6`, `Data7`, `Data8`, `Data9`, `Data10`, `Data11`, `Data12`, `Data13`, `Data14`, `Data15`) VALUES
(1, 'cart-id', '0', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'address', '4', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'address-0', 'Keyur', 'Street address information', 'Area information', 'Landmark information', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'address-2', 'Keyur vaghasiya', 'Update', 'Update', 'Update', 'Update', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'address-3', 'Keyur', 'Street address information', 'Area information', 'Landmark information', 'Picode value', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'watchlist', 'Product-id', 'Category-id', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'watchlist', 'Productid1', 'Category1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `notification_data`
--

CREATE TABLE `notification_data` (
  `Notification_id` int(11) NOT NULL,
  `Notification_key` varchar(3000) NOT NULL,
  `Mobilenumber` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notification_data`
--

INSERT INTO `notification_data` (`Notification_id`, `Notification_key`, `Mobilenumber`) VALUES
(5, 'cl-ZW4xTR0O0aprmvtwH7H:APA91bFF3Xmo4TrmptnEkxe4xdAI1BmpoK3ZgsqbQVOou5Dquo-NbY9HskTtxQYXgcsFI1CCHCCHyBKhtGVAhvx82eucUrgcRRv1JnyQFJmOgY5aIchPh58ZQa4V7qpJQcuG2pJfffK8', '6354757251'),
(21, 'Notification-value', '6354757251'),
(22, 'Notification', '6354757251'),
(23, 'cl-ZW4xTR0O0aprmvtwH7H:APA91bFF3Xmo4TrmptnEkxe4xdAI1BmpoK3ZgsqbQVOou5Dquo-NbY9HskTtxQYXgcsFI1CCHCCHyBKhtGVAhvx82eucUrgcRRv1JnyQFJmOgY5aIchPh58ZQa4V7qpJQcuG2pJfffK8', '6354757251'),
(24, 'cl-ZW4xTR0O0aprmvtwH7H:APA91bFF3Xmo4TrmptnEkxe4xdAI1BmpoK3ZgsqbQVOou5Dquo-NbY9HskTtxQYXgcsFI1CCHCCHyBKhtGVAhvx82eucUrgcRRv1JnyQFJmOgY5aIchPh58ZQa4V7qpJQcuG2pJfffK8', '6354757251'),
(25, 'cl-ZW4xTR0O0aprmvtwH7H:APA91bFF3Xmo4TrmptnEkxe4xdAI1BmpoK3ZgsqbQVOou5Dquo-NbY9HskTtxQYXgcsFI1CCHCCHyBKhtGVAhvx82eucUrgcRRv1JnyQFJmOgY5aIchPh58ZQa4V7qpJQcuG2pJfffK8', '6354757251');

-- --------------------------------------------------------

--
-- Table structure for table `nsbirtkhzlyaudo`
--

CREATE TABLE `nsbirtkhzlyaudo` (
  `User_key` int(11) NOT NULL,
  `Option` varchar(100) DEFAULT NULL,
  `Data1` varchar(200) DEFAULT NULL,
  `Data2` varchar(200) DEFAULT NULL,
  `Data3` varchar(200) DEFAULT NULL,
  `Data4` varchar(200) DEFAULT NULL,
  `Data5` varchar(200) DEFAULT NULL,
  `Data6` varchar(200) DEFAULT NULL,
  `Data7` varchar(200) DEFAULT NULL,
  `Data8` varchar(200) DEFAULT NULL,
  `Data9` varchar(200) DEFAULT NULL,
  `Data10` varchar(100) DEFAULT NULL,
  `Data11` varchar(100) DEFAULT NULL,
  `Data12` varchar(100) DEFAULT NULL,
  `Data13` varchar(100) DEFAULT NULL,
  `Data14` varchar(100) DEFAULT NULL,
  `Data15` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_data`
--

CREATE TABLE `order_data` (
  `Order_key` int(11) NOT NULL,
  `Order_id` varchar(100) NOT NULL,
  `Order_status` varchar(100) NOT NULL,
  `Order_payment_status` varchar(100) NOT NULL,
  `Order_payment_id` varchar(100) NOT NULL,
  `Order_payment_refund` varchar(100) NOT NULL,
  `Order_time` varchar(100) NOT NULL,
  `Order_deliver_date` varchar(100) NOT NULL,
  `Order_cancel_date` varchar(100) NOT NULL,
  `Order_cancel_reason` varchar(500) NOT NULL,
  `Username` varchar(150) NOT NULL,
  `Mobile_number` varchar(100) NOT NULL,
  `User_data` varchar(100) NOT NULL,
  `Street_address` varchar(200) NOT NULL,
  `Landmark` varchar(100) NOT NULL,
  `Pincode` varchar(100) NOT NULL,
  `Order_total_amount` varchar(100) NOT NULL,
  `Order_delivery_charge` varchar(100) NOT NULL,
  `Area` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_data`
--

INSERT INTO `order_data` (`Order_key`, `Order_id`, `Order_status`, `Order_payment_status`, `Order_payment_id`, `Order_payment_refund`, `Order_time`, `Order_deliver_date`, `Order_cancel_date`, `Order_cancel_reason`, `Username`, `Mobile_number`, `User_data`, `Street_address`, `Landmark`, `Pincode`, `Order_total_amount`, `Order_delivery_charge`, `Area`) VALUES
(42, '892675', 'Pending', 'Pending', 'None', 'No-refund', '2023-02-26 23:29:52', '-', '-', '-', 'Keyru', '6354757251', 'user-miuglbwfaonr', 'Dhdg', 'Shsg', '394101', '400', '100', 'Eheh'),
(43, '590628', 'Pending', 'Pending', 'None', 'No-refund', '2023-02-27 12:13:45', '-', '-', '-', 'Keyru', '6354757251', 'user-miuglbwfaonr', 'Dhdg', 'Shsg', '394101', '400', '100', 'Eheh'),
(44, '961738', 'Pending', 'Pending', 'None', 'No-refund', '2023-02-27 13:23:32', '-', '-', '-', 'Keyru', '6354757251', 'user-miuglbwfaonr', 'Dhdg', 'Shsg', '394101', '400', '100', 'Eheh'),
(45, '308264', 'Pending', 'Pending', 'None', 'No-refund', '2023-02-27 13:59:25', '-', '-', '-', 'Keyur', '6354757251', 'user-miuglbwfaonr', 'Cuccuc', 'Surat', '394101', '400', '100', 'B h h'),
(46, '193725', 'Pending', 'Pending', 'None', 'No-refund', '2023-02-27 13:59:27', '-', '-', '-', 'Keyur', '6354757251', 'user-miuglbwfaonr', 'Cuccuc', 'Surat', '394101', '400', '100', 'B h h'),
(47, '241675', 'Pending', 'Pending', 'None', 'No-refund', '2023-02-27 23:16:00', '-', '-', '-', 'Keyur', '6354757251', 'user-miuglbwfaonr', 'A-201, shayam antillia', 'Surat ', '394101', '400', '100', 'Mota varachha'),
(48, '167492', 'Pending', 'Pending', 'None', 'No-refund', '2023-02-27 23:19:09', '-', '-', '-', 'Keyur', '6354757251', 'user-miuglbwfaonr', 'A-201, shayam antillia', 'Surat ', '394101', '400', '100', 'Mota varachha'),
(49, '457092', 'Pending', 'Pending', 'None', 'No-refund', '2023-02-27 23:19:11', '-', '-', '-', 'Keyur', '6354757251', 'user-miuglbwfaonr', 'A-201, shayam antillia', 'Surat ', '394101', '400', '100', 'Mota varachha'),
(50, '285409', 'Pending', 'Pending', 'None', 'No-refund', '2023-02-27 23:19:58', '-', '-', '-', 'Keyur', '6354757251', 'user-miuglbwfaonr', 'A-201, shayam antillia', 'Surat ', '394101', '400', '100', 'Mota varachha'),
(51, '502749', 'Pending', 'Pending', 'None', 'No-refund', '2023-02-27 23:19:59', '-', '-', '-', 'Keyur', '6354757251', 'user-miuglbwfaonr', 'A-201, shayam antillia', 'Surat ', '394101', '400', '100', 'Mota varachha'),
(52, '349285', 'Pending', 'Pending', 'None', 'No-refund', '2023-02-27 23:21:15', '-', '-', '-', 'Keyur', '6354757251', 'user-miuglbwfaonr', 'A-201, shayam antillia', 'Surat ', '394101', '400', '100', 'Mota varachha'),
(53, '164782', 'Cancel', 'Pending', 'None', 'No-refund', '2023-02-27 23:21:17', '-', '2023-02-27 23:22:05', 'Out of stock', 'Keyur', '6354757251', 'user-miuglbwfaonr', 'A-201, shayam antillia', 'Surat ', '394101', '400', '100', 'Mota varachha'),
(54, '921763', 'Complete', 'Success', 'None', 'No-refund', '2023-02-27 23:22:05', '2023-03-01', '-', '-', 'Keyur', '6354757251', 'user-miuglbwfaonr', 'A-201, shayam antillia', 'Surat ', '394101', '400', '100', 'Mota varachha');

-- --------------------------------------------------------

--
-- Table structure for table `order_product_data`
--

CREATE TABLE `order_product_data` (
  `Order_product_key` int(11) NOT NULL,
  `Order_id` varchar(100) NOT NULL,
  `Product_id` varchar(100) NOT NULL,
  `Product_image` varchar(1000) NOT NULL,
  `Product_weight` varchar(100) NOT NULL,
  `Product_retail_price` varchar(100) NOT NULL,
  `Product_discount_price` varchar(100) NOT NULL,
  `Product_on_name` varchar(100) NOT NULL,
  `Product_quantity` varchar(100) NOT NULL,
  `Product_flavour` varchar(100) NOT NULL,
  `Product_bread` varchar(100) NOT NULL,
  `Product_cream` varchar(100) NOT NULL,
  `Category_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_product_data`
--

INSERT INTO `order_product_data` (`Order_product_key`, `Order_id`, `Product_id`, `Product_image`, `Product_weight`, `Product_retail_price`, `Product_discount_price`, `Product_on_name`, `Product_quantity`, `Product_flavour`, `Product_bread`, `Product_cream`, `Category_id`) VALUES
(1, 'Order_id', 'Product_id', 'Product_image1', 'Product_weight', 'Product_retail_price', 'Product_discount_price', 'Product_name', 'Product_quantity', 'Product_flavour', 'Product_bread', 'Product_cream', ''),
(2, '48072165', '', '', '500gm', '500', '400', 'Vvb', '1', 'Chocolate', 'Normal', 'Storebary', ''),
(3, '29351407', '', '', '500gm', '500', '400', 'Vvb', '1', 'Chocolate', 'Normal', 'Storebary', ''),
(4, '76143890', '', '', '500gm', '500', '400', 'Vvb', '1', 'Chocolate', 'Normal', 'Storebary', ''),
(5, '61937842', '', '', '500gm', '500', '400', 'Vvb', '1', 'Chocolate', 'Normal', 'Storebary', ''),
(6, '89314205', '', '', '500gm', '500', '400', 'Vvb', '1', 'Chocolate', 'Normal', 'Storebary', ''),
(7, '13420867', 'Id1', '', '500gm', '500', '400', 'Vvb', '1', 'Chocolate', 'Normal', 'Storebary', ''),
(8, '14038975', 'Id1', '', '500gm', '500', '400', 'Vvb', '1', 'Chocolate', 'Normal', 'Storebary', ''),
(9, '96371842', 'Id1', 'https://res.cloudinary.com/dsc8egt36/image /upload/v1676880132/Category/Anniversary_cake_sklvei .jpg', '500gm', '500', '400', 'Vvb', '1', 'Chocolate', 'Normal', 'Storebary', ''),
(10, '95064123', 'Id1', 'https://res.cloudinary.com/dsc8egt36/image /upload/v1676880132/Category/Anniversary_cake_sklvei .jpg', '500gm', '500', '400', 'Vvb', '1', 'Chocolate', 'Normal', 'Storebary', ''),
(11, '41608952', 'Id1', 'https://res.cloudinary.com/dsc8egt36/image /upload/v1676880132/Category/Anniversary_cake_sklvei .jpg', '500gm', '500', '400', 'Vvb', '1', 'Chocolate', 'Normal', 'Storebary', ''),
(12, '917350', 'Id1', 'https://res.cloudinary.com/dsc8egt36/image /upload/v1676880132/Category/Anniversary_cake_sklvei .jpg', '500gm', '500', '400', 'Vvb', '1', 'Chocolate', 'Normal', 'Storebary', ''),
(13, '627493', 'Id1', 'https://res.cloudinary.com/dsc8egt36/image /upload/v1676880132/Category/Anniversary_cake_sklvei .jpg', '500gm', '500', '400', 'Vvb', '1', 'Chocolate', 'Normal', 'Storebary', ''),
(14, '432185', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyyr', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(15, '698027', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyyr', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(16, '165032', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyyr', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(17, '726358', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyyr', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(18, '243178', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyyr', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(19, '012956', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyyr', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(20, '839507', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyyr', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(21, '142789', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyyr', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(22, '460712', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyyr', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(23, '813209', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyyr', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(24, '289436', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyyr', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(25, '602895', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyyr', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(26, '382510', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyyr', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(27, '748650', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyyr', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(28, '528074', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyyr', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(29, '925306', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyyr', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(30, '208561', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyyr', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(31, '984617', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyyr', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(32, '574936', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyyr', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(33, '469850', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyyr', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(34, '290617', '', 'http://res.cloudinary.com /dsc8egt36/image/upload/v1677234847/Product /u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyyr', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(35, '795821', 'uxispkdlqy', 'http://res.cloudinary.com /dsc8egt36/image/upload/v1677234847/Product /u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyyr', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(36, '975621', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyyr', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(37, '492607', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyyr', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(38, '875210', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyur', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(39, '218763', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyur', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(40, '458702', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyur', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(41, '892675', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '750gm', '500', '400', 'Keyur', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(42, '590628', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyur', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(43, '961738', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyut', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(44, '308264', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '750gm', '500', '400', 'Ke yu r', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(45, '193725', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '750gm', '500', '400', 'Ke yu r', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(46, '241675', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyur', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(47, '167492', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyur', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(48, '457092', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyur', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(49, '285409', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyur', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(50, '502749', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyur', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(51, '349285', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyur', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(52, '164782', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyur', '1', 'Chocolate', 'Chocolate', 'Chocolate', ''),
(53, '921763', 'uxispkdlqy', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677234847/Product/u9felpcx3mubceryro25.jpg', '500gm', '500', '400', 'Keyur', '1', 'Chocolate', 'Chocolate', 'Chocolate', '');

-- --------------------------------------------------------

--
-- Table structure for table `party_decoration_image`
--

CREATE TABLE `party_decoration_image` (
  `Banner_id` int(11) NOT NULL,
  `Banner_image` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `party_decoration_image`
--

INSERT INTO `party_decoration_image` (`Banner_id`, `Banner_image`) VALUES
(1, 'https://res.cloudinary.com/dsc8egt36/image/upload/v1677172364/Banner/Decoration-banner1_w1hv49.jpg'),
(2, 'https://res.cloudinary.com/dsc8egt36/image/upload/v1677172298/Banner/Decoration2_v4duuv.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `refund_data`
--

CREATE TABLE `refund_data` (
  `Refund_key` int(11) NOT NULL,
  `Order_id` varchar(100) NOT NULL,
  `Order_total` varchar(100) NOT NULL,
  `Username` varchar(100) NOT NULL,
  `Mobilenumber` varchar(100) NOT NULL,
  `Payment_id` varchar(100) NOT NULL,
  `User_id` varchar(100) NOT NULL,
  `Status` varchar(100) NOT NULL,
  `Order_date` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `refund_data`
--

INSERT INTO `refund_data` (`Refund_key`, `Order_id`, `Order_total`, `Username`, `Mobilenumber`, `Payment_id`, `User_id`, `Status`, `Order_date`) VALUES
(1, '12122', '100', 'Keyur', '6354757251', 'Payment_id', 'User_id', 'Pending', '10-12-2023'),
(2, 'Order_id', 'Order_total', 'Username', 'Mobile-number', 'Payment-id', 'User-id', 'Cancel', 'Order_date');

-- --------------------------------------------------------

--
-- Table structure for table `status_data`
--

CREATE TABLE `status_data` (
  `Status_id` int(11) NOT NULL,
  `Status_image` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `status_data`
--

INSERT INTO `status_data` (`Status_id`, `Status_image`) VALUES
(8, 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677667073/Banner/dsgedl0cfsqq21d57s6y.jpg'),
(9, 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677667075/Banner/v44yjguacrnqm4pa9gy3.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `user-abcxjgenlmpv`
--

CREATE TABLE `user-abcxjgenlmpv` (
  `User_key` int(11) NOT NULL,
  `Option` varchar(100) DEFAULT NULL,
  `Data1` varchar(200) DEFAULT NULL,
  `Data2` varchar(200) DEFAULT NULL,
  `Data3` varchar(200) DEFAULT NULL,
  `Data4` varchar(200) DEFAULT NULL,
  `Data5` varchar(200) DEFAULT NULL,
  `Data6` varchar(200) DEFAULT NULL,
  `Data7` varchar(200) DEFAULT NULL,
  `Data8` varchar(200) DEFAULT NULL,
  `Data9` varchar(200) DEFAULT NULL,
  `Data10` varchar(100) DEFAULT NULL,
  `Data11` varchar(100) DEFAULT NULL,
  `Data12` varchar(100) DEFAULT NULL,
  `Data13` varchar(100) DEFAULT NULL,
  `Data14` varchar(100) DEFAULT NULL,
  `Data15` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user-abcxjgenlmpv`
--

INSERT INTO `user-abcxjgenlmpv` (`User_key`, `Option`, `Data1`, `Data2`, `Data3`, `Data4`, `Data5`, `Data6`, `Data7`, `Data8`, `Data9`, `Data10`, `Data11`, `Data12`, `Data13`, `Data14`, `Data15`) VALUES
(1, 'cart-id', '0', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'address', '0', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'Custom-cake-order', 'Pending', 'qfzmbducjh', '2023-02-23 10:12:05', '-', '-', 'https://res.cloudinary.com/dsc8egt36/image/upload/v1676782579/cld-sample-4.jpg', 'None', 'None', 'Product information', '500gm**Chocolate', 'Keyur', 'A-201, Shayam antillia', 'Mota varchha', 'Surat', '394101'),
(4, 'Custom-cake-order', 'Pending', 'dwplgxyoav', '2023-02-23 10:19:27', '-', '-', 'https://res.cloudinary.com/dsc8egt36/image/upload/v1676782579/cld-sample-4.jpg', 'None', 'None', 'Product information', '500gm**Chocolate', 'Keyur', 'A-201, Shayam antillia', 'Mota varchha', 'Surat', '394101'),
(5, 'Custom-cake-order', 'Pending', 'qagjnzkuyf', '2023-02-23 13:40:05', '-', '-', 'https://res.cloudinary.com/dsc8egt36/image/upload/v1676782579/cld-sample-4.jpg', 'None', 'None', 'Product information', '500gm**Chocolate', 'Keyur', 'A-201, Shayam antillia', 'Mota varchha', 'Surat', '394101');

-- --------------------------------------------------------

--
-- Table structure for table `user-miuglbwfaonr`
--

CREATE TABLE `user-miuglbwfaonr` (
  `User_key` int(11) NOT NULL,
  `Option` varchar(100) DEFAULT NULL,
  `Data1` varchar(200) DEFAULT NULL,
  `Data2` varchar(200) DEFAULT NULL,
  `Data3` varchar(200) DEFAULT NULL,
  `Data4` varchar(200) DEFAULT NULL,
  `Data5` varchar(200) DEFAULT NULL,
  `Data6` varchar(200) DEFAULT NULL,
  `Data7` varchar(200) DEFAULT NULL,
  `Data8` varchar(200) DEFAULT NULL,
  `Data9` varchar(200) DEFAULT NULL,
  `Data10` varchar(100) DEFAULT NULL,
  `Data11` varchar(100) DEFAULT NULL,
  `Data12` varchar(100) DEFAULT NULL,
  `Data13` varchar(100) DEFAULT NULL,
  `Data14` varchar(100) DEFAULT NULL,
  `Data15` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user-miuglbwfaonr`
--

INSERT INTO `user-miuglbwfaonr` (`User_key`, `Option`, `Data1`, `Data2`, `Data3`, `Data4`, `Data5`, `Data6`, `Data7`, `Data8`, `Data9`, `Data10`, `Data11`, `Data12`, `Data13`, `Data14`, `Data15`) VALUES
(1, 'cart-id', 'Cancel', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'address', 'Cancel', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'Custom-cake-order', 'Pending', 'qmjdvyexoh', '2023-02-23 13:44:56', '-', '-', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677139051/Custom_order/gysnmninhi0vormywg7d.jpg', 'None', 'None', 'Gryth', '500gm**Single', 'Gfdh', '', '', '', ''),
(7, 'Custom-cake-order', 'Pending', 'pcdsmtylhv', '2023-02-23 13:45:19', '-', '-', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677139051/Custom_order/gysnmninhi0vormywg7d.jpg', 'None', 'None', 'Gryth', '500gm**Single', 'Gfdh', '', '', '', ''),
(8, 'Custom-cake-order', 'Pending', 'nsayhfgqvb', '2023-02-23 13:45:31', '-', '-', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677139051/Custom_order/gysnmninhi0vormywg7d.jpg', 'None', 'None', 'Gryth', '500gm**Single', 'Gfdh', '', '', '', ''),
(9, 'Custom-cake-order', 'Complete', 'nlacwhfqug', '2023-02-23 13:45:33', '2023-03-01', '-', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677139051/Custom_order/gysnmninhi0vormywg7d.jpg', 'None', 'None', 'Gryth', '500gm**Single', 'Gfdh', '', '', '', ''),
(10, 'Custom-cake-order', 'Pending', 'zgkxyajsfr', '2023-02-23 13:45:49', '-', '-', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677139051/Custom_order/gysnmninhi0vormywg7d.jpg', 'None', 'None', 'Gryth', '500gm**Single', 'Gfdh', '', '', '', ''),
(11, 'Custom-cake-order', 'Pending', 'revdmpukaw', '2023-02-23 13:45:50', '-', '-', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677139051/Custom_order/gysnmninhi0vormywg7d.jpg', 'None', 'None', 'Gryth', '500gm**Single', 'Gfdh', '', '', '', ''),
(12, 'Custom-cake-order', 'Pending', 'syjaefgplw', '2023-02-23 13:46:08', '-', '-', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677139051/Custom_order/gysnmninhi0vormywg7d.jpg', 'None', 'None', 'Gryth', '500gm**Single', 'Gfdh', '', '', '', ''),
(13, 'Custom-cake-order', 'Pending', 'ikhftedlgo', '2023-02-23 13:46:18', '-', '-', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677139051/Custom_order/gysnmninhi0vormywg7d.jpg', 'None', 'None', 'Gryth', '500gm**Single', 'Gfdh', '', '', '', ''),
(14, 'Custom-cake-order', 'Pending', 'wrtcmpasgh', '2023-02-23 13:48:19', '-', '-', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677139051/Custom_order/gysnmninhi0vormywg7d.jpg', 'None', 'None', 'Gryth', '500gm**Single', 'Gfdh', '', '', '', ''),
(15, 'Custom-cake-order', 'Pending', 'ofngelhirq', '2023-02-23 13:49:37', '-', '-', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677139051/Custom_order/gysnmninhi0vormywg7d.jpg', 'None', 'None', 'Gryth', '500gm**Single', 'Gfdh', '', '', '', ''),
(16, 'Custom-cake-order', 'Pending', 'exyhvoilan', '2023-02-23 13:50:29', '-', '-', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677139051/Custom_order/gysnmninhi0vormywg7d.jpg', 'None', 'None', 'Gryth', '500gm**Single', 'Gfdh', 'Dhdg', 'Eheh', 'Shsg', ''),
(17, 'Custom-cake-order', 'Pending', 'wrjvbiouns', '2023-02-23 13:50:33', '-', '-', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677139051/Custom_order/gysnmninhi0vormywg7d.jpg', 'None', 'None', 'Gryth', '500gm**Single', 'Gfdh', 'Dhdg', 'Eheh', 'Shsg', '394101'),
(18, 'order-item-0', 'Id1', 'category-umlvqkyisb', '500gm', 'Vvb', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(19, 'Order', '48072165', 'Pending', '2023-02-23 14:22:17', 'Online payment pending', 'None', '-', '-', '-', '400', '', '', '', '', '', '6354757251'),
(20, 'Order', '29351407', 'Pending', '2023-02-23 14:22:58', 'Online payment pending', 'None', '-', '-', '-', '400', '', '', '', '', '', '6354757251'),
(21, 'Order', '76143890', 'Pending', '2023-02-23 14:23:35', 'Online payment pending', 'None', '-', '-', '-', '400', '', '', '', '', '', '6354757251'),
(22, 'Order', '61937842', 'Pending', '2023-02-23 14:24:03', 'Online payment pending', 'None', '-', '-', '-', '400', '', '', '', '', '', '6354757251'),
(23, 'Order', '89314205', 'Pending', '2023-02-23 14:24:44', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', '', '6354757251'),
(24, 'Order', '13420867', 'Pending', '2023-02-23 14:25:07', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', '', '6354757251'),
(25, 'Order', '14038975', 'Pending', '2023-02-23 14:25:17', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', '', '6354757251'),
(26, 'Order', '96371842', 'Pending', '2023-02-23 14:25:28', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', '', '6354757251'),
(27, 'Order', '95064123', 'Pending', '2023-02-23 14:25:49', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', '', '6354757251'),
(28, 'Order', '41608952', 'Pending', '2023-02-23 14:26:16', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(29, 'Order', '917350', 'Pending', '2023-02-23 14:26:43', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(37, 'Order', '627493', 'Pending', '2023-02-26 22:46:42', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(38, 'Order', '432185', 'Pending', '2023-02-26 22:48:48', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(39, 'Order', '698027', 'Pending', '2023-02-26 22:49:48', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(40, 'Order', '165032', 'Pending', '2023-02-26 22:49:48', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(41, 'Order', '726358', 'Pending', '2023-02-26 22:50:18', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(42, 'Order', '243178', 'Pending', '2023-02-26 22:50:19', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(43, 'Order', '012956', 'Pending', '2023-02-26 22:50:19', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(44, 'Order', '839507', 'Pending', '2023-02-26 22:50:20', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(45, 'Order', '142789', 'Pending', '2023-02-26 22:50:20', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(46, 'Order', '460712', 'Pending', '2023-02-26 22:50:20', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(47, 'Order', '813209', 'Pending', '2023-02-26 22:50:20', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(48, 'Order', '289436', 'Pending', '2023-02-26 22:50:20', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(49, 'Order', '602895', 'Pending', '2023-02-26 22:50:45', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(50, 'Order', '382510', 'Pending', '2023-02-26 22:52:23', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(51, 'Order', '748650', 'Pending', '2023-02-26 22:52:44', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(52, 'Order', '528074', 'Pending', '2023-02-26 22:54:14', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(53, 'Order', '925306', 'Pending', '2023-02-26 22:54:45', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(54, 'Order', '208561', 'Pending', '2023-02-26 22:55:40', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(55, 'Order', '984617', 'Pending', '2023-02-26 22:55:52', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(56, 'Order', '574936', 'Pending', '2023-02-26 22:55:53', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(57, 'Order', '469850', 'Pending', '2023-02-26 22:55:55', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(58, 'Order', '975621', 'Pending', '2023-02-26 23:04:18', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(59, 'Order', '492607', 'Pending', '2023-02-26 23:04:18', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(61, 'Order', '875210', 'Pending', '2023-02-26 23:22:51', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(62, 'Order', '218763', 'Pending', '2023-02-26 23:23:11', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(63, 'Order', '458702', 'Pending', '2023-02-26 23:23:35', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(65, 'Order', '892675', 'Pending', '2023-02-26 23:29:52', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(67, 'Order', '590628', 'Pending', '2023-02-27 12:13:45', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(69, 'Order', '961738', 'Pending', '2023-02-27 13:23:32', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(73, 'Order', '308264', 'Pending', '2023-02-27 13:59:25', 'Online payment pending', 'None', '-', '-', '-', '400', 'Cuccuc', 'B h h', 'Surat', '394101', 'Keyur', '6354757251'),
(74, 'Order', '193725', 'Complete', '2023-02-27 13:59:27', 'Online payment pending', 'None', '-', '-', '-', '400', 'Cuccuc', 'B h h', 'Surat', '394101', 'Keyur', '6354757251'),
(75, 'watchlist', 'uxispkdlqy', 'category-xczdaewuhp', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(76, 'address-3', 'Keyur', 'A-201, shayam antillia', 'Mota varachha', 'Surat ', '394101', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(77, 'Custom-cake-order', 'Complete', 'gicxelobnu', '2023-02-27 22:18:27', '-', '-', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677515572/Custom_order/v89ri1znwvhbt1rdlsp5.jpg', 'None', 'None', 'Keyur', '2Kg**Multiple', 'Ke', 'Cuccuc', 'B h h', 'Surat', '394101'),
(78, 'Custom-cake-order', 'Pending', 'hflzbajmrt', '2023-02-27 22:18:51', '-', '-', 'http://res.cloudinary.com/dsc8egt36/image/upload/v1677515572/Custom_order/v89ri1znwvhbt1rdlsp5.jpg', 'None', 'None', 'Keyur', '2Kg**Multiple', 'Ke', 'Cuccuc', 'B h h', 'Surat', '394101'),
(79, 'order-item-42', 'uxispkdlqy', 'category-xczdaewuhp', '500gm', 'Keyur', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(80, 'Order', '241675', 'Pending', '2023-02-27 23:16:00', 'Online payment pending', 'None', '-', '-', '-', '400', 'A-201, shayam antillia', 'Mota varachha', 'Surat ', '394101', 'Keyur', '6354757251'),
(81, 'Order', '167492', 'Pending', '2023-02-27 23:19:09', 'Online payment pending', 'None', '-', '-', '-', '400', 'A-201, shayam antillia', 'Mota varachha', 'Surat ', '394101', 'Keyur', '6354757251'),
(82, 'Order', '457092', 'Pending', '2023-02-27 23:19:11', 'Online payment pending', 'None', '-', '-', '-', '400', 'A-201, shayam antillia', 'Mota varachha', 'Surat ', '394101', 'Keyur', '6354757251'),
(83, 'Order', '285409', 'Pending', '2023-02-27 23:19:58', 'Online payment pending', 'None', '-', '-', '-', '400', 'A-201, shayam antillia', 'Mota varachha', 'Surat ', '394101', 'Keyur', '6354757251'),
(84, 'Order', '502749', 'Pending', '2023-02-27 23:19:59', 'Online payment pending', 'None', '-', '-', '-', '400', 'A-201, shayam antillia', 'Mota varachha', 'Surat ', '394101', 'Keyur', '6354757251'),
(85, 'Order', '349285', 'Pending', '2023-02-27 23:21:15', 'Online payment pending', 'None', '-', '-', '-', '400', 'A-201, shayam antillia', 'Mota varachha', 'Surat ', '394101', 'Keyur', '6354757251'),
(86, 'Order', '164782', 'Pending', '2023-02-27 23:21:17', 'Online payment pending', 'None', '-', '-', '-', '400', 'A-201, shayam antillia', 'Mota varachha', 'Surat ', '394101', 'Keyur', '6354757251'),
(87, 'Order', '921763', 'Complete', '2023-02-27 23:22:05', 'Online payment pending', 'None', '-', '-', '2023-03-01', '400', 'A-201, shayam antillia', 'Mota varachha', 'Surat ', '394101', 'Keyur', '6354757251');

-- --------------------------------------------------------

--
-- Table structure for table `user-waovbyhpkcqn`
--

CREATE TABLE `user-waovbyhpkcqn` (
  `User_key` int(11) NOT NULL,
  `Option` varchar(100) DEFAULT NULL,
  `Data1` varchar(200) DEFAULT NULL,
  `Data2` varchar(200) DEFAULT NULL,
  `Data3` varchar(200) DEFAULT NULL,
  `Data4` varchar(200) DEFAULT NULL,
  `Data5` varchar(200) DEFAULT NULL,
  `Data6` varchar(200) DEFAULT NULL,
  `Data7` varchar(200) DEFAULT NULL,
  `Data8` varchar(200) DEFAULT NULL,
  `Data9` varchar(200) DEFAULT NULL,
  `Data10` varchar(100) DEFAULT NULL,
  `Data11` varchar(100) DEFAULT NULL,
  `Data12` varchar(100) DEFAULT NULL,
  `Data13` varchar(100) DEFAULT NULL,
  `Data14` varchar(100) DEFAULT NULL,
  `Data15` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user-waovbyhpkcqn`
--

INSERT INTO `user-waovbyhpkcqn` (`User_key`, `Option`, `Data1`, `Data2`, `Data3`, `Data4`, `Data5`, `Data6`, `Data7`, `Data8`, `Data9`, `Data10`, `Data11`, `Data12`, `Data13`, `Data14`, `Data15`) VALUES
(1, 'cart-id', '0', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'address', '0', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user-wyrhpbmqfgde`
--

CREATE TABLE `user-wyrhpbmqfgde` (
  `User_key` int(11) NOT NULL,
  `Option` varchar(100) DEFAULT NULL,
  `Data1` varchar(200) DEFAULT NULL,
  `Data2` varchar(200) DEFAULT NULL,
  `Data3` varchar(200) DEFAULT NULL,
  `Data4` varchar(200) DEFAULT NULL,
  `Data5` varchar(200) DEFAULT NULL,
  `Data6` varchar(200) DEFAULT NULL,
  `Data7` varchar(200) DEFAULT NULL,
  `Data8` varchar(200) DEFAULT NULL,
  `Data9` varchar(200) DEFAULT NULL,
  `Data10` varchar(100) DEFAULT NULL,
  `Data11` varchar(100) DEFAULT NULL,
  `Data12` varchar(100) DEFAULT NULL,
  `Data13` varchar(100) DEFAULT NULL,
  `Data14` varchar(100) DEFAULT NULL,
  `Data15` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user-wyrhpbmqfgde`
--

INSERT INTO `user-wyrhpbmqfgde` (`User_key`, `Option`, `Data1`, `Data2`, `Data3`, `Data4`, `Data5`, `Data6`, `Data7`, `Data8`, `Data9`, `Data10`, `Data11`, `Data12`, `Data13`, `Data14`, `Data15`) VALUES
(1, 'cart-id', '2', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'address', '0', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'Order', '290617', 'Pending', '2023-02-26 23:02:54', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251'),
(4, 'Order', '795821', 'Pending', '2023-02-26 23:04:07', 'Online payment pending', 'None', '-', '-', '-', '400', 'Dhdg', 'Eheh', 'Shsg', '394101', 'Keyru', '6354757251');

-- --------------------------------------------------------

--
-- Table structure for table `user-xlfmnrjighup`
--

CREATE TABLE `user-xlfmnrjighup` (
  `User_key` int(11) NOT NULL,
  `Option` varchar(100) DEFAULT NULL,
  `Data1` varchar(200) DEFAULT NULL,
  `Data2` varchar(200) DEFAULT NULL,
  `Data3` varchar(200) DEFAULT NULL,
  `Data4` varchar(200) DEFAULT NULL,
  `Data5` varchar(200) DEFAULT NULL,
  `Data6` varchar(200) DEFAULT NULL,
  `Data7` varchar(200) DEFAULT NULL,
  `Data8` varchar(200) DEFAULT NULL,
  `Data9` varchar(200) DEFAULT NULL,
  `Data10` varchar(100) DEFAULT NULL,
  `Data11` varchar(100) DEFAULT NULL,
  `Data12` varchar(100) DEFAULT NULL,
  `Data13` varchar(100) DEFAULT NULL,
  `Data14` varchar(100) DEFAULT NULL,
  `Data15` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user-xlfmnrjighup`
--

INSERT INTO `user-xlfmnrjighup` (`User_key`, `Option`, `Data1`, `Data2`, `Data3`, `Data4`, `Data5`, `Data6`, `Data7`, `Data8`, `Data9`, `Data10`, `Data11`, `Data12`, `Data13`, `Data14`, `Data15`) VALUES
(1, 'cart-id', '0', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'address', '2', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(47, 'watchlist', 'Id1', 'category-umlvqkyisb', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(49, 'cart-item', 'Id1', 'category-umlvqkyisb', '500gm', 'Bhargav', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(50, 'address-0', 'Keyur', 'Bbb', 'Mota varachha', 'Surat', '394101', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(51, 'address-1', 'Keyur', 'Bbb', 'Mota varachha', 'Surat', '394101', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(52, 'cart-item', 'Id1', 'category-umlvqkyisb', '500gm', 'Keyyr', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(53, 'cart-item', 'Id1', 'category-umlvqkyisb', '500gm', 'Keyur', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(54, 'Custom-order', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(55, 'Custom-cake-order', 'Pending', 'jqzpfgaeuc', '2023-02-23 10:04:46', '-', '-', 'https://res.cloudinary.com/dsc8egt36/image/upload/v1676782579/cld-sample-4.jpg', 'None', 'None', 'Product information', '500gm**Chocolate', 'Keyur', 'A-201, Shayam antillia', 'Mota varchha', 'Surat', '394101'),
(56, 'Custom-cake-order', 'Pending', 'xrpbnozeyl', '2023-02-23 10:06:10', '-', '-', 'https://res.cloudinary.com/dsc8egt36/image/upload/v1676782579/cld-sample-4.jpg', 'None', 'None', 'Product information', '500gm**Chocolate', 'Keyur', 'A-201, Shayam antillia', 'Mota varchha', 'Surat', '394101'),
(57, 'cart-item', 'Id1', 'category-umlvqkyisb', '500gm', 'Keyur', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `userdata`
--

CREATE TABLE `userdata` (
  `User_id` int(11) NOT NULL,
  `Username` varchar(100) NOT NULL,
  `Mobilenumber` varchar(30) NOT NULL,
  `Password` varchar(1000) NOT NULL,
  `Account_create_time` varchar(100) NOT NULL,
  `Userdata` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userdata`
--

INSERT INTO `userdata` (`User_id`, `Username`, `Mobilenumber`, `Password`, `Account_create_time`, `Userdata`) VALUES
(6, 'Keyur ', '6354757251', '$2y$10$scfMvTUKG6AKTiLtoOC7YOVCkzeWWl55HIbAHa..oUu75laAIkPaS', '2023-02-22 20:56:25', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyZGF0YSI6InVzZXItbWl1Z2xid2Zhb25yIn0.MhQuahP5rqn6mZPacNLbl5q4Hi2X2R4oYAYSAPs8R2I'),
(7, 'Keyur ', '6354757251', '$2y$10$scfMvTUKG6AKTiLtoOC7YOVCkzeWWl55HIbAHa..oUu75laAIkPaS', '2023-02-22 20:56:51', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyZGF0YSI6InVzZXItYWJjeGpnZW5sbXB2In0.9vab6OOmG9Dkv-ukt_z78hIHlG1AN2A-xzvu3kekuww'),
(8, 'Keyur', '6354757251', '$2y$10$WmgZsOoJ/9K8d2nm7T/d5eJNpFs64aeMSloCt4YEkQLkyKX6F5TLy', '2023-02-24 22:33:41', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyZGF0YSI6InVzZXItd3lyaHBibXFmZ2RlIn0.JBlhXfdU8UXQzWSbX0lsL27eB7DEjr-V6rMw9niRnx4');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin-panel`
--
ALTER TABLE `admin-panel`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `banner_data`
--
ALTER TABLE `banner_data`
  ADD PRIMARY KEY (`Banner_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`Category_key`);

--
-- Indexes for table `category-flebtoyuic`
--
ALTER TABLE `category-flebtoyuic`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `category-moxdtalnrz`
--
ALTER TABLE `category-moxdtalnrz`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `category-ohjzwflcyt`
--
ALTER TABLE `category-ohjzwflcyt`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `category-pvuladfoqb`
--
ALTER TABLE `category-pvuladfoqb`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `category-qatdkgmcjn`
--
ALTER TABLE `category-qatdkgmcjn`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `category-sqbnhltefv`
--
ALTER TABLE `category-sqbnhltefv`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `category-uxfblksacm`
--
ALTER TABLE `category-uxfblksacm`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `category-vgsytxejqp`
--
ALTER TABLE `category-vgsytxejqp`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `category-wuzdpvkcth`
--
ALTER TABLE `category-wuzdpvkcth`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `category-xczdaewuhp`
--
ALTER TABLE `category-xczdaewuhp`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `custom-cake-order`
--
ALTER TABLE `custom-cake-order`
  ADD PRIMARY KEY (`Custom-cake-id`);

--
-- Indexes for table `delivery_location`
--
ALTER TABLE `delivery_location`
  ADD PRIMARY KEY (`Delivery_location_key`);

--
-- Indexes for table `delivery_location_suggesstion`
--
ALTER TABLE `delivery_location_suggesstion`
  ADD PRIMARY KEY (`Suesstion_key`);

--
-- Indexes for table `flmnavopxg`
--
ALTER TABLE `flmnavopxg`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `jraifgcpoutevmn`
--
ALTER TABLE `jraifgcpoutevmn`
  ADD PRIMARY KEY (`User_key`);

--
-- Indexes for table `notification_data`
--
ALTER TABLE `notification_data`
  ADD PRIMARY KEY (`Notification_id`);

--
-- Indexes for table `nsbirtkhzlyaudo`
--
ALTER TABLE `nsbirtkhzlyaudo`
  ADD PRIMARY KEY (`User_key`);

--
-- Indexes for table `order_data`
--
ALTER TABLE `order_data`
  ADD PRIMARY KEY (`Order_key`);

--
-- Indexes for table `order_product_data`
--
ALTER TABLE `order_product_data`
  ADD PRIMARY KEY (`Order_product_key`);

--
-- Indexes for table `party_decoration_image`
--
ALTER TABLE `party_decoration_image`
  ADD PRIMARY KEY (`Banner_id`);

--
-- Indexes for table `refund_data`
--
ALTER TABLE `refund_data`
  ADD PRIMARY KEY (`Refund_key`);

--
-- Indexes for table `status_data`
--
ALTER TABLE `status_data`
  ADD PRIMARY KEY (`Status_id`);

--
-- Indexes for table `user-abcxjgenlmpv`
--
ALTER TABLE `user-abcxjgenlmpv`
  ADD PRIMARY KEY (`User_key`);

--
-- Indexes for table `user-miuglbwfaonr`
--
ALTER TABLE `user-miuglbwfaonr`
  ADD PRIMARY KEY (`User_key`);

--
-- Indexes for table `user-waovbyhpkcqn`
--
ALTER TABLE `user-waovbyhpkcqn`
  ADD PRIMARY KEY (`User_key`);

--
-- Indexes for table `user-wyrhpbmqfgde`
--
ALTER TABLE `user-wyrhpbmqfgde`
  ADD PRIMARY KEY (`User_key`);

--
-- Indexes for table `user-xlfmnrjighup`
--
ALTER TABLE `user-xlfmnrjighup`
  ADD PRIMARY KEY (`User_key`);

--
-- Indexes for table `userdata`
--
ALTER TABLE `userdata`
  ADD PRIMARY KEY (`User_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin-panel`
--
ALTER TABLE `admin-panel`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `banner_data`
--
ALTER TABLE `banner_data`
  MODIFY `Banner_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `Category_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `category-flebtoyuic`
--
ALTER TABLE `category-flebtoyuic`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category-moxdtalnrz`
--
ALTER TABLE `category-moxdtalnrz`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `category-ohjzwflcyt`
--
ALTER TABLE `category-ohjzwflcyt`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category-pvuladfoqb`
--
ALTER TABLE `category-pvuladfoqb`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category-qatdkgmcjn`
--
ALTER TABLE `category-qatdkgmcjn`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category-sqbnhltefv`
--
ALTER TABLE `category-sqbnhltefv`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category-uxfblksacm`
--
ALTER TABLE `category-uxfblksacm`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category-vgsytxejqp`
--
ALTER TABLE `category-vgsytxejqp`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category-wuzdpvkcth`
--
ALTER TABLE `category-wuzdpvkcth`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `category-xczdaewuhp`
--
ALTER TABLE `category-xczdaewuhp`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `custom-cake-order`
--
ALTER TABLE `custom-cake-order`
  MODIFY `Custom-cake-id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `delivery_location`
--
ALTER TABLE `delivery_location`
  MODIFY `Delivery_location_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `delivery_location_suggesstion`
--
ALTER TABLE `delivery_location_suggesstion`
  MODIFY `Suesstion_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `flmnavopxg`
--
ALTER TABLE `flmnavopxg`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jraifgcpoutevmn`
--
ALTER TABLE `jraifgcpoutevmn`
  MODIFY `User_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `notification_data`
--
ALTER TABLE `notification_data`
  MODIFY `Notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `nsbirtkhzlyaudo`
--
ALTER TABLE `nsbirtkhzlyaudo`
  MODIFY `User_key` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_data`
--
ALTER TABLE `order_data`
  MODIFY `Order_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `order_product_data`
--
ALTER TABLE `order_product_data`
  MODIFY `Order_product_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `party_decoration_image`
--
ALTER TABLE `party_decoration_image`
  MODIFY `Banner_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `refund_data`
--
ALTER TABLE `refund_data`
  MODIFY `Refund_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `status_data`
--
ALTER TABLE `status_data`
  MODIFY `Status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `user-abcxjgenlmpv`
--
ALTER TABLE `user-abcxjgenlmpv`
  MODIFY `User_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user-miuglbwfaonr`
--
ALTER TABLE `user-miuglbwfaonr`
  MODIFY `User_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT for table `user-waovbyhpkcqn`
--
ALTER TABLE `user-waovbyhpkcqn`
  MODIFY `User_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user-wyrhpbmqfgde`
--
ALTER TABLE `user-wyrhpbmqfgde`
  MODIFY `User_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user-xlfmnrjighup`
--
ALTER TABLE `user-xlfmnrjighup`
  MODIFY `User_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `userdata`
--
ALTER TABLE `userdata`
  MODIFY `User_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
