class Project {
  constructor(data = {}) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.type = data.type;
    this.settings = data.settings;
    this.output = data.output;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

module.exports = Project;
