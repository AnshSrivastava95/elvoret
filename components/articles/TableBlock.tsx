type Props = {
    headers: string[];
    rows: string[][];
};

export default function TableBlock({
    headers,
    rows,
}: Props) {
    return (
        <div className="my-12 overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">

            <table className="min-w-full border-collapse">

                <thead className="bg-gray-100">

                    <tr>
                        {headers.map((header) => (
                            <th
                                key={header}
                                className="border-b border-gray-200 px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-gray-700"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>

                </thead>

                <tbody>

                    {rows.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="transition-colors hover:bg-gray-50"
                        >
                            {row.map((cell, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    className="border-b border-gray-100 px-6 py-4 text-gray-700"
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    );
}