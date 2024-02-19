function determineRole(prompt) {
    let role = 'User'; // Default role

    if (prompt.match(/admin|administrator/i)) {
        role = 'Admin';
    } else if (prompt.match(/support|help/i)) {
        role = 'Support Agent';
    } else if (prompt.match(/sales|purchase/i)) {
        role = 'Sales Representative';
    } else if (prompt.match(/tech|technical/i)) {
        role = 'Technical Support Engineer';
    } else if (prompt.match(/guest|visitor/i)) {
        role = 'Guest';
    }

    return role;
}

module.exports = { determineRole };