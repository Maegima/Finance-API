import express ,{ Request, Response, Router, NextFunction } from 'express';
import { FinancesRepository, TypesRepository } from 'repository';

const router: Router = express.Router();
//const controller: UsersController = new UsersController(usersRepository);

router.get("/finances", 
async(request: Request, response: Response, next: NextFunction) => {
    const usersRepository = new FinancesRepository()
    usersRepository.findAll()
        .then((data) => response.status(200).json(data))
        .catch((error) => response.status(500).json({ 'error': error }));
});

router.get("/types", async(request: Request, response: Response, next: NextFunction) => {
    const typesRepository = new TypesRepository()
    typesRepository.findAll()
        .then((data) => response.status(200).json(data))
        .catch((error) => response.status(500).json({ 'error': error }));
});

export const FinanceRouter: Router = router;