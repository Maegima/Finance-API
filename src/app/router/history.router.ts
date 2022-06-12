import express ,{ Request, Response, Router, NextFunction } from 'express';
import { HistoryRepository } from 'repository';

const router: Router = express.Router();
//const controller: UsersController = new UsersController(usersRepository);

router.get("/history", 
async(request: Request, response: Response, next: NextFunction) => {
    const usersRepository = new HistoryRepository()
    usersRepository.findAll()
        .then((data) => response.status(200).json(data))
        .catch((error) => response.status(500).json({ 'error': error }));
});

export const HistoryRouter: Router = router;