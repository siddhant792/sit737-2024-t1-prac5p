const express = require('express');
const app = express();
const PORT = 3000;
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.Console({format: winston.format.simple()}),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

app.use((req, res, next) => {
    const operation = req.path.split('/')[2];
    const num1 = req.query.num1;
    const num2 = req.query.num2;
    logger.log({
        level: 'info',
        message: `[${new Date().toISOString()}] ${req.method} ${req.url} :::: ${operation} operation requested: ${num1} ${operation} ${num2}`,
    });
    next();
});

app.get("/health", (req, res) => {
    res.send({ success: true, message: "It is working" });
});

// Addition endpoint
app.get('/api/add', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: 'Invalid parameters. Please provide valid numbers.' });
    }

    const result = num1 + num2;
    res.json({ result });
});

// Subtraction endpoint
app.get('/api/subtract', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: 'Invalid parameters. Please provide valid numbers.' });
    }

    const result = num1 - num2;
    res.json({ result });
});

// Multiplication endpoint
app.get('/api/multiply', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: 'Invalid parameters. Please provide valid numbers.' });
    }

    const result = num1 * num2;
    res.json({ result });
});

// Division endpoint
app.get('/api/divide', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: 'Invalid parameters. Please provide valid numbers.' });
    }

    if (num2 === 0) {
        return res.status(400).json({ error: 'Division by zero is not allowed.' });
    }

    const result = num1 / num2;
    res.json({ result });
});

// Exponentiation endpoint
app.get('/api/exponent', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: 'Invalid parameters. Please provide valid numbers.' });
    }

    const result = Math.pow(num1, num2);
    res.json({ result });
});

// Square root endpoint
app.get('/api/sqrt', (req, res) => {
    const num = parseFloat(req.query.num);

    if (isNaN(num)) {
        return res.status(400).json({ error: 'Invalid parameter. Please provide a valid number.' });
    }

    if (num < 0) {
        return res.status(400).json({ error: 'Square root of a negative number is not allowed.' });
    }

    const result = Math.sqrt(num);
    res.json({ result });
});

// Modulo endpoint
app.get('/api/modulo', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: 'Invalid parameters. Please provide valid numbers.' });
    }

    if (num2 === 0) {
        return res.status(400).json({ error: 'Modulo by zero is not allowed.' });
    }

    const result = num1 % num2;
    res.json({ result });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
