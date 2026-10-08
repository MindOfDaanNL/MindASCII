class User {
  constructor(data = {}) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.passwordHash = data.passwordHash;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

module.exports = User;
