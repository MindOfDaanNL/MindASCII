class Template {
  constructor(data = {}) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.content = data.content;
    this.output = data.output;
    this.settings = data.settings;
    this.isCustom = data.isCustom || false;
    this.createdAt = data.createdAt;
  }
}

module.exports = Template;
