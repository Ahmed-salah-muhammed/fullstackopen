# CV Application

A dynamic web application built with React that allows users to create and edit a professional CV in real-time. This project focuses on state management, component reusability, and a clean user interface.

## Table of Contents
* Overview
* Features
* Tech Stack
* Project Structure
* Installation and Setup
* Available Scripts

## Overview
The CV Application is designed to simplify the process of building a resume. It features an interactive interface where users can input personal details, educational background, and professional experience, then toggle between Edit and Preview modes to see the final result instantly.

## Features
* General Information: Input fields for name, email, and phone number.
* Educational Experience: Add school names, titles of study, and dates of study.
* Practical Experience: Add company names, position titles, main tasks, and duration of employment.
* Edit/Submit Toggle: Seamlessly switch between editing data and viewing the formatted output.
* Responsive Design: Optimized for both desktop and mobile viewing.

## Tech Stack
* Frontend: React.js
* Build Tool: Vite
* Styling: CSS3
* Linting: ESLint

## Project Structure
The project follows a modular component-based architecture:

```text
CVApplication/
├── public/              # Static assets (icons, etc.)
├── src/
│   ├── assets/          # Images and global styles
│   ├── components/      # Reusable UI components (Input, Button, Section)
│   ├── App.jsx          # Main application logic and state
│   ├── main.jsx         # Entry point
│   └── index.css        # Global CSS
├── eslint.config.js     # Linting rules
├── index.html           # Main HTML template
├── package.json         # Project dependencies and scripts
└── vite.config.js       # Vite configuration
