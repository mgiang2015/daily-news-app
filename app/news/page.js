import { promises as fs } from 'fs';
import Table from '../ui/table';

export default async function News() {
    const columns = [
        {
            key: "Title",
            label: "Title",
        },{
            key: "Source",
            label: "Source",
        },{
            key: "PublishedOn",
            label: "Published On",
        },{
            key: "Description",
            label: "Description",
        }
    ]

    const countries = ['sg', 'cn'];
    
    // only if date not provided
    const date = new Date();
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const formattedDate = `${year}-${month}-${day}`;

    // extract news from all countries for today
    let items = [];
    for (const country of countries) {
        const filePath = process.cwd() + `/app/news/data/${country}/${formattedDate}.json`;
        if (await checkFileExists(filePath)) {
            let file = await fs.readFile(filePath)
            let data = JSON.parse(file);
            items.push(...data.news)
        } else {
            console.log("File does not exist. Fetiching data now");
            const url = `https://news67.p.rapidapi.com/v2/country-news?batchSize=30&fromCountry=${country}&onlyInternational=true`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '730d41c45emsh3b19637b2f76127p17877bjsn51a75139d876',
                    'X-RapidAPI-Host': 'news67.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.text();
                console.log(result);

                // process response data
                const data = JSON.parse(result);
                items.push(...data.news)

                // write to "database"
                const parentDir = process.cwd() + `/app/news/data/${country}`;
                await writeToFile(parentDir, filePath, result);
            } catch (error) {
                console.error(error);
            }
        }
    }
    
    return (
        <Table columns={columns} items={items} />
    )
}

async function checkFileExists(file) {
    return fs.access(file, fs.constants.F_OK)
                .then(() => true)
                .catch(() => false)
}

async function writeToFile(parentDir, filepath, content) {
    if (!(await checkFileExists(filepath))) {
        await fs.mkdir(parentDir, { recursive: true }, (err) => {
            if (err) throw err;
        })
    }

    await fs.writeFile(filepath, content, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Wrote to ${filepath} successfully`);
        }
    })
}