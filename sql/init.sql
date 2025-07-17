CREATE DATABASE IF NOT EXISTS notesdb;
USE notesdb;

-- Users table
CREATE TABLE IF NOT EXISTS Users (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) UNIQUE NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    CreatedAt DATETIME NOT NULL,
    UpdatedAt DATETIME NOT NULL
);

-- Updated Notes table with UserId foreign key
DROP TABLE IF EXISTS Notes;
CREATE TABLE Notes (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(200) NOT NULL,
    Content TEXT NOT NULL,
    UserId INT NOT NULL,
    CreatedAt DATETIME NOT NULL,
    UpdatedAt DATETIME NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
);

-- Sample data
INSERT INTO Users (Username, Email, PasswordHash, CreatedAt, UpdatedAt) VALUES
('testuser', 'test@example.com', '$2a$11$dummy.hash.for.testing', NOW(), NOW());

INSERT INTO Notes (Title, Content, UserId, CreatedAt, UpdatedAt) VALUES
('Welcome Note', 'Welcome to your personal notes app!', 1, NOW(), NOW()),
('Sample Note', 'This is a sample note to get you started.', 1, NOW(), NOW());