import express ,{ Request, Response, Router, NextFunction } from 'express';
import { FinancesRepository, TypesRepository } from 'repository';

const router: Router = express.Router();
const financesRepository = new FinancesRepository();
const typesRepository = new TypesRepository();

router.get("/finances", 
async(request: Request, response: Response, next: NextFunction) => {
    financesRepository.findAll()
        .then((data) => response.status(200).json(data))
        .catch((error) => response.status(500).json({ 'error': error }));
});

router.post("/finanece",
async(request: Request, response: Response, next: NextFunction) => {
    const fields = ["id", "value", "type", "description", "source", "destination", "reference"]
    var finance: any = {};
    Object.keys(request.body).forEach((key) => {
        if(fields.includes(key))   
            finance[key] = request.body[key];
        });
    financesRepository.insert(finance)
        .then((data) => response.status(200).json(data.identifiers))
        .catch((error) => response.status(500).json({ 'error': error }));
});

router.get("/finance/types", async(request: Request, response: Response, next: NextFunction) => {
    typesRepository.findAll()
        .then((data) => response.status(200).json(data))
        .catch((error) => response.status(500).json({ 'error': error }));
});

router.post("/finance/type", 
async(request: Request, response: Response, next: NextFunction) => {
    const {name, description, asset} = request.body;
    typesRepository.insert({name, description, asset})
        .then((data) => response.status(200).json(data.identifiers))
        .catch((error) => response.status(500).json({ 'error': error }));
});

export const FinanceRouter: Router = router;