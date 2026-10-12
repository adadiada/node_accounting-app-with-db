const { sequelize } = require('../../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_At',
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'users',
    updatedAt: false,
  },
);

const normalizeUser = ({ id, name }) => {
  return {
    id,
    name,
  };
};

const getAll = async () => {
  const userAll = await User.findAll({
    order: [['id', 'ASC']],
  });

  return userAll;
};

const getById = async (id) => {
  const userById = await User.findByPk(+id);

  return userById;
};

const create = async (name) => {
  const userCreate = await User.create({ name });

  return userCreate;
};

const upDate = async ({ id, name }) => {
  const userUpDate = await User.update({ id, name }, { where: { id } });

  return userUpDate;
};

const deleteById = async (id) => {
  const userDelete = await User.destroy({ where: { id } });

  return userDelete;
};

module.exports = {
  getAll,
  getById,
  create,
  upDate,
  deleteById,
  normalizeUser,
};
