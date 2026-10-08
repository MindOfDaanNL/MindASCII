class SavedArt {
  constructor(data = {}) {
    this.id = data.id;
    this.userId = data.userId;
    this.name = data.name;
    this.output = data.output;
    this.settings = data.settings;
    this.createdAt = data.createdAt;
  }
}

module.exports = SavedArt;
