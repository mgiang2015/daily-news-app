import { promises as fs } from 'fs';

export async function GET(request) {
    const { searchParams } = new URL(request.url)

    // searchParams should include the following params: sources, country
    // read from file first. Do fetch from API later
    const file = await fs.readFile(process.cwd() + '/app/api/news/data/test.json', 'utf8');
    const data = JSON.parse(file);
   
    return Response.json({ data });
}