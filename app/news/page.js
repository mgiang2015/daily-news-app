import { promises as fs } from 'fs';
import Table from '../ui/table';

export default async function News() {
    const file = await fs.readFile(process.cwd() + '/app/news/data/test.json', 'utf8');
    const data = JSON.parse(file);

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

    const items = data.news;
    
    return (
        <Table columns={columns} items={items} />
    )
}