exports.isLoggedIn = () => localStorage.getItem('token')
exports.logout = () => { localStorage.clear(); }
exports.getUserId = () => localStorage.getItem('id')
exports.getToken = () => localStorage.getItem('token')