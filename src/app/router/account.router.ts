import express ,{ Request, Response, Router, NextFunction } from 'express';
import { AccountsRepository } from 'repository';
import { DefaultMessage, Parameters } from 'app/service';

const router: Router = express.Router();
const accountsRepository = new AccountsRepository()

router.get("/accounts", 
async(request: Request, response: Response, next: NextFunction) => {
    accountsRepository.findAll()
        .then((data) => response.status(200).json(data))
        .catch((error) => response.status(500).json({ 'error': error }));
});

router.post("/account", 
async(request: Request, response: Response, next: NextFunction) => {
    const parameters = new Parameters({
        required: ["name", "description"]
    })

    var account = parameters.parseBody(request.body);
    if(Array.isArray(account))
        response.status(401).json({'error': DefaultMessage.missingParameters(account)});
    else
        accountsRepository.insert(account)
            .then((data) => response.status(200).json(data.identifiers))
            .catch((error) => response.status(500).json({ 'error': error }));
});

export const AccountRouter: Router = router;