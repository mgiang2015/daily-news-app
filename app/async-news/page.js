import { promises as fs } from 'fs';

export default async function News() {
    const file = await fs.readFile(process.cwd() + '/app/api/news/data/test.json', 'utf8');
    const data = JSON.parse(file);

    return (
        <div>
            {
                data.news.map(article => {
                    return (
                        <div key={article.Title}>
                            <p>{article.Title}</p>
                            <p>{article.Source}</p>
                            <p>{article.Url}</p>
                            <p>{article.PublishedOn}</p>
                            <p>{article.Description}</p>
                            <p>{article.Summary}</p>
                            <p>{article.Categories.label}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}