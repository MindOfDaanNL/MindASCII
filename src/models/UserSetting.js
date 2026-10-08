class UserSetting {
  constructor(data = {}) {
    this.id = data.id;
    this.userId = data.userId;
    this.theme = data.theme || 'dark';
    this.defaultWidth = data.defaultWidth || 80;
    this.defaultUsage = data.defaultUsage || 'Terminal';
    this.defaultFont = data.defaultFont || 'Standard';
    this.defaultBorder = data.defaultBorder || 'single';
    this.defaultCharset = data.defaultCharset || 'unicode';
    this.autoGenerate = data.autoGenerate || false;
    this.autoSave = data.autoSave || false;
    this.editorFontSize = data.editorFontSize || 14;
    this.previewFontSize = data.previewFontSize || 14;
    this.updatedAt = data.updatedAt;
  }
}

module.exports = UserSetting;
