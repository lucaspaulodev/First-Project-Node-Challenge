import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const getIncomes = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((income, transaction) => (income += transaction.value), 0);
    const getOutcomes = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((income, transaction) => (income += transaction.value), 0);

    const totalBalance = getIncomes - getOutcomes;

    return {
      income: getIncomes,
      outcome: getOutcomes,
      total: totalBalance,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
