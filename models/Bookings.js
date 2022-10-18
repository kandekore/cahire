const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Bookings extends Model {}

Bookings.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    car: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pickup: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    dropoff: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "bookings",
  }
);

module.exports = Bookings;
