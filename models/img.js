const Sequelize = require('sequelize');

module.exports = class Img extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      key: {
        type: Sequelize.STRING(),
        allowNull: false,
      },

    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Img',
      tableName: 'img',
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {

  }
};
