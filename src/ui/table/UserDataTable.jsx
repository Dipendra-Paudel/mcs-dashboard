import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ConfirmationDialog from "../dialog/ConfirmationDialog";
import AlertDialog from "../dialog/AlertDialog";
import { deleteContacts } from "../../api/contact";

function createData(id, firstName, lastName, email, contact) {
  return {
    id,
    firstName,
    lastName,
    email,
    contact,
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
    id: "contact",
    label: "Contact",
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
    handleDeleteSelectedUsers,
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
          Users
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete" onClick={handleDeleteSelectedUsers}>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <TextField
          label="Search User"
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

export default function UserDataTable({ users, setLoading }) {
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
  users.map((p) => {
    if (p.firstName.toLowerCase().includes(searchValue.toLowerCase())) {
      rows.push(createData(p._id, p.firstName, p.lastName, p.email, p.contact));
    }
    return null;
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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

  const handleConfirmationDelete = async (action) => {
    if (action === "ok") {
      setDeleting(true);
      // call the api to delete selected users
      const { status, message } = await deleteContacts(selected);

      setDeleting(false);
      setDeleteConfirmationPopup(false);
      setAlertPopup(() =>
        status === "success"
          ? "Successfully deleted the selected users."
          : message || "Could not delete the selected users"
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
          message="Are you sure that you want to delete selected users?"
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
            handleDeleteSelectedUsers={() => setDeleteConfirmationPopup(true)}
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
                      <TableRow
                        hover
                        role="checkbox"
                        className=""
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={index}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            onChange={() => handleChange(row.id)}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.firstName}
                        </TableCell>
                        <TableCell>{row.lastName}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.contact}</TableCell>
                        <TableCell align="right">
                          <Link
                            to={`/users/${row.id}`}
                            onClick={() => window.scrollTo(0, 0)}
                          >
                            <VisibilityOutlinedIcon className="hover:text-primary" />
                          </Link>
                        </TableCell>
                      </TableRow>
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
