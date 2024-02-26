export default function Table({ columns, items }) {
    return (
        <table style={{ border: "2px solid" }}>
            <thead>
                <tr>
                    {columns.map(column => <th style={{ border: '1px solid', padding: "0.5em" }} key={column.key} scope='col'>{column.label}</th>)}
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <tr key={item.Url}>
                        <td style={{ border: '1px solid', padding: "0.5em" }}>
                            <a href={item.Url} target='_blank'>
                                {item.Title}
                            </a>
                        </td>
                        <td style={{ border: '1px solid', padding: "0.5em" }}>{item.Source}</td>
                        <td style={{ border: '1px solid', padding: "0.5em" }}>{item.PublishedOn}</td>
                        <td style={{ border: '1px solid', padding: "0.5em" }}>{item.Country}</td>
                        <td style={{ border: '1px solid', padding: "0.5em" }}>{item.Description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}