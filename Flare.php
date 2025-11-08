.sidebar {
    width: 250px;
    background-color: #333;
    color: #fff;
    padding: 20px;
    transition: background-color 0.3s;
    animation: slideIn 0.5s ease-in-out;
}

@keyframes slideIn {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
}

.sidebar .logo {
    font-size: 1.5em;
    margin-bottom: 20px;
    color: #ff6b6b;
}

.sidebar .menu {
    list-style: none;
    padding: 0;
}

.sidebar .menu li {
    margin: 15px 0;
}

.sidebar .menu a {
    color: #fff;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: color 0.3s;
}

.sidebar .menu a.active,
.sidebar .menu a:hover {
    color: #ff6b6b;
}

.sidebar .menu a i {
    margin-right: 10px;
}

.main-content {
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto;
}


body.dark-mode .sidebar {
    background-color: #444;
}
