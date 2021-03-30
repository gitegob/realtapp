import { Test, TestingModule } from '@nestjs/testing';
import mockdata from '../../test/mockData';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('Auth Controller', () => {
  let authController: AuthController;
  let testingModule: TestingModule;
  let spyService: AuthService;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useFactory: () => ({
            create: jest.fn(() => true),
            login: jest.fn(() => true),
          }),
        },
      ],
    }).compile();

    authController = testingModule.get<AuthController>(AuthController);
    spyService = testingModule.get(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('User should be able to signup', async () => {
    authController.signUp(mockdata.signup);
    expect(spyService.create).toHaveBeenCalledWith(mockdata.signup);
  });

  it('User should be able to login', async () => {
    authController.login(mockdata.login);
    expect(spyService.login).toHaveBeenCalledWith(mockdata.login);
  });
});
