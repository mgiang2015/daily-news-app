export default function Table({ columns, items }) {
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
                        <td style={{ border: '1px solid' }}>{item.Country}</td>
                        <td style={{ border: '1px solid' }}>{item.Description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}