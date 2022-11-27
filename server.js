const chalk = require("chalk");
const { downloadProcedure, fileCleanUp } = require('./downloader')
module.exports = {
    initializeServer: () => {
        const express = require('express')
        const port = 4545;
        const application = express()
        const header = "\r\n \/$$$$$$$$ \/$$$$$$ \/$$   \/$$ \/$$$$$$$$ \/$$$$$$  \/$$   \/$$       \/$$$$$$$   \/$$$$$$  \/$$      \/$$ \/$$   \/$$ \/$$        \/$$$$$$   \/$$$$$$  \/$$$$$$$  \/$$$$$$$$ \/$$$$$$$ \r\n|__  $$__\/|_  $$_\/| $$  \/$$\/|__  $$__\/\/$$__  $$| $$  \/$$\/      | $$__  $$ \/$$__  $$| $$  \/$ | $$| $$$ | $$| $$       \/$$__  $$ \/$$__  $$| $$__  $$| $$_____\/| $$__  $$\r\n   | $$     | $$  | $$ \/$$\/    | $$  | $$  \\ $$| $$ \/$$\/       | $$  \\ $$| $$  \\ $$| $$ \/$$$| $$| $$$$| $$| $$      | $$  \\ $$| $$  \\ $$| $$  \\ $$| $$      | $$  \\ $$\r\n   | $$     | $$  | $$$$$\/     | $$  | $$  | $$| $$$$$\/        | $$  | $$| $$  | $$| $$\/$$ $$ $$| $$ $$ $$| $$      | $$  | $$| $$$$$$$$| $$  | $$| $$$$$   | $$$$$$$\/\r\n   | $$     | $$  | $$  $$     | $$  | $$  | $$| $$  $$        | $$  | $$| $$  | $$| $$$$_  $$$$| $$  $$$$| $$      | $$  | $$| $$__  $$| $$  | $$| $$__\/   | $$__  $$\r\n   | $$     | $$  | $$\\  $$    | $$  | $$  | $$| $$\\  $$       | $$  | $$| $$  | $$| $$$\/ \\  $$$| $$\\  $$$| $$      | $$  | $$| $$  | $$| $$  | $$| $$      | $$  \\ $$\r\n   | $$    \/$$$$$$| $$ \\  $$   | $$  |  $$$$$$\/| $$ \\  $$      | $$$$$$$\/|  $$$$$$\/| $$\/   \\  $$| $$ \\  $$| $$$$$$$$|  $$$$$$\/| $$  | $$| $$$$$$$\/| $$$$$$$$| $$  | $$\r\n   |__\/   |______\/|__\/  \\__\/   |__\/   \\______\/ |__\/  \\__\/      |_______\/  \\______\/ |__\/     \\__\/|__\/  \\__\/|________\/ \\______\/ |__\/  |__\/|_______\/ |________\/|__\/  |__\/\r\n\n by n0l3r (https://github.com/n0l3r)\n"
        console.log(chalk.blue(header))
        application.get('/getVideo', (req, res) => {
            // if(req.query.videoURL){
            //     downloadProcedure(req.query.videoURL).then(({ fileName }) => {
            //         res.status(200).sendFile(`downloads/${fileName}`, { root: __dirname }, (err) => {
            //             if(err) {
            //                 throw err
            //             } else {
            //                 fileCleanUp(fileName)
            //             }
            //         })
            //     })
            // }
            // else {
            //     res.status(400).send({ url: 'There was no video URL'})
            // }
            res.status(200).json({
                info: 'hello my darlings'
            })
            console.log(chalk.red('I have been accessed'))
        })
        application.listen(port)
    }
}