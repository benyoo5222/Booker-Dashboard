import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import HoursRow from './HoursRow.jsx';

function HoursTable (props) {

  const hours = props.businessHours.map((hours, i) => {
    return <HoursRow
      key={i}
      hours={hours}
      handleBusinessInput={props.handleBusinessInput}
    />
  });

  return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Day of the Week</TableCell>
            <TableCell>Open</TableCell>
            <TableCell>Close</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hours}
        </TableBody>
      </Table>
  );
}

export default HoursTable;