import express ,{ Request, Response, Router, NextFunction } from 'express';
import { HistoryRepository } from 'repository';
import { DefaultMessage, Parameters } from 'app/service';

const router: Router = express.Router();
const historyRepository = new HistoryRepository()

router.get("/history", 
async(request: Request, response: Response, next: NextFunction) => {
    historyRepository.findAll()
        .then((data) => response.status(200).json(data))
        .catch((error) => response.status(500).json({ 'error': error }));
});

router.post("/account", 
async(request: Request, response: Response, next: NextFunction) => {
    const parameters = new Parameters({
        optional: ["earned", "spent", "type"],
        required: ["source", "datetime"]
    })

    var history = parameters.parseBody(request.body);
    if(Array.isArray(history))
        response.status(401).json({'error': DefaultMessage.missingParameters(history)});
    else
        historyRepository.insert(history)
            .then((data) => response.status(200).json(data.identifiers))
            .catch((error) => response.status(500).json({ 'error': error }));
});

export const HistoryRouter: Router = router;