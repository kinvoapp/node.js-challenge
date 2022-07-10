import { Test, TestingModule } from '@nestjs/testing';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { Expense } from './entities/expense.entity';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';

describe('ExpenseController', () => {
  let expenseController: ExpenseController;
  let model: CreateExpenseDto;
  // let expenseList: Expense[] = [new Expense({ title: 'testing', description: 'expense object for testing', value: 10 })]
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseController],
      providers: [
        {
          provide: ExpenseService,
          useValue: {
            create: jest.fn().mockResolvedValue("This action adds a new expense"),
            // findAll: jest.fn().mockResolvedValue(expenseList),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn()
          }
        }
      ],
    }).compile();

    expenseController = module.get<ExpenseController>(ExpenseController);
  });

  describe('expenseController', () => {
    it('should be defined', () => {
      expect(expenseController).toBeDefined();
      expect(ExpenseService).toBeDefined();
    });

    it('error', async () => {
      let result = await expenseController.create(model);
      expect(result).toEqual("This action adds a new expense")
    })
  })


});
