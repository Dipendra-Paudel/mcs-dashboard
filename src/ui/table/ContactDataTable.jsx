import React, { useState } from "react";
import Collapse from "@mui/material/Collapse";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import { visuallyHidden } from "@mui/utils";
import ConfirmationDialog from "../dialog/ConfirmationDialog";
import AlertDialog from "../dialog/AlertDialog";
import { deleteContacts } from "../../api/contact";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function createData(
  id,
  firstName,
  lastName,
  email,
  contactNumber,
  subject,
  message,
  date
) {
  return {
    id,
    firstName,
    lastName,
    email,
    contactNumber,
    subject,
    message,
    date,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "firstName",
    label: "First Name",
  },
  {
    id: "lastName",
    label: "Last Name",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "contactNumber",
    label: "Contact Number",
  },
  {
    id: "subject",
    label: "Subject",
  },
  {
    id: "preview",
    label: "Preview",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell, index) => (
          <React.Fragment key={index}>
            {headCell.id === "preview" ? (
              <TableCell align="right">{headCell.label}</TableCell>
            ) : (
              <TableCell
                align="left"
                className="whitespace-nowrap"
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            )}
          </React.Fragment>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const {
    numSelected,
    handleDeleteSelectedContacts,
    searchValue,
    handleSearchValueChange,
  } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Contacts
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete" onClick={handleDeleteSelectedContacts}>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <TextField
          label="Search Contacts"
          variant="standard"
          value={searchValue}
          onChange={handleSearchValueChange}
          spellCheck="false"
        />
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const Row = (props) => {
  const { row, labelId, isItemSelected, handleClick } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        hover
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.id}
        selected={isItemSelected}
      >
        <TableCell padding="checkbox">
          <Checkbox
            onClick={() => handleClick(row.id)}
            color="primary"
            checked={isItemSelected}
            inputProps={{
              "aria-labelledby": labelId,
            }}
          />
        </TableCell>
        <TableCell component="th" id={labelId} scope="row" padding="none">
          {row.firstName}
        </TableCell>
        <TableCell>{row.lastName}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.contactNumber}</TableCell>
        <TableCell>{row.subject}</TableCell>
        <TableCell align="right">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <td colSpan={7} className="px-3">
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Message
              </Typography>
              <div>{row.message}</div>
            </Box>
          </Collapse>
        </td>
      </TableRow>
    </React.Fragment>
  );
};

export default function ContactDataTable({ contacts, setLoading }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("firstName");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleting, setDeleting] = useState(false);
  const [deleteConfirmationPopup, setDeleteConfirmationPopup] = useState(false);
  const [alertPopup, setAlertPopup] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const rows = [];
  contacts.map((p) => {
    let search = searchValue.toLowerCase();
    if (
      p.firstName?.toLowerCase().includes(search) ||
      p.lastName?.toLowerCase().includes(search) ||
      p.email?.toLowerCase().includes(search) ||
      String(p.contactNumber)?.toLowerCase().includes(search) ||
      p.subject?.toLowerCase().includes(search)
    ) {
      rows.push(
        createData(
          p._id,
          p.firstName,
          p.lastName,
          p.email,
          p.contactNumber,
          p.subject,
          p.message
        )
      );
    }
    return null;
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChange = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleConfirmationDelete = async (action) => {
    if (action === "ok") {
      setDeleting(true);
      // call the api to delete selected contacts
      const { status, message } = await deleteContacts(selected);

      setDeleting(false);
      setDeleteConfirmationPopup(false);
      setAlertPopup(() =>
        status === "success"
          ? "Successfully deleted the selected contacts."
          : message || "Could not delete the selected contacts"
      );
      setLoading(true);
    } else {
      setDeleteConfirmationPopup(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (firstName) => selected.indexOf(firstName) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <React.Fragment>
      {deleteConfirmationPopup && (
        <ConfirmationDialog
          message="Are you sure that you want to delete selected contacts?"
          submitting={deleting}
          handleClose={(action) =>
            !deleting && handleConfirmationDelete(action)
          }
        />
      )}
      {alertPopup && (
        <AlertDialog
          message={alertPopup}
          handleClose={() => setAlertPopup("")}
        />
      )}
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            handleDeleteSelectedContacts={() =>
              setDeleteConfirmationPopup(true)
            }
            searchValue={searchValue}
            handleSearchValueChange={handleSearchValueChange}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <Row
                        key={index}
                        row={row}
                        labelId={labelId}
                        isItemSelected={isItemSelected}
                        handleClick={handleChange}
                      />
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </React.Fragment>
  );
}
