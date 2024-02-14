import { promises as fs } from 'fs';

export default async function News() {
    const file = await fs.readFile(process.cwd() + '/app/api/news/data/test.json', 'utf8');
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
        <table style={{ border: "2px solid" }}>
            <thead>
                <tr>
                    {columns.map(column => <th style={{ border: '1px solid' }} key={column.key} scope='col'>{column.label}</th>)}
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <tr key={item.Title}>
                        <td style={{ border: '1px solid' }}>
                            <a href={item.Url} target='_blank'>
                                {item.Title}
                            </a>
                        </td>
                        <td style={{ border: '1px solid' }}>{item.Source}</td>
                        <td style={{ border: '1px solid' }}>{item.PublishedOn}</td>
                        <td style={{ border: '1px solid' }}>{item.Description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}