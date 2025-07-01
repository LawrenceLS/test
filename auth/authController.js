const bcrypt = require('bcrypt');

const users = [
    {
        username: "admin",
        // hashed 'password123' with bcrypt hash rounds 10
        password: "$2b$10$yKuprYmHK9Q6gNqvZkCv..K5ow0O85sTHdlM7SzcfZzNJMGhvH26a"
    }
];

async function login(req, res) {
    console.log('Login attempt:', req.body);
    const { username, password, remember } = req.body;
    const user = users.find(u => u.username === username);
    console.log('User found:', user);

    if (!user) {
        console.log('No user found');
        return res.redirect('/admin/login?error=Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', passwordMatch);
    if (!passwordMatch) {
        return res.redirect('/admin/login?error=Invalid credentials');
    }

    req.session.user = user;
    console.log('User session set:', req.session.user);

    if (remember === 'on') {
        req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
    } else {
        req.session.cookie.expires = false; // session cookie
    }

    return res.redirect('/admin/dashboard');
}

function logout(req, res) {
    req.session.destroy(() => {
        res.redirect('/admin/login');
    });
}

module.exports = { login, logout };
