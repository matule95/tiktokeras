/*  by Naufal Taufiq Ridwan
    Github : https://github.com/n0l3r
    Don't remove credit.
*/

const fetch = require("node-fetch");
const chalk = require("chalk");
const fs = require("fs");
const { exit } = require("process");
const {Headers} = require('node-fetch');


//adding useragent to avoid ip bans
const headers = new Headers();
headers.append('User-Agent', 'TikTok 26.2.0 rv:262018 (iPhone; iOS 14.4.2; en_US) Cronet');
const headersWm = new Headers();
headersWm.append('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36');
const downloadMediaFromList = async (item) => {
    const folder = "downloads/"
        const fileName = `${item.id}.mp4`
        const downloadFile = fetch(item.url)
        const file = fs.createWriteStream(folder + fileName)
        
        console.log(chalk.green(`[+] Downloading ${fileName}`))
    return new Promise((resolve, reject) => {
        downloadFile.then(res => {
            res.body.pipe(file)
            file.on("finish", () => {
                file.close()
                resolve({ fileName })
            });
            file.on("error", (err) => reject(err));
        });
    })
}
const getVideoNoWM = async (url) => {
    const idVideo = await getIdVideo(url)
    const API_URL = `https://api19-core-c-useast1a.tiktokv.com/aweme/v1/feed/?aweme_id=${idVideo}&version_code=262&app_name=musical_ly&channel=App&device_id=null&os_version=14.4.2&device_platform=iphone&device_type=iPhone9`;
    const request = await fetch(API_URL, {
        method: "GET",
        headers : headers
    });
    const body = await request.text();
                try {
                 var res = JSON.parse(body);
                } catch (err) {
                    console.error("Error:", err);
                    console.error("Response body:", body);
                }
                const urlMedia = res.aweme_list[0].video.play_addr.url_list[0]
                const data = {
                    url: urlMedia,
                    id: idVideo
                }
                return data
}
const getRedirectUrl = async (url) => {
    if(url.includes("vm.tiktok.com") || url.includes("vt.tiktok.com")) {
        const response = await fetch(url, {
            redirect: "manual",
            follow: 20,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
            }
        });
        if( response.status === 301 || response.status === 302) {
            url = new URL(response.headers.get('location'), response.url).href
        }
        console.log(chalk.green("[*] Redirecting to: " + url));
    }
    return url;
}

const getIdVideo = (url) => {
    const matching = url.includes("/video/")
    if(!matching){
        console.log(chalk.red("[X] Error: URL not found"));
        exit();
    }
    const idVideo = url.substring(url.indexOf("/video/") + 7, url.length);
    return (idVideo.length > 19) ? idVideo.substring(0, idVideo.indexOf("?")) : idVideo;
}
module.exports = {
    downloadProcedure: async (requestURL) => {
        const url = await getRedirectUrl(requestURL);
        console.log(chalk.green(`[!] Found 1 video`));
        let data = await getVideoNoWM(url);
        return new Promise((resolve, reject) => {
            downloadMediaFromList(data)
                .then((data) => {
                    console.log(chalk.green("[+] Downloaded successfully"));
                    resolve(data)
                })
                .catch(err => {
                    console.log(chalk.red("[X] Error: " + err));
                    reject()
                });
        })
    },
    fileCleanUp: (fileUrl) => {
        console.log(chalk.yellow(`[!] Removing all downloaded videos`));
        fs.unlink(`./downloads/${fileUrl}`, err => {
            if(err) {
                console.log(chalk.red(`[!] Error`));
            }
        })
        console.log(chalk.green(`[!] Downloaded videos removed`));
    }
}
