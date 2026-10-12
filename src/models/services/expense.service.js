const { sequelize } = require('../../db');
const { DataTypes } = require('sequelize');

const expenses = [];

const Expense = sequelize.define(
  'Expense',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    spentAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
    },
    note: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'users',
      //   key: 'id',
      // },
    },
  },
  {
    tableName: 'expenses',
    updatedAt: false,
    createdAt: false,
  },
);

const normalizeExpense = ({
  id,
  title,
  amount,
  spentAt,
  category,
  note,
  userId,
}) => {
  return {
    id,
    title,
    amount,
    spentAt,
    category,
    note,
    userId,
  };
};

const getAll = async (userId, categories, from, to) => {
  // const result = await Expense.findAll();

  // return result;
  let exp = expenses;

  if (userId) {
    exp = exp.filter((item) => item.userId === +userId);
  }

  if (categories) {
    exp = exp.filter((item) => categories.includes(item.category));
  }

  if (from) {
    const afterDate = new Date(from);

    exp = exp.filter((item) => new Date(item.spentAt) > afterDate);
  }

  if (to) {
    const beforeDate = new Date(to);

    exp = exp.filter((item) => new Date(item.spentAt) < beforeDate);
  }

  return exp;
};

const getById = async (id) => {
  const resultById = await Expense.findByPk(id);

  return resultById;
};

const create = ({ id, userId, spentAt, title, amount, category, note }) => {
  const ex = {
    id: Date.now(),
    userId: +userId,
    spentAt,
    title,
    amount: +amount,
    category,
    note,
  };

  expenses.push(ex);

  return ex;
};

const upDate = ({ id, spentAt, title, amount, category, note }) => {
  const expensUpdate = expenses.find((e) => e.id === +id);

  if (!expensUpdate) {
    return null;
  }

  if (spentAt !== undefined) {
    expensUpdate.spentAt = spentAt;
  }

  if (title !== undefined) {
    expensUpdate.title = title;
  }

  if (amount !== undefined) {
    expensUpdate.amount = amount;
  }

  if (category !== undefined) {
    expensUpdate.category = category;
  }

  if (note !== undefined) {
    expensUpdate.note = note;
  }

  return expensUpdate;
};

const deleteById = (id) => {
  const index = expenses.findIndex((e) => e.id === +id);

  if (index === -1) {
    return null;
  }

  const [exp] = expenses.splice(index, 1);

  return exp;
};

// const resetExpenses = () => {
//   expenses = [];
// };

module.exports = {
  getAll,
  getById,
  create,
  upDate,
  deleteById,
  // resetExpenses,
  normalizeExpense,
};
