import { promises as fs } from 'fs';
import Table from '../ui/table';
import DownloadButton from '../ui/downloadButton';

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
        },{
            key: "Category",
            label: "Categories",
        }
    ]

    // These are hardcoded right now. Change to search params soon
    let categories = ["04000000", "05000000"]
    let sources = ["straitstimes.com", "channelnewsasia.com"]

    // only if date not provided
    const date = new Date();
    const formattedDate = formatDate(date);

    // extract news from all categories for today.
    let items = [];
    for (const category of categories) {
        const filePath = process.cwd() + `/app/news/data/${category}/${formattedDate}.json`;
        if (await checkFileExists(filePath)) {
            const file = await fs.readFile(filePath)
            const data = JSON.parse(file);
            const formattedData = data.news.map(item => ({...item, Categories: item.Categories.label, PublishedOn: formatDate(new Date(item.PublishedOn))}));
            items.push(...formattedData)
        } else {
            console.log("File does not exist. Fetiching data now");

            // Fetch based on category code and sources
            const url = 'https://news67.p.rapidapi.com/v2/feed?' + new URLSearchParams({
                categoryCode: "medtop:" + category,
                batchSize: 30,
                sources: sources,
            });
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
                const formattedData = data.news.map(item => ({...item, PublishedOn: formatDate(new Date(item.PublishedOn))}));
                items.push(formattedData)

                // write to "database"
                const parentDir = process.cwd() + `/app/news/data/${category}`;
                await writeToFile(parentDir, filePath, result);
            } catch (error) {
                console.error(error);
            }
        }
    }

    // sort items using column key.
    // TODO: Add Category
    const sortBy = searchParams.sortBy;
    if (sortBy && ["Title", "Source", "SourceNationality", "Description", "Categories"].includes(sortBy)) {
        items.sort((a,b) => a[sortBy].localeCompare(b[sortBy]));
    } else {
        console.log("Invalid sort. Sorting by PublishedOn automatically");
        items.sort((a,b) => {
            const dateA = a.PublishedOn.split('-').reverse().join('');
            const dateB = b.PublishedOn.split('-').reverse().join('');
            return dateB.localeCompare(dateA);
        })
    }

    return (
        <div>
            <DownloadButton data={items} />
            <Table columns={columns} items={items} />
        </div>
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