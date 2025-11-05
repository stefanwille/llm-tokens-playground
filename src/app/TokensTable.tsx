import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TokensTableProps {
  tokenIDs: number[];
  tokenStrings: string[];
}

export function TokensTable({ tokenIDs, tokenStrings }: TokensTableProps) {
  return (
    <Table className="w-full md:w-[500px] -ml-0 ">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[20px]">Index</TableHead>
          <TableHead className="w-[3px]">Token ID</TableHead>
          <TableHead>Token Text</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tokenIDs.map((token, index) => (
          <TableRow key={`${index - token}`}>
            <TableCell className="text-right">{index}</TableCell>
            <TableCell className="text-right">{tokenIDs[index]}</TableCell>
            <TableCell>{tokenStrings[index]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total token: {tokenIDs.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
