import express from 'express'
const router = express.Router()
import { connection } from '../db.js'
import sql from 'mssql'

router.get('/', function (req, res) {
    res.render('index', { locals: { title: 'Welcome!' } });
})

router.get(`/api/faculties`, (req, res) => {
    try {
        connection.then(async db => {
            const result = await db.query
            (`select fid,name
		from faculty;`)
            res.status(200).json(result.recordset)
        });
    } catch (err) { res.status(500).send(err.message) }
})

router.get(`/api/t_courses/:fid`, async (req, res) => {
    try {
        const db = await connection;
        const result = await db.request()
            .input(`fid`, sql.Int, req.params.fid)
            .query(`SELECT f.fid,c.cid,c.code,c.title,r.Class,r.Semester,r.Year
fROM recap r
JOIN course c
on r.cid=c.cid
join faculty f
on f.fid=r.fid
where 1=1
 and f.fid=@fid`);
      //  console.log(result.recordset)
        res.status(200).json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
router.get(`/api/t_comments/:fid/:cid`, async (req, res) => {
    try {
        const db = await connection;
        const result = await db.request()
            .input(`cid`, sql.Int, req.params.cid)
            .input(`fid`, sql.Int, req.params.fid)
            .query(`SELECT 
        COUNT(*) AS TotalStudents,
        SUM(CASE WHEN g.grade = 'F' THEN 1 ELSE 0 END) AS FGradeStudents,
        CASE 
        WHEN SUM(CASE WHEN g.grade = 'F' THEN 1 ELSE 0 END) > 0.6 * COUNT(*) THEN 'Strict'
        ELSE 'Lenient'
         END AS EvaluationCriteria
        FROM cmarks m
        JOIN recap r ON m.rid = r.rid
        JOIN course c ON r.cid = c.cid
        JOIN grade g ON ROUND(m.marks, 0) BETWEEN g.start AND g.[end]
        WHERE r.fid = @fid AND c.cid= @cid;`);
      //  console.log(result.recordset)
        res.status(200).json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


export default router

   