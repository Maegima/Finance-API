import express ,{ Request, Response, Router, NextFunction } from 'express';
import { FinancesRepository, TypesRepository } from 'repository';
import { Parameters, DefaultMessage } from 'app/service/';

const router: Router = express.Router();
const financesRepository = new FinancesRepository();
const typesRepository = new TypesRepository();

router.get("/finances", 
async(request: Request, response: Response, next: NextFunction) => {
    financesRepository.findAll()
        .then((data) => response.status(200).json(data))
        .catch((error) => response.status(500).json({ 'error': error }));
});

router.get("/finance/types", async(request: Request, response: Response, next: NextFunction) => {
    typesRepository.findAll()
        .then((data) => response.status(200).json(data))
        .catch((error) => response.status(500).json({ 'error': error }));
});

router.get("/finance/:id",
async(request: Request, response: Response, next: NextFunction) => {
    var id = parseInt(request.params.id);
    if(isNaN(id))
        response.status(400).json({'error': 'Invalid id.'});
    else
        financesRepository.findById(id)
            .then((data) => response.status(200).json(data))
            .catch((error) => response.status(500).json({ 'error': error }));
});

router.post("/finance",
async(request: Request, response: Response, next: NextFunction) => {
    const parameters = new Parameters({
        optional: ["destination", "reference"],
        required: ["value", "type", "description", "source", "datetime"]
    })
    var finance = parameters.parseBody(request.body);
    if(Array.isArray(finance))
        response.status(400).json({'error': DefaultMessage.missingParameters(finance)});
    else
        financesRepository.insert(finance)
            .then((data) => response.status(200).json(data.identifiers))
            .catch((error) => response.status(500).json({ 'error': error }));
});

router.put("/finance/:id", 
async(request: Request, response: Response, next: NextFunction) => {
    var id = parseInt(request.params.id);
    const parameters = new Parameters({
        optional: ["id", "value", "type", "description", "source", "datetime","destination", "referenceId"],
        required: []
    })
    var finance = parameters.parseBody(request.body);
    if(isNaN(id))
        response.status(400).json({'error': 'Invalid id.'});
    else if(Object.keys(finance).length < 1)
        response.status(400).json({'error': 'No parameters provided.'});
    else
        financesRepository.update(id, finance)
            .then((data) => response.status(200).json(data))
            .catch((error) => response.status(500).json({ 'error': error }));
})

router.post("/finance/type", 
async(request: Request, response: Response, next: NextFunction) => {
    const parameters = new Parameters({
        optional: ["asset"],
        required: ["name", "description"]
    })

    var type = parameters.parseBody(request.body);
    if(Array.isArray(type))
        response.status(401).json({'error': DefaultMessage.missingParameters(type)});
    else
        typesRepository.insert(type)
            .then((data) => response.status(200).json(data.identifiers))
            .catch((error) => response.status(500).json({ 'error': error }));
});

export const FinanceRouter: Router = router;