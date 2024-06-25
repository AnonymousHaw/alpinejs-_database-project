import sql from 'mssql'

const config = {
    user: 'sa',
    password: 'ABC@123',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'EXAMS',
    encrypt: false,
    trustServerCertificate: true,
}

const sqlConfig = {
    user: 'asim',
    password: 'welcome123',
    database: 'check',
    server: '10.0.132.28',
    /* pool: {
       max: 10,
       min: 0,
       idleTimeoutMillis: 30000
     },*/
    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
}


export const connection = new sql.ConnectionPool(config).connect()
    .then(p => {
        console.log('Connected to MSSQL')
        return p
    })
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err))


