const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Car extends Model {}

Car.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Marque: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Range: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DriveType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Transmission: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    BodyStyle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FuelType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DriveType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    location_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "location",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "car",
  }
);

module.exports = Car;
