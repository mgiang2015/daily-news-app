import { promises as fs } from 'fs';
import Table from '../ui/table';

// searchParams: { [key: string]: string | string[] | undefined }
// params: { slug: string } -> Useful for dynamic routing, for example localhost:3000/news/[date]
export default async function Page({ 
    searchParams
 }) {
    console.log(searchParams);

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
            key: "Country",
            label: "Country",
        },{
            key: "Description",
            label: "Description",
        }
    ]

    // Required from params: countries, sortBy. Each header link to sortBy=...
    let countries = [];
    if (typeof(searchParams.country) === "string") {
        countries.push(searchParams.country);
    } else {
        countries = searchParams.country || ['sg', 'cn'];
    }

    // only if date not provided
    const date = new Date();
    const formattedDate = formatDate(date);

    // extract news from all countries for today
    let items = [];
    for (const country of countries) {
        const filePath = process.cwd() + `/app/news/data/${country}/${formattedDate}.json`;
        if (await checkFileExists(filePath)) {
            const file = await fs.readFile(filePath)
            const data = JSON.parse(file);
            const newsWithCountry = data.news.map((item) => ({ ...item, Country: country, PublishedOn: formatDate(new Date(item.PublishedOn))}))
            items.push(...newsWithCountry)
        } else {
            console.log("File does not exist. Fetiching data now");
            const url = `https://news67.p.rapidapi.com/v2/country-news?batchSize=30&fromCountry=${country}&onlyInternational=true`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '730d41c45emsh3b19637b2f76127p17877bjsn51a75139d876',
                    'X-RapidAPI-Host': 'news67.p.rapidapi.com'
                },
                cache: 'no-store'
            };

            try {
                const response = await fetch(url, options);
                const result = await response.text();
                console.log(result);

                // process response data
                const data = JSON.parse(result);
                const newsWithCountry = data.news.map((item) => ({ ...item, Country: country, PublishedOn: formatDate(new Date(item.PublishedOn))}))
                items.push(...newsWithCountry)

                // write to "database"
                const parentDir = process.cwd() + `/app/news/data/${country}`;
                await writeToFile(parentDir, filePath, result);
            } catch (error) {
                console.error(error);
            }
        }
    }

    // sort items using column key
    const sortBy = searchParams.sortBy;
    if (sortBy && ["Title", "Source", "Country", "Description"].includes(sortBy)) {
        items.sort((a,b) => a[sortBy].localeCompare(b[sortBy]));
    } else {
        console.log("Invalid sort");
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

// Returns YYYY-MM-DD
function formatDate(dateObject) {
    const year = dateObject.getFullYear();
    const month = `0${dateObject.getMonth() + 1}`.slice(-2);
    const day = `0${dateObject.getDate()}`.slice(-2);
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
}