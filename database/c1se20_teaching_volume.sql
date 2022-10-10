-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 10, 2022 at 09:31 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `c1se20.teaching_volume`
--

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `IdDepartment` varchar(20) NOT NULL,
  `DepartmentName` varchar(200) NOT NULL,
  `Description` varchar(250) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`IdDepartment`, `DepartmentName`, `Description`, `created_at`, `updated_at`) VALUES
('MIS', 'Management Information Systems', '', '2022-10-07 15:20:39', '2022-10-07 15:20:39'),
('NS', 'Network Security', '', '2022-10-07 15:20:39', '2022-10-07 15:20:39'),
('SE', 'Software Engineer', '', '2022-10-07 15:20:39', '2022-10-07 15:20:39');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `IdRole` int(11) NOT NULL,
  `RoleName` varchar(150) NOT NULL,
  `Description` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`IdRole`, `RoleName`, `Description`, `created_at`, `updated_at`) VALUES
(1, 'Admin', '', '2022-10-07 15:08:25', '2022-10-07 15:08:25'),
(2, 'Dean', '', '2022-10-07 15:08:25', '2022-10-07 15:08:25'),
(3, 'Head', 'Head of Department', '2022-10-07 15:08:25', '2022-10-07 15:08:25'),
(4, 'Lecturer', '', '2022-10-07 15:08:25', '2022-10-07 15:08:25');

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `IdSubject` int(11) NOT NULL,
  `Letter` varchar(20) NOT NULL,
  `Number` smallint(5) UNSIGNED NOT NULL,
  `SubjectName` varchar(200) NOT NULL,
  `Credit` tinyint(3) UNSIGNED NOT NULL,
  `Type` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`IdSubject`, `Letter`, `Number`, `SubjectName`, `Credit`, `Type`, `created_at`, `updated_at`) VALUES
(1, 'CMU-CS', 252, 'Introduction to Network & Telecommunications Technology', 3, 'LEC', '2022-10-04 15:39:02', '2022-10-04 15:39:02'),
(2, 'CMU-SE', 214, 'Requirements Engineering', 3, 'LEC', '2022-10-04 15:39:02', '2022-10-04 15:39:02'),
(3, 'CMU-CS', 297, 'Đồ Án CDIO', 1, 'DIS', '2022-10-06 02:10:36', '2022-10-06 03:44:11'),
(4, 'CMU-CS', 246, 'Application Development Practices', 3, 'LEC', '2022-10-06 03:21:42', '2022-10-06 03:21:42');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `Username` varchar(80) NOT NULL,
  `Password` varchar(150) NOT NULL,
  `IdLecturer` bigint(20) UNSIGNED DEFAULT NULL,
  `FirstName` varchar(150) NOT NULL,
  `LastName` varchar(150) NOT NULL,
  `IdFaculty` varchar(20) DEFAULT NULL,
  `IdDepartment` varchar(20) DEFAULT NULL,
  `IdRole` int(11) DEFAULT NULL,
  `Remember_token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`Username`, `Password`, `IdLecturer`, `FirstName`, `LastName`, `IdFaculty`, `IdDepartment`, `IdRole`, `Remember_token`, `created_at`, `updated_at`) VALUES
('dangvantruc', 'vantruc', 252666777002, 'Đặng Văn', 'Trúc', NULL, 'NS', 3, NULL, '2022-10-07 15:27:14', '2022-10-07 15:27:14'),
('huynhbanhan', 'banhan', NULL, 'Huỳnh Bá', 'Nhân', NULL, NULL, 1, NULL, '2022-10-07 15:27:14', '2022-10-07 15:27:14'),
('leanhkhanh', 'anhkhanh', 25211320802, 'Lê Anh', 'Khánh', NULL, 'SE', 3, NULL, '2022-10-07 15:27:14', '2022-10-07 15:27:14'),
('ngoquochieu', 'quochieu', 25233130802, 'Ngô Quốc', 'Hiếu', NULL, 'SE', 2, NULL, '2022-10-07 15:27:14', '2022-10-07 15:27:14'),
('nguyendinhtin', 'dinhtin', 25444999333, 'Nguyễn Đình', 'Tin', NULL, 'NS', 4, NULL, '2022-10-07 15:28:40', '2022-10-07 15:28:40'),
('nguyenthoangoanh', 'hoangoanh', 25222333111, 'Nguyễn Thị', 'Hoàng Oanh', NULL, 'MIS', 4, NULL, '2022-10-07 15:28:40', '2022-10-07 15:28:40'),
('nguyenvanmy', 'vanmy', 24222333111, 'Nguyễn Văn', 'Mỹ', NULL, 'SE', 4, NULL, '2022-10-07 15:27:14', '2022-10-07 15:27:14'),
('totngochuyen', 'ngochuyen', 25233809999, 'Tô Thị', 'Ngọc Huyền', NULL, 'MIS', 3, NULL, '2022-10-07 15:27:14', '2022-10-07 15:27:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`IdDepartment`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`IdRole`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`IdSubject`),
  ADD UNIQUE KEY `Unique_Letter_Number` (`Letter`,`Number`) USING BTREE;

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Username`),
  ADD UNIQUE KEY `Lecturer_id` (`IdLecturer`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `IdRole` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `IdSubject` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
