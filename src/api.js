const Joi = require('joi');
const router = require('express').Router();
const mysql = require('mysql2');
const cache = {};
const ID_CONNECTION = "id_connect";
const internalServerError = (message)=>{
    return { message }
}
const databaseConnection = ()=>{
    const { MYSQL_DB_USER, MYSQL_DB_PASS, MYSQL_DB_NAME, MYSQL_DB_HOST } = process.env
    const db = mysql.createPool(
      {
        host: MYSQL_DB_HOST,
        user: MYSQL_DB_USER,
        password: MYSQL_DB_PASS,
        database: MYSQL_DB_NAME
      }
    );
    return db.promise();
};

const getConnection = async ()=>{
    try{
        if(cache[ID_CONNECTION]) return cache[ID_CONNECTION];
        return cache[ID_CONNECTION] = await databaseConnection();
    }catch(err){
        console.log("Failed to connect to database");
    }
}
const saveQuestions = async (req, res)=>{
    try{
        const schema = Joi.object({
            question: Joi.string().required().min(1).label("'question' filed is required and must be a string not empty"),
            answer: Joi.string().required().min(1).label("'answer' filed is required and must be a string not empty"),
        });
        const { error, value }  = schema.validate(req.body);
        if(error) return res.json(internalServerError(error.message));
        const connection = await getConnection();
        await connection.execute(`INSERT INTO nttdataVoiceRecoignitionv2 (ask, answer) VALUES (?,?)`, [value.question, value.answer]);
        return res.json({
            message: "Successfully saved",
        });

    }catch(err){
        res.json(internalServerError(err.message));
    }
};

const findQuestions = async (req, res)=>{

    try{
        const schema = Joi.object({
        limit: Joi.number()
            .min(0)
            .max(100)
            .default(100).label("'limit' filed is required and must be a number between 0 and 100"),
        offset: Joi.number()
            .min(0)
            .default(0).label("'offset' filed is required and must be a number greater than 0"),
    });
        const { limit, offset } = req.query;
        const { error,value } = await schema.validate({ limit , offset });
        if(error) return res.json(internalServerError(error.message));
        const connection = await getConnection();
        const [rows] = await connection.execute(`SELECT * FROM nttdataVoiceRecoignitionv2 LIMIT ${value.offset},${value.limit}`);
        res.json( rows || []);
    }catch(err){
        res.json(internalServerError(err.message));
    }

};

router.post('/questions', saveQuestions);
router.get('/questions', findQuestions);
module.exports = router;
