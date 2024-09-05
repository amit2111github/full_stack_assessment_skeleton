USE home_db;

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` varchar(100) DEFAULT NULL,
    `email` varchar(100) DEFAULT NULL
);

CREATE TABLE `home` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `street_address` varchar(255) DEFAULT NULL,
    `state` varchar(50) DEFAULT NULL,
    `zip` varchar(10) DEFAULT NULL,
    `sqft` float DEFAULT NULL,
    `beds` int DEFAULT NULL,
    `baths` int DEFAULT NULL,
    `list_price` float DEFAULT NULL
);

CREATE TABLE `user_interest` (
    `user_id` INT,
    `home_id` INT,
    PRIMARY KEY (`user_id`, `home_id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`),
    FOREIGN KEY (`home_id`) REFERENCES `home`(`id`)
);

INSERT INTO `user` (`username`, `email`) SELECT DISTINCT `username`, `email` FROM `user_home`;


INSERT INTO `home` (`street_address`, `state`, `zip`, `sqft`,`beds`,`baths`,`list_price`) SELECT DISTINCT `street_address`, `state`, `zip`, `sqft`,`beds`,`baths`,`list_price` FROM `user_home`;

INSERT INTO `user_interest` (`user_id`, `home_id`) SELECT u.id, h.id FROM (SELECT DISTINCT `username`, `email`, `street_address` FROM `user_home`) uh JOIN `user` u ON uh.username = u.username JOIN `home` h ON uh.street_address = h.street_address;

