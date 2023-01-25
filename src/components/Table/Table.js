import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import { useHistory } from "react-router-dom";

const styl = {
  tableCell:{
    cursor:"pointer",
  }
};

const useStyles = makeStyles(styl);



export default function CustomTable(props) {
  const classes = useStyles();
  const history = useHistory()
  const { tableHead, tableData, tableHeaderColor } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableData!=""? tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              }):(<></>)}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>

          {
            tableData && (<>
            {tableData.map((props, key) => {
            return (
              <TableRow onClick={()=>{history.push("/admin/user/"+props[0]);}} key={key} className={classes.tableBodyRow}>
               
                {props.map((props, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      {props}
                    </TableCell>
                  
                  );
                })}
              </TableRow>
            );
          })} 
            
            
            
            </>)
          }
        
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
