export const TableHead = ({ tableHeadTitle }: { tableHeadTitle: string[] }) => {
  return (
    <thead className="bg-primary_color">
      <tr>
        {tableHeadTitle.map((title, index) => (
          <th key={index}>{title}</th>
        ))}
      </tr>
    </thead>
  );
};
