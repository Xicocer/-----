function adminLogIn(req, res){
    const { username, password } = req.body;
    if (username === process.env.ADMIN_USERNAME && 
        password === process.env.ADMIN_PASSWORD) {
        req.session.isAdmin = true;
        return res.status(200).json({ message: 'Успешный вход в админку' });
    }

    return res.status(401).json({ message: 'Неверные учетные данные' });
}

function adminLogOut(req, res) {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Ошибка при выходе' });
        }
        return res.status(200).json({ message: 'Вы вышли из админки' });
    });
}

module.exports = {
    adminLogIn,
    adminLogOut
};