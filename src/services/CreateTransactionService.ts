import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title,value,type}: RequestDTO) : Transaction {

    const {total} = this.transactionsRepository.getBalance();

    if(type === 'outcome' && total < value){
      throw Error('Need more income');
    }

    if(type != 'income' && type != 'outcome'){
      throw Error('Invalid type');
    }

    const trans = this.transactionsRepository.create({title,value,type});
    return trans;
  }
}

export default CreateTransactionService;
