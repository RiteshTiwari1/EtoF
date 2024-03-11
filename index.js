const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/translate', async (req, res) => {
    try {
        if (!req.body || !req.body.text) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

    
        const text = req.body.text;
        let translateFrom = "en-GB";
        let translateTo = "fr-FR";

        let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
        
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data && data.responseData && data.responseData.translatedText) {
                    const translatedText = data.responseData.translatedText;
                    res.json({ translation: translatedText });
                } else {
                    
                    res.status(500).json({ error: 'Translation error' });
                }
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
