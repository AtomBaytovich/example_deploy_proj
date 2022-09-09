const express = require("express");
const router = express.Router();
const punycode = require('punycode');
const { generateConfig } = require("../utils/configNgnixGenerate");
const stream = require('stream');
const contentDisposition = require('content-disposition')

router.get('/', (req, res) => {
    return res.render('generateConfig', {
        title: 'Генерация конфига Ngnix'
    });
});

router.post('/', (req, res) => {
    const { domain } = req.body;
    const fileName = `${domain}.txt`;
    let domainEncode = punycode.toASCII(domain);
    
    const configText = generateConfig({
        domain: domainEncode
    })

    const fileContents = Buffer.from(configText, "utf-8");
    const readStream = new stream.PassThrough();

    readStream.end(fileContents);
    res.setHeader('Content-Disposition', contentDisposition(fileName))
    res.set('Content-Type', 'text/plain');
    readStream.pipe(res);
})


module.exports = router;