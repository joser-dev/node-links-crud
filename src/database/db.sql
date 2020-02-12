CREATE DATABASE IF NOT EXISTS database_links;

USE database_links;

/* USERS TABLE */
CREATE TABLE users(
    id SERIAL,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(255) NOT NULL,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30),
    CONSTRAINT pk_users PRIMARY KEY(id),
    CONSTRAINT uq_username UNIQUE(username)
) ENGINE = InnoDB;

DESCRIBE users;

/* LINKS TABLE */
CREATE TABLE links(
    id SERIAL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    icon VARCHAR(255) NOT NULL DEFAULT "https://cdn2.iconfinder.com/data/icons/antivirus-internet-security/33/broken_link-512.png",
    description TEXT,
    user_id BIGINT UNSIGNED NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_links PRIMARY KEY(id),
    CONSTRAINT fk_links_users FOREIGN KEY(user_id)
            REFERENCES users(id)
            ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB;