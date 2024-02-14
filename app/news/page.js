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

    const countries = ['sg'];
    
    // only if date not provided
    const date = new Date();
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const formattedDate = `${year}-${month}-${day}`;

    // extract news from all countries for today
    let items = [];
    for (const country of countries) {
        let file = await fs.readFile(process.cwd() + `/app/news/data/${country}/${formattedDate}.json`)
        let data = JSON.parse(file);
        items.push(...data.news)
    }
    
    return (
        <Table columns={columns} items={items} />
    )
}